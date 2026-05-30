import React, { useState, useEffect, useRef } from 'react';
import NavigationHeader from './components/NavigationHeader';
import InteractiveCanvas from './components/InteractiveCanvas';
import HorizontalLibrary from './components/HorizontalLibrary';
import GameMainBanner from './components/GameMainBanner';
import ControlCenter from './components/ControlCenter';
import PiPSidebar from './components/PiPSidebar';
import MetadataEditor from './components/MetadataEditor';
import SettingsPanel from './components/SettingsPanel';
import StoreGrid from './components/StoreGrid';
import StoreItemPage from './components/StoreItemPage';
import { defaultGames, matchGameMetadata, storeCatalog } from './utils/mockDatabase';
import { audioEngine } from './utils/audioEngine';
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

  // --- Panels & Dialog Overlay Toggles ---
  const [isCcOpen, setIsCcOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);

  // --- System Diagnostic Metrics (CPU/RAM Mock telemetry) ---
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(34);

  // --- Visual & UX Customisation Variables ---
  const [settings, setSettings] = useState({
    theme: 'theme-aether',
    isMuted: false,
    glassBlur: 20,
    glassOpacity: 0.4,
    particleDensity: 1.0,
    particleSpeed: 1.0
  });

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

  // --- 2. Synchronize Custom Settings & CSS Styles ---
  useEffect(() => {
    // Sync active settings theme to body element
    const body = document.body;
    body.className = `${settings.theme} ecosystem-games-bg`;

    // Apply sliders styling variables to :root
    document.documentElement.style.setProperty('--panel-bg', `rgba(10, 10, 16, ${settings.glassOpacity})`);
    document.documentElement.style.setProperty('--panel-bg-solid', `rgba(10, 10, 16, ${Math.min(0.98, settings.glassOpacity * 1.5)})`);
    document.documentElement.style.setProperty('--glass-border', `rgba(255, 255, 255, ${settings.glassOpacity * 0.18})`);
    
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

  // --- Action Trigger: Folder Scanning Batch Imports ---
  const handleImportScannedGames = async (matchedImports) => {
    const addedList = [...games];
    matchedImports.forEach(scannedFile => {
      // Exclude if path already matches
      const exists = addedList.find(g => g.exePath === scannedFile.path);
      if (!exists) {
        const metadata = matchGameMetadata(scannedFile.name, scannedFile.path);
        // Create clean ID
        const cleanId = scannedFile.name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.floor(Math.random()*100);
        addedList.push({
          ...metadata,
          id: cleanId
        });
      }
    });

    setGames(addedList);
    setSelectedGame(addedList[addedList.length - 1]); // Highlight newly added game
    
    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(addedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(addedList));
    }
  };

  // --- Action Trigger: Manual EXE Import ---
  const handleManualImport = () => {
    audioEngine.playClickPulse();
    const mockExe = prompt("Input complete Windows Executable file path (.exe):", "C:\\Windows\\notepad.exe");
    if (!mockExe) return;

    const name = mockExe.split('\\').pop().replace('.exe', '');
    const cleanId = name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.floor(Math.random()*100);
    const metadata = matchGameMetadata(name, mockExe);

    const updated = [...games, { ...metadata, id: cleanId }];
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

  // Sync store catalog ownership with games library
  const syncedCatalog = storeCatalog.map(item => ({
    ...item,
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
      />

      {/* 3. Main Dashboard Interactive Workspace */}
      <main className={`main-viewport ${isSidebarPinned && activeView === 'library' ? 'sidebar-active' : ''}`}>
        {activeView === 'library' && (
          <>
            <GameMainBanner 
              game={selectedGame}
              onLaunch={handleLaunchGame}
              onToggleFavorite={handleToggleFavorite}
              onEditMetadata={() => setIsMetadataOpen(true)}
              onPinSidebar={() => setIsSidebarPinned(!isSidebarPinned)}
              isRunning={runningGameId === selectedGame?.id}
              isSidebarPinned={isSidebarPinned}
            />

            <HorizontalLibrary 
              games={getFilteredGames()}
              selectedGame={selectedGame}
              onSelectGame={setSelectedGame}
              onLaunchGame={handleLaunchGame}
              runningGameId={runningGameId}
            />
          </>
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
        cpuUsage={cpuUsage}
        ramUsage={ramUsage}
      />

      {/* 5. Snapped Multitasking Activity Sidebar */}
      {isSidebarPinned && (
        <PiPSidebar 
          game={selectedGame}
          onClose={() => setIsSidebarPinned(false)}
          isRunning={runningGameId === selectedGame?.id}
          sessionTime={sessionTime}
          cpuUsage={cpuUsage}
          ramUsage={ramUsage}
        />
      )}

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
        />
      )}
    </div>
  );
}
