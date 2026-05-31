import React, { useState, useEffect, useRef } from 'react';
import NavigationHeader from './components/NavigationHeader';
import InteractiveCanvas from './components/InteractiveCanvas';
import HorizontalLibrary from './components/HorizontalLibrary';
import GameMainBanner from './components/GameMainBanner';
import ControlCenter from './components/ControlCenter';
import SettingsPanel from './components/SettingsPanel';
import MetadataEditor from './components/MetadataEditor';
import StoreGrid from './components/StoreGrid';
import StoreItemPage from './components/StoreItemPage';
import FavouritesTrophyRoom from './components/FavouritesTrophyRoom';
import ProfileOverlay from './components/ProfileOverlay';
import { defaultGames, matchGameMetadata, storeCatalog } from './utils/mockDatabase';
import { applyArtworkToGame, needsSteamGridDBArtwork } from './utils/steamgriddb';
import { audioEngine } from './utils/audioEngine';
const DEFAULT_SETTINGS = {
  theme: 'theme-aether',
  isMuted: false,
  glassBlur: 20,
  glassOpacity: 0.4,
  particleDensity: 1.0,
  particleSpeed: 1.0,
  trackSystemStatus: true,
  bannerAnimation: true
};

export default function App() {
  // --- Mode and Core States ---
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('library');
  const [selectedStoreItem, setSelectedStoreItem] = useState(null);
  
  // --- Active Gameplay Session Tracking ---
  const [runningGameId, setRunningGameId] = useState(null);
  const [sessionTime, setSessionTime] = useState(0);
  const sessionTimerRef = useRef(null);

  const [isCcOpen, setIsCcOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  
  // --- Editable Gold Profile Screen States ---
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('nexus_username') || 'And360red';
  });
  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem('nexus_user_avatar') || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop';
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleUsernameChange = (newName) => {
    setUsername(newName);
    localStorage.setItem('nexus_username', newName);
  };

  const handleAvatarChange = (newAvatar) => {
    setUserAvatar(newAvatar);
    localStorage.setItem('nexus_user_avatar', newAvatar);
  };
  const [isBatchFetchingArtwork, setIsBatchFetchingArtwork] = useState(false);
  const [bannerEditMode, setBannerEditMode] = useState(false);
  const [storeArtwork, setStoreArtwork] = useState({});
  const [diagnostics, setDiagnostics] = useState([]);
  const libraryArtworkHydratedRef = useRef(false);
  const storeArtworkHydratedRef = useRef(false);

  const addDiagnostic = (area, level, message, details = null) => {
    setDiagnostics(prev => [{
      area,
      level,
      message,
      details,
      timestamp: new Date().toISOString()
    }, ...prev].slice(0, 80));
  };

  // --- System Diagnostic Metrics (CPU/RAM Mock telemetry) ---
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(34);

  // --- Visual & UX Customisation Variables ---
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const settingsLoadedRef = useRef(false);

  // --- 1. Load Local Database or Fallback to Defaults ---
  useEffect(() => {
    async function initDb() {
      if (window.electronAPI) {
        try {
          const loadedData = await window.electronAPI.loadDatabase();
          if (loadedData && Array.isArray(loadedData) && loadedData.length > 0) {
            setGames(loadedData);
            setSelectedGame(loadedData[0]);
          } else {
            // Save defaults if file is empty
            setGames(defaultGames);
            setSelectedGame(defaultGames[0]);
            await window.electronAPI.saveDatabase(defaultGames);
          }
        } catch (e) {
          console.error("Database load error, falling back to mock:", e);
          setGames(defaultGames);
          setSelectedGame(defaultGames[0]);
        }
      } else {
        // Web Browser Sandbox Loading
        const localCache = localStorage.getItem('nexus_games_cache');
        if (localCache) {
          const parsed = JSON.parse(localCache);
          setGames(parsed);
          setSelectedGame(parsed[0]);
        } else {
          setGames(defaultGames);
          setSelectedGame(defaultGames[0]);
        }
      }
    }
    initDb();
  }, []);

  // --- 1a. Load persisted settings from storage ---
  useEffect(() => {
    async function loadSettings() {
      let saved = null;
      if (window.electronAPI) {
        saved = await window.electronAPI.loadSettings();
      } else {
        const raw = localStorage.getItem('nexus_settings');
        if (raw) {
          try { saved = JSON.parse(raw); } catch (e) { /* ignore */ }
        }
      }
      if (saved && typeof saved === 'object') {
        setSettings(prev => ({ ...DEFAULT_SETTINGS, ...saved }));
      }
      settingsLoadedRef.current = true;
    }
    loadSettings();
  }, []);

  // --- 1b. Persist settings to storage whenever they change ---
  useEffect(() => {
    if (!settingsLoadedRef.current) return;
    if (window.electronAPI) {
      window.electronAPI.saveSettings(settings);
    } else {
      localStorage.setItem('nexus_settings', JSON.stringify(settings));
    }
  }, [settings]);

  useEffect(() => {
    if (!window.electronAPI?.onDiagnosticEvent) return;

    return window.electronAPI.onDiagnosticEvent((event) => {
      setDiagnostics(prev => [event, ...prev].slice(0, 80));
    });
  }, []);

  // --- 1b. Hydrate library and store art from SteamGridDB when desktop APIs exist ---
  useEffect(() => {
    if (!window.electronAPI?.autoFetchArtwork || libraryArtworkHydratedRef.current || games.length === 0) return;

    libraryArtworkHydratedRef.current = true;

    async function hydrateLibraryArtwork() {
      let updatedList = [...games];
      let changed = false;
      const candidates = updatedList.filter(needsSteamGridDBArtwork);

      for (const game of candidates) {
        const artwork = await window.electronAPI.autoFetchArtwork({ ...game, forceTitleLookup: true });
        if (!artwork?.error && (artwork.grid || artwork.hero || artwork.logo || artwork.icon)) {
          updatedList = updatedList.map(existing =>
            existing.id === game.id ? applyArtworkToGame(existing, artwork) : existing
          );
          changed = true;
        } else if (artwork?.error) {
          addDiagnostic('SteamGridDB', 'warn', `Library hydration skipped ${game.title}: ${artwork.error}`);
        }
      }

      if (!changed) return;

      setGames(updatedList);
      setSelectedGame(prev => updatedList.find(g => g.id === prev?.id) || updatedList[0] || null);
      await window.electronAPI.saveDatabase(updatedList);
    }

    hydrateLibraryArtwork();
  }, [games]);

  useEffect(() => {
    if (!window.electronAPI?.autoFetchArtwork || storeArtworkHydratedRef.current) return;

    storeArtworkHydratedRef.current = true;

    async function hydrateStoreArtwork() {
      const fetchedArtwork = {};

      for (const item of storeCatalog.filter(needsSteamGridDBArtwork)) {
        const artwork = await window.electronAPI.autoFetchArtwork({ ...item, forceTitleLookup: true });
        if (!artwork?.error && (artwork.grid || artwork.hero || artwork.logo || artwork.icon)) {
          fetchedArtwork[item.id] = applyArtworkToGame(item, artwork);
        } else if (artwork?.error) {
          addDiagnostic('SteamGridDB', 'warn', `Store artwork skipped ${item.title}: ${artwork.error}`);
        }
      }

      if (Object.keys(fetchedArtwork).length > 0) {
        setStoreArtwork(fetchedArtwork);
      }
    }

    hydrateStoreArtwork();
  }, []);

  // --- 2. Synchronize Custom Settings & CSS Styles ---
  useEffect(() => {
    // Sync active settings theme to body element
    const body = document.body;
    body.className = `${settings.theme} ecosystem-games-bg`;

    // Apply sliders styling variables to :root
    document.documentElement.style.setProperty('--panel-bg', `rgba(10, 10, 16, ${settings.glassOpacity})`);
    document.documentElement.style.setProperty('--panel-bg-solid', `rgba(10, 10, 16, ${Math.min(0.98, settings.glassOpacity * 1.5)})`);
    document.documentElement.style.setProperty('--glass-border', `rgba(255, 255, 255, ${settings.glassOpacity * 0.18})`);
    
    if (!settings.trackSystemStatus) return;

    // Quick hardware pulse
    const sysTimer = setInterval(() => {
      setCpuUsage(prev => {
        const delta = Math.floor(Math.random() * 8) - 4;
        return Math.max(5, Math.min(85, prev + delta));
      });
      setRamUsage(prev => {
        const delta = Math.floor(Math.random() * 4) - 2;
        return Math.max(25, Math.min(95, prev + delta));
      });
    }, 4000);

    return () => clearInterval(sysTimer);
  }, [settings]);

  // --- 3. Ambient Audio Soundtrack Controls ---
  useEffect(() => {
    if (selectedGame) {
      audioEngine.startAmbience(selectedGame.soundType);
    } else {
      audioEngine.stopAmbience();
    }
    return () => audioEngine.stopAmbience();
  }, [selectedGame, settings.isMuted]);

  // --- 4. Native Subprocess State Listener ---
  useEffect(() => {
    if (window.electronAPI) {
      const unsubscribe = window.electronAPI.onGameStatusChanged((gameId, status, elapsedSeconds) => {
        if (status === 'running') {
          // Game has started successfully
          setRunningGameId(gameId);
          setSessionTime(0);
          setIsCcOpen(false); // Clean drawer

          // Start visual playtime increment counter
          if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
          sessionTimerRef.current = setInterval(() => {
            setSessionTime(prev => prev + 1);
          }, 1000);

        } else if (status === 'stopped') {
          // Process exited! Capture playtime addition
          if (sessionTimerRef.current) {
            clearInterval(sessionTimerRef.current);
            sessionTimerRef.current = null;
          }

          // Update library record
          setGames(prevGames => {
            const updated = prevGames.map(game => {
              if (game.id === gameId) {
                const addedSeconds = elapsedSeconds || 0;
                return {
                  ...game,
                  playtime: game.playtime + addedSeconds,
                  lastPlayed: "Just now"
                };
              }
              return game;
            });

            // Save back to JSON Database
            if (window.electronAPI) {
              window.electronAPI.saveDatabase(updated);
            }
            
            // Sync highlighted card
            const currentSelected = updated.find(g => g.id === gameId);
            if (currentSelected) {
              setSelectedGame(currentSelected);
            }

            return updated;
          });

          setRunningGameId(null);
          setSessionTime(0);
          
          // Satisfying chime sweep
          audioEngine.playLaunchSwell();
        }
      });

      return () => {
        unsubscribe();
        if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
      };
    }
  }, [games]);

  // --- Action Trigger: Game Launching ---
  const handleLaunchGame = async (game) => {
    if (runningGameId) {
      alert("A gameplay session is already active!");
      return;
    }

    audioEngine.playLaunchSwell();

    if (window.electronAPI) {
      const result = await window.electronAPI.launchGame(game.id, game.exePath);
      if (!result.success) {
        alert(`Process launch aborted: ${result.error}`);
      }
    } else {
      // Browser Mock Launcher Session Simulation
      setRunningGameId(game.id);
      setSessionTime(0);
      setIsCcOpen(false);

      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);

      // Simulate game closure after 8 seconds for the browser mock!
      setTimeout(() => {
        handleMockCloseGame(game.id, 8);
      }, 8000);
    }
  };

  const handleMockCloseGame = (gameId, simulatedDuration) => {
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }

    setGames(prevGames => {
      const updated = prevGames.map(game => {
        if (game.id === gameId) {
          return {
            ...game,
            playtime: game.playtime + simulatedDuration,
            lastPlayed: "Just now"
          };
        }
        return game;
      });

      localStorage.setItem('nexus_games_cache', JSON.stringify(updated));
      const currentSelected = updated.find(g => g.id === gameId);
      if (currentSelected) {
        setSelectedGame(currentSelected);
      }
      return updated;
    });

    setRunningGameId(null);
    setSessionTime(0);
    audioEngine.playLaunchSwell();
  };

  // --- Action Trigger: Metadata Updates ---
  const handleSaveMetadata = async (updatedGame) => {
    const updatedList = games.map(g => g.id === updatedGame.id ? updatedGame : g);
    setGames(updatedList);
    setSelectedGame(updatedGame);
    setIsMetadataOpen(false);

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  };

  // --- Action Trigger: Update Game Banner Position ---
  const handleUpdateGameBannerLayout = async (gameId, layout) => {
    const updatedList = games.map(g => {
      if (g.id === gameId) {
        return { ...g, bannerLayout: layout };
      }
      return g;
    });
    setGames(updatedList);
    const updatedGame = updatedList.find(g => g.id === gameId);
    if (updatedGame) {
      setSelectedGame(updatedGame);
    }

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  };

  // --- Action Trigger: Favorites Toggle ---
  const handleToggleFavorite = async (gameId) => {
    const updatedList = games.map(g => {
      if (g.id === gameId) {
        return { ...g, isFavorite: !g.isFavorite };
      }
      return g;
    });
    setGames(updatedList);
    const updatedActive = updatedList.find(g => g.id === gameId);
    if (updatedActive) setSelectedGame(updatedActive);

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  };

  // --- Action Trigger: Remove Game from Library ---
  const handleRemoveGame = async (gameId) => {
    const gameToRemove = games.find(g => g.id === gameId);
    if (!gameToRemove) return;

    const updatedList = games.filter(g => g.id !== gameId);
    setGames(updatedList);

    if (selectedGame?.id === gameId) {
      setSelectedGame(updatedList[0] || null);
    }

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  };

  // --- Action Trigger: Folder Scanning Batch Imports ---
  const handleImportScannedGames = async (matchedImports) => {
    const addedList = [...games];
    const newGameIds = [];
    let duplicateCount = 0;
    matchedImports.forEach(scannedFile => {
      // Exclude if path already matches
      const exists = addedList.find(g => g.exePath === scannedFile.path);
      if (!exists) {
        const metadata = matchGameMetadata(scannedFile.name, scannedFile.path);
        // Create clean ID
        const cleanId = scannedFile.name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.floor(Math.random()*100);
        addedList.push({
          ...metadata,
          steamAppId: scannedFile.steamAppId || metadata.steamAppId || null,
          platforms: scannedFile.platform ? [scannedFile.platform] : (metadata.platforms || ["PC"]),
          id: cleanId
        });
        newGameIds.push(cleanId);
        addDiagnostic('Importer', 'info', `Prepared import for ${metadata.title}`, {
          exePath: scannedFile.path,
          steamAppId: scannedFile.steamAppId || metadata.steamAppId || null,
          platform: scannedFile.platform || 'Custom'
        });
      } else {
        duplicateCount += 1;
        addDiagnostic('Importer', 'warn', `Skipped duplicate executable ${scannedFile.path}`);
      }
    });

    addDiagnostic('Importer', newGameIds.length ? 'info' : 'warn', `Import selection processed: ${newGameIds.length} new, ${duplicateCount} duplicate`);

    if (window.electronAPI?.autoFetchArtwork) {
      for (const gameId of newGameIds) {
        const game = addedList.find(item => item.id === gameId);
        const artwork = await window.electronAPI.autoFetchArtwork({ ...game, forceTitleLookup: true });
        if (!artwork?.error && (artwork.grid || artwork.hero || artwork.logo || artwork.icon)) {
          const index = addedList.findIndex(item => item.id === gameId);
          addedList[index] = applyArtworkToGame(addedList[index], artwork);
          addDiagnostic('SteamGridDB', 'info', `Artwork applied to imported game ${game.title}`);
        } else if (artwork?.error) {
          addDiagnostic('SteamGridDB', 'warn', `Artwork failed for imported game ${game.title}: ${artwork.error}`);
        }
      }
    }

    setGames(addedList);
    setSelectedGame(addedList[addedList.length - 1]); // Highlight newly added game
    
    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(addedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(addedList));
    }
  };

  // --- Action Trigger: Manual EXE Import ---
  const handleManualImport = async () => {
    audioEngine.playClickPulse();
    const mockExe = window.electronAPI?.selectExecutable
      ? await window.electronAPI.selectExecutable()
      : prompt("Input complete Windows Executable file path (.exe):", "C:\\Windows\\notepad.exe");
    if (!mockExe) {
      addDiagnostic('Importer', 'info', 'Manual executable import cancelled');
      return;
    }

    const name = mockExe.split('\\').pop().replace('.exe', '');
    const cleanId = name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.floor(Math.random()*100);
    const metadata = matchGameMetadata(name, mockExe);
    addDiagnostic('Importer', 'info', `Manual executable selected: ${mockExe}`);

    let newGame = { ...metadata, id: cleanId };
    if (window.electronAPI?.autoFetchArtwork) {
      const artwork = await window.electronAPI.autoFetchArtwork({ ...newGame, forceTitleLookup: true });
      if (!artwork?.error && (artwork.grid || artwork.hero || artwork.logo || artwork.icon)) {
        newGame = applyArtworkToGame(newGame, artwork);
        addDiagnostic('SteamGridDB', 'info', `Artwork applied to manual import ${newGame.title}`);
      } else if (artwork?.error) {
        addDiagnostic('SteamGridDB', 'warn', `Artwork failed for manual import ${newGame.title}: ${artwork.error}`);
      }
    }

    const updated = [...games, newGame];
    setGames(updated);
    setSelectedGame(updated[updated.length - 1]);
    setIsCcOpen(false);

    if (window.electronAPI) {
      window.electronAPI.saveDatabase(updated);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updated));
    }
  };

  // --- Action Trigger: Factory DB Resets ---
  const handleResetDatabase = async () => {
    setGames(defaultGames);
    setSelectedGame(defaultGames[0]);
    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(defaultGames);
    } else {
      localStorage.removeItem('nexus_games_cache');
    }
  };

  // --- Navigation / View Management ---
  const handleViewChange = (view) => {
    audioEngine.playClickPulse();
    setActiveView(view);
    if (view === 'store') {
      setSelectedStoreItem(null);
    }
  };

  const handleSelectStoreItem = (item) => {
    setSelectedStoreItem(item);
    setActiveView('store-item');
  };

  const handleBackToStore = () => {
    setActiveView('store');
    setSelectedStoreItem(null);
  };

  // --- Store: Mark as Owned ---
  const handleMarkOwned = async (storeItem) => {
    const existing = games.find(g => g.id === storeItem.id);
    if (existing) {
      const updatedList = games.map(g =>
        g.id === storeItem.id ? { ...g, owned: true } : g
      );
      setGames(updatedList);
      if (window.electronAPI) {
        await window.electronAPI.saveDatabase(updatedList);
      } else {
        localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
      }
      return;
    }

    // Sync the store catalog ownership
    storeItem.owned = true;

    const newGame = {
      ...storeItem,
      playtime: 0,
      lastPlayed: "Never",
      progress: 0,
      timeToComplete: "--",
      nextAchievement: "Locked (0% complete)",
      exePath: "",
      isFavorite: false,
      owned: true
    };

    const updatedList = [...games, newGame];
    setGames(updatedList);
    setSelectedGame(newGame);

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  };

  // --- Store: Link Executable ---
  const handleLinkExe = async (gameId, exePath) => {
    const updatedList = games.map(g =>
      g.id === gameId ? { ...g, exePath } : g
    );
    setGames(updatedList);
    const updated = updatedList.find(g => g.id === gameId);
    if (updated) setSelectedGame(updated);

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  };

  // --- Filter Catalog Search ---
  const getFilteredGames = () => {
    return games.filter(g => 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // --- Action Trigger: Batch SteamGridDB Artwork Fetch ---
  const handleBatchFetchArtwork = async () => {
    audioEngine.playClickPulse();

    if (!window.electronAPI?.autoFetchArtwork || isBatchFetchingArtwork) {
      if (!window.electronAPI) alert("SteamGridDB artwork fetch is available in the desktop app.");
      return;
    }

    setIsBatchFetchingArtwork(true);
    let updatedList = [...games];
    let updatedCount = 0;
    const candidates = updatedList.filter(needsSteamGridDBArtwork);

    for (const game of candidates) {
      const artwork = await window.electronAPI.autoFetchArtwork({ ...game, forceTitleLookup: true });
      if (!artwork?.error && (artwork.grid || artwork.hero || artwork.logo || artwork.icon)) {
        updatedList = updatedList.map(existing =>
          existing.id === game.id ? applyArtworkToGame(existing, artwork) : existing
        );
        updatedCount += 1;
        addDiagnostic('SteamGridDB', 'info', `Batch artwork updated ${game.title}`);
      } else if (artwork?.error) {
        addDiagnostic('SteamGridDB', 'warn', `Batch artwork skipped ${game.title}: ${artwork.error}`);
      }
    }

    setGames(updatedList);
    setSelectedGame(prev => updatedList.find(g => g.id === prev?.id) || updatedList[0] || null);
    await window.electronAPI.saveDatabase(updatedList);
    setIsBatchFetchingArtwork(false);

    alert(updatedCount > 0
      ? `SteamGridDB artwork updated for ${updatedCount} game${updatedCount === 1 ? '' : 's'}.`
      : 'No new SteamGridDB artwork was found.'
    );
  };

  const getFilteredFavoriteGames = () => {
    return getFilteredGames().filter(g => g.isFavorite);
  };

  // Sync store catalog ownership with games library
  const syncedCatalog = storeCatalog.map(item => ({
    ...item,
    ...storeArtwork[item.id],
    owned: games.some(g => g.id === item.id && g.owned)
  }));

  return (
    <div className="app-container">
      {/* 1. Ambient Particle Background */}
      <InteractiveCanvas 
        theme={settings.theme} 
        speedFactor={settings.particleSpeed} 
        density={settings.particleDensity} 
      />

      {/* 2. Top-level Floating Navigation Bar */}
      <NavigationHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSettings={() => { audioEngine.playClickPulse(); setIsSettingsOpen(true); }}
        cpuUsage={cpuUsage}
        ramUsage={ramUsage}
        activeView={activeView}
        onViewChange={handleViewChange}
        systemStatusTracking={settings.trackSystemStatus}
        username={username}
        userAvatar={userAvatar}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* 3. Main Dashboard Interactive Workspace */}
      <main className="main-viewport">
        {activeView === 'library' && (
          <>
            <GameMainBanner 
              game={selectedGame}
              onLaunch={handleLaunchGame}
              onToggleFavorite={handleToggleFavorite}
              onEditMetadata={() => setIsMetadataOpen(true)}
              onRemoveGame={handleRemoveGame}
              isRunning={runningGameId === selectedGame?.id}
              bannerAnimation={settings.bannerAnimation}
              onUpdateGameBannerLayout={handleUpdateGameBannerLayout}
              editMode={bannerEditMode}
              setEditMode={setBannerEditMode}
            />

            <HorizontalLibrary 
              games={getFilteredGames()}
              selectedGame={selectedGame}
              onSelectGame={setSelectedGame}
              onLaunchGame={handleLaunchGame}
              onRemoveGame={handleRemoveGame}
              runningGameId={runningGameId}
            />
          </>
        )}

        {activeView === 'favourites' && (
          <FavouritesTrophyRoom
            games={getFilteredFavoriteGames()}
            selectedGame={selectedGame}
            onSelectGame={setSelectedGame}
            onLaunchGame={handleLaunchGame}
            onToggleFavorite={handleToggleFavorite}
            onRemoveGame={handleRemoveGame}
            onReturnToLibrary={() => handleViewChange('library')}
            runningGameId={runningGameId}
          />
        )}

        {activeView === 'store' && (
          <StoreGrid 
            catalog={syncedCatalog}
            ownedGames={games}
            onSelectItem={handleSelectStoreItem}
            searchQuery={searchQuery}
          />
        )}

        {activeView === 'store-item' && (
          <StoreItemPage 
            item={selectedStoreItem}
            ownedGames={games}
            onBack={handleBackToStore}
            onMarkOwned={handleMarkOwned}
            onLinkExe={handleLinkExe}
            onLaunch={handleLaunchGame}
            onRemoveGame={handleRemoveGame}
          />
        )}
      </main>

      {/* 4. Bottom-up Utility Control Center Dock */}
      <ControlCenter 
        isOpen={isCcOpen}
        onToggle={() => setIsCcOpen(!isCcOpen)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onManualImport={handleManualImport}
        onImportScannedGames={handleImportScannedGames}
        onBatchFetchArtwork={handleBatchFetchArtwork}
        isBatchFetchingArtwork={isBatchFetchingArtwork}
        cpuUsage={cpuUsage}
        ramUsage={ramUsage}
        games={games}
        systemStatusTracking={settings.trackSystemStatus}
        diagnostics={diagnostics}
        onClearDiagnostics={() => setDiagnostics([])}
      />



      {/* 6. Settings Panel Configuration pop-up */}
      {isSettingsOpen && (
        <SettingsPanel 
          settings={settings}
          onUpdateSettings={setSettings}
          onResetDatabase={handleResetDatabase}
          gamesCount={games.length}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* 7. Metadata Editor pop-up */}
      {isMetadataOpen && (
        <MetadataEditor 
          game={selectedGame}
          onSave={handleSaveMetadata}
          onClose={() => setIsMetadataOpen(false)}
          onChangeBannerPosition={() => {
            setIsMetadataOpen(false);
            setBannerEditMode(true);
          }}
        />
      )}

      {/* 8. Gold Profile Selection Overlay */}
      <ProfileOverlay 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        username={username}
        onUsernameChange={handleUsernameChange}
        userAvatar={userAvatar}
        onAvatarChange={handleAvatarChange}
      />
    </div>
  );
}
