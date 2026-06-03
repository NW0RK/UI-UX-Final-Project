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
import ControllerHintOverlay from './components/ControllerHintOverlay';
import { useUnifiedInput } from './hooks/useUnifiedInput';
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
  bannerAnimation: true,
  fontScale: 1.0,
  studioLogosEnabled: false,
  brandfetchClientId: ''
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

  // --- System Diagnostic Metrics ---
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(34);
  const [ramUsedGb, setRamUsedGb] = useState(null);

  // --- Visual & UX Customisation Variables ---
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const settingsLoadedRef = useRef(false);
  const [cacheVersion, setCacheVersion] = useState(0);

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
  }, [games, cacheVersion]);

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
  }, [cacheVersion]);

  // --- 2. Synchronize Custom Settings & CSS Styles ---
  useEffect(() => {
    // Sync active settings theme to body element
    const body = document.body;
    body.className = `${settings.theme} ecosystem-games-bg`;

    // Apply sliders styling variables to :root
    document.documentElement.style.setProperty('--panel-bg', `rgba(10, 10, 16, ${settings.glassOpacity})`);
    document.documentElement.style.setProperty('--panel-bg-solid', `rgba(10, 10, 16, ${Math.min(0.98, settings.glassOpacity * 1.5)})`);
    document.documentElement.style.setProperty('--glass-border', `rgba(255, 255, 255, ${settings.glassOpacity * 0.18})`);
    const fontScale = settings.fontScale || 1.0;
    document.documentElement.style.setProperty('--fs-8', `${8 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-9', `${9 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-9-5', `${9.5 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-10', `${10 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-11', `${11 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-12', `${12 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-12-5', `${12.5 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-13', `${13 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-13-5', `${13.5 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-14', `${14 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-14-5', `${14.5 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-15', `${15 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-16', `${16 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-17', `${17 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-18', `${18 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-20', `${20 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-22', `${22 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-24', `${24 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-26', `${26 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-30', `${30 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-38', `${38 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-48', `${48 * fontScale}px`);
    
    if (!settings.trackSystemStatus) return;

    const updateSystemStatus = async () => {
      setCpuUsage(prev => {
        const delta = Math.floor(Math.random() * 8) - 4;
        return Math.max(5, Math.min(85, prev + delta));
      });

      if (window.electronAPI?.getSystemMemoryUsage) {
        const memory = await window.electronAPI.getSystemMemoryUsage();
        if (memory && Number.isFinite(memory.usagePercent)) {
          setRamUsage(Math.max(0, Math.min(100, memory.usagePercent)));
          setRamUsedGb(Number.isFinite(memory.usedGb) ? memory.usedGb : null);
        }
        return;
      }

      setRamUsage(prev => {
        const delta = Math.floor(Math.random() * 4) - 2;
        const nextUsage = Math.max(25, Math.min(95, prev + delta));
        setRamUsedGb((nextUsage / 100) * 16);
        return nextUsage;
      });
    };

    updateSystemStatus();
    const sysTimer = setInterval(updateSystemStatus, 4000);

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

  const handleOpenMetadata = (game = selectedGame) => {
    if (!game) return;
    setSelectedGame(game);
    setIsMetadataOpen(true);
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

  // --- Action Trigger: Clear Pictures Cache ---
  const handleClearArtworkCache = async () => {
    if (window.electronAPI?.clearArtworkCache) {
      addDiagnostic('Artwork', 'info', 'Initiating full artwork cache purge...');
      const result = await window.electronAPI.clearArtworkCache();
      if (result.success) {
        // Reset artwork status in games database
        const updated = games.map(game => {
          if (game.artworkSource === 'steamgriddb' || (game.coverUrl && game.coverUrl.startsWith('nexus-artwork:///'))) {
            return {
              ...game,
              coverUrl: null,
              bannerUrl: null,
              logoUrl: null,
              iconUrl: null,
              artworkFetched: false,
              artworkSource: null
            };
          }
          return game;
        });

        setGames(updated);
        setSelectedGame(prev => updated.find(g => g.id === prev?.id) || updated[0] || null);
        await window.electronAPI.saveDatabase(updated);

        // Reset hydration refs so they can re-hydrate in background
        libraryArtworkHydratedRef.current = false;
        storeArtworkHydratedRef.current = false;

        // Force a re-fetch of store artwork as well by resetting it
        setStoreArtwork({});
        
        // Trigger useEffects by updating cacheVersion
        setCacheVersion(v => v + 1);

        addDiagnostic('Artwork', 'info', 'Artwork cache cleared successfully. Triggering re-fetch.');
        alert("Artwork cache cleared successfully! The launcher will now re-fetch clean pictures.");
      } else {
        addDiagnostic('Artwork', 'error', `Purge failed: ${result.error}`);
        alert(`Failed to clear artwork cache: ${result.error}`);
      }
    } else {
      // Browser Sandbox fallback
      const updated = games.map(game => {
        return {
          ...game,
          coverUrl: null,
          bannerUrl: null,
          logoUrl: null,
          iconUrl: null,
          artworkFetched: false,
          artworkSource: null
        };
      });
      setGames(updated);
      setSelectedGame(prev => updated.find(g => g.id === prev?.id) || updated[0] || null);
      localStorage.setItem('nexus_games_cache', JSON.stringify(updated));
      
      // Reset hydration refs
      libraryArtworkHydratedRef.current = false;
      storeArtworkHydratedRef.current = false;
      setStoreArtwork({});
      setCacheVersion(v => v + 1);
      
      alert("Cache cleared successfully (sandbox mock)!");
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

  const hasBlockingOverlay = isSettingsOpen || isMetadataOpen || isProfileOpen || bannerEditMode;
  const primaryViews = ['store', 'library', 'favourites'];

  const handleControllerBack = () => {
    if (isMetadataOpen) {
      setIsMetadataOpen(false);
      return true;
    }
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
      return true;
    }
    if (isProfileOpen) {
      setIsProfileOpen(false);
      return true;
    }
    if (bannerEditMode) {
      setBannerEditMode(false);
      return true;
    }
    if (isCcOpen) {
      setIsCcOpen(false);
      return true;
    }
    if (activeView === 'store-item') {
      handleBackToStore();
      return true;
    }
    if (activeView !== 'library') {
      handleViewChange('library');
      return true;
    }
    return false;
  };

  const handleControllerViewCycle = (step) => {
    if (hasBlockingOverlay || isCcOpen || activeView === 'store-item') return false;

    const currentIndex = Math.max(0, primaryViews.indexOf(activeView));
    const nextView = primaryViews[(currentIndex + step + primaryViews.length) % primaryViews.length];
    handleViewChange(nextView);
    return true;
  };

  const handleControllerFavorite = () => {
    if (hasBlockingOverlay || isCcOpen || !selectedGame || (activeView !== 'library' && activeView !== 'favourites')) {
      return false;
    }

    audioEngine.playClickPulse();
    handleToggleFavorite(selectedGame.id);
    return true;
  };

  const handleControllerMenu = () => {
    if (hasBlockingOverlay) return false;

    audioEngine.playClickPulse();
    setIsCcOpen(prev => !prev);
    return true;
  };

  const handleControllerMetadata = () => {
    if (hasBlockingOverlay || isCcOpen || activeView !== 'library' || !selectedGame) return false;

    audioEngine.playClickPulse();
    setIsMetadataOpen(true);
    return true;
  };

  useUnifiedInput({
    onBack: handleControllerBack,
    onShoulderLeft: () => handleControllerViewCycle(-1),
    onShoulderRight: () => handleControllerViewCycle(1),
    onSecondary: handleControllerFavorite,
    onTertiary: handleControllerMetadata,
    onMenu: handleControllerMenu,
    focusDependencies: [
      activeView,
      selectedGame?.id,
      selectedStoreItem?.id,
      searchQuery,
      games.length,
      isCcOpen,
      isSettingsOpen,
      isMetadataOpen,
      isProfileOpen,
      bannerEditMode
    ]
  });

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
        ramUsedGb={ramUsedGb}
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
              onEditMetadata={handleOpenMetadata}
              onRemoveGame={handleRemoveGame}
              isRunning={runningGameId === selectedGame?.id}
              bannerAnimation={settings.bannerAnimation}
              studioLogosEnabled={settings.studioLogosEnabled}
              brandfetchClientId={settings.brandfetchClientId}
              brandfetchCacheVersion={cacheVersion}
              onUpdateGameBannerLayout={handleUpdateGameBannerLayout}
              editMode={bannerEditMode}
              setEditMode={setBannerEditMode}
            />

            <HorizontalLibrary 
              games={getFilteredGames()}
              selectedGame={selectedGame}
              onSelectGame={setSelectedGame}
              onLaunchGame={handleLaunchGame}
              onEditMetadata={handleOpenMetadata}
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
            onEditMetadata={handleOpenMetadata}
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

      <ControllerHintOverlay
        activeView={activeView}
        isControlCenterOpen={isCcOpen}
        isSettingsOpen={isSettingsOpen}
        isMetadataOpen={isMetadataOpen}
        isProfileOpen={isProfileOpen}
        isBannerEditMode={bannerEditMode}
        selectedGame={selectedGame}
      />



      {/* 6. Settings Panel Configuration pop-up */}
      {isSettingsOpen && (
        <SettingsPanel 
          settings={settings}
          onUpdateSettings={setSettings}
          onResetDatabase={handleResetDatabase}
          onClearArtworkCache={handleClearArtworkCache}
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
