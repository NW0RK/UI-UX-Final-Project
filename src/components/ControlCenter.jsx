import React, { useState } from 'react';
import { Activity, ClipboardList, Settings, FolderSearch, PlusCircle, Power, ChevronUp, ChevronDown, CheckSquare, Square, Cloud, Download } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ControlCenter({ 
  isOpen, 
  onToggle, 
  onOpenSettings, 
  onManualImport, 
  onImportScannedGames,
  onBatchFetchArtwork,
  isBatchFetchingArtwork = false,
  cpuUsage,
  ramUsage,
  games,
  systemStatusTracking = true,
  diagnostics = [],
  onClearDiagnostics
}) {
  const [activeMode, setActiveMode] = useState('quick');
  const [scanPath, setScanPath] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedFiles, setScannedFiles] = useState([]);
  const [selectedScans, setSelectedScans] = useState({});

  const selectedScanCount = Object.values(selectedScans).filter(Boolean).length;

  const modes = [
    { id: 'quick', label: 'Quick', icon: Activity },
    { id: 'import', label: 'Import', icon: FolderSearch },
    { id: 'diagnostics', label: 'Diagnostics', icon: ClipboardList, count: diagnostics.length }
  ];

  const handleToggleClick = () => {
    audioEngine.playClickPulse();
    onToggle();
  };

  const handleSelectDirectory = async () => {
    audioEngine.playClickPulse();
    if (window.electronAPI) {
      const path = await window.electronAPI.selectDirectory();
      if (path) {
        setScanPath(path);
      }
    } else {
      // Browser Mock
      setScanPath('C:\\Program Files (x86)\\Steam\\steamapps\\common');
    }
  };

  const handleRunScan = async () => {
    if (!scanPath) return;
    audioEngine.playClickPulse();
    setIsScanning(true);
    setScannedFiles([]);

    try {
      if (window.electronAPI) {
        // Run real depth-limited scan via Electron main process
        const scanResult = await window.electronAPI.scanExecutables(scanPath);
        const results = Array.isArray(scanResult) ? scanResult : (scanResult?.files || []);
        if (results.length === 0) {
          alert('Scan completed, but no importable .exe files were found. Check Diagnostics for skipped paths and permissions.');
        }
        setTimeout(() => {
          setScannedFiles(results);
          setIsScanning(false);
          // Auto select all scanned items
          const initialSelection = {};
          results.forEach(file => {
            initialSelection[file.path] = true;
          });
          setSelectedScans(initialSelection);
        }, 1500); // Quick delay to appreciate the beautiful cyber scanning sweep!
      } else {
        // Browser Mock Results
        setTimeout(() => {
          const mockResults = [
            { name: 'eldenring', path: 'C:\\SteamLibrary\\steamapps\\common\\Elden Ring\\Game\\eldenring.exe' },
            { name: 'hades', path: 'C:\\SteamLibrary\\steamapps\\common\\Hades\\hades.exe' },
            { name: 'minecraft', path: 'C:\\Games\\Minecraft\\minecraft.exe' }
          ];
          setScannedFiles(mockResults);
          setIsScanning(false);
          
          const initialSelection = {};
          mockResults.forEach(file => {
            initialSelection[file.path] = true;
          });
          setSelectedScans(initialSelection);
        }, 1800);
      }
    } catch (e) {
      setIsScanning(false);
      alert(`Directory scan failed: ${e.message}`);
    }
  };

  const handleAutoDetectPlatforms = async () => {
    audioEngine.playClickPulse();
    setIsScanning(true);
    setScannedFiles([]);

    try {
      if (window.electronAPI?.scanPlatforms) {
        const scanResult = await window.electronAPI.scanPlatforms();
        const results = Array.isArray(scanResult) ? scanResult : (scanResult?.files || []);
        if (results.length === 0) {
          alert('Auto-detect completed, but no games were discovered. Ensure Steam, Epic, GOG, or Xbox games are installed.');
        }
        setTimeout(() => {
          setScannedFiles(results);
          setIsScanning(false);
          const initialSelection = {};
          results.forEach(file => {
            initialSelection[file.path] = true;
          });
          setSelectedScans(initialSelection);
        }, 1500);
      } else {
        // Browser Mock Results for Platform Scanning
        setTimeout(() => {
          const mockResults = [
            { name: 'Portal 2', path: 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Portal 2\\portal2.exe', steamAppId: '620', platform: 'Steam' },
            { name: 'Cyberpunk 2077', path: 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Cyberpunk 2077\\bin\\x64\\Cyberpunk2077.exe', steamAppId: '1091500', platform: 'Steam' },
            { name: 'Fortnite', path: 'C:\\Program Files\\Epic Games\\Fortnite\\FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping.exe', platform: 'Epic Games' },
            { name: 'The Witcher 3: Wild Hunt', path: 'C:\\GOG Games\\The Witcher 3 Wild Hunt\\bin\\x64\\witcher3.exe', platform: 'GOG Galaxy' }
          ];
          setScannedFiles(mockResults);
          setIsScanning(false);
          const initialSelection = {};
          mockResults.forEach(file => {
            initialSelection[file.path] = true;
          });
          setSelectedScans(initialSelection);
        }, 1800);
      }
    } catch (e) {
      setIsScanning(false);
      alert(`Platform discovery failed: ${e.message}`);
    }
  };

  const handleToggleSelectFile = (filePath) => {
    audioEngine.playHoverTick();
    setSelectedScans(prev => ({
      ...prev,
      [filePath]: !prev[filePath]
    }));
  };

  const handleModeChange = (modeId) => {
    audioEngine.playClickPulse();
    setActiveMode(modeId);
  };

  const handleImportSelected = () => {
    audioEngine.playClickPulse();
    const toImport = scannedFiles.filter(f => selectedScans[f.path]);
    if (toImport.length === 0) return;

    onImportScannedGames(toImport);
    // Reset scanner
    setScannedFiles([]);
    setScanPath('');
    onToggle(); // Close Control Center
  };

  const handleExitApp = async () => {
    audioEngine.playClickPulse();
    if (window.electronAPI) {
      const result = await window.electronAPI.powerOff();
      if (result && !result.success) {
        alert(`Windows shutdown failed: ${result.error}`);
      }
    } else {
      alert("Windows Shut Down (Mock)");
    }
  };

  return (
    <div className={`control-center-drawer-container ${isOpen ? 'drawer-open' : ''}`}>
      {/* Slide Handle Trigger */}
      <div 
        className="drawer-trigger-handle" 
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={handleToggleClick}
        onMouseEnter={audioEngine.playHoverTick}
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        <span className="trigger-text">{isOpen ? 'Close CC' : 'Control Center'}</span>
      </div>

      {/* Floating System Dock Layer */}
      <div className="drawer-panel-grid glass-panel-heavy">
        <div className="cc-mode-rail" role="tablist" aria-label="Control Center modes">
          {modes.map(mode => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                className={`cc-mode-tab ${isActive ? 'mode-active' : ''}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`cc-panel-${mode.id}`}
                onClick={() => handleModeChange(mode.id)}
                onMouseEnter={audioEngine.playHoverTick}
              >
                <Icon size={18} />
                <span>{mode.label}</span>
                {typeof mode.count === 'number' && mode.count > 0 && (
                  <span className="mode-count">{mode.count}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="cc-mode-content">
          {activeMode === 'quick' && (
            <div id="cc-panel-quick" className="cc-panel" role="tabpanel">
              <div className="cc-panel-header">
                <div>
                  <h3 className="cc-section-title">Quick</h3>
                  <p className="cc-panel-kicker">Telemetry, artwork, settings, and power controls.</p>
                </div>
                <span className="cc-library-count">{games?.length || 0} games</span>
              </div>

              <div className="quick-mode-grid">
                {systemStatusTracking && (
                  <div className="cc-section telemetry-card">
                    <h4 className="cc-subsection-title">System Status</h4>
                    <div className="telemetry-bar-item">
                      <div className="bar-labels">
                        <span>CPU Core Load</span>
                        <span>{cpuUsage}%</span>
                      </div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: `${cpuUsage}%` }} />
                      </div>
                    </div>

                    <div className="telemetry-bar-item">
                      <div className="bar-labels">
                        <span>RAM Allocation</span>
                        <span>{ramUsage}%</span>
                      </div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: `${ramUsage}%` }} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="cc-section quick-actions-card">
                  <h4 className="cc-subsection-title">Actions</h4>
                  <div className="quick-action-buttons-grid">
                    <button
                      className="quick-btn-icon-label"
                      onClick={onManualImport}
                      onMouseEnter={audioEngine.playHoverTick}
                      title="Import executable"
                    >
                      <PlusCircle size={20} />
                      <span>Import EXE</span>
                    </button>
                    <button
                      className="quick-btn-icon-label artwork-btn"
                      onClick={onBatchFetchArtwork}
                      disabled={!onBatchFetchArtwork || isBatchFetchingArtwork}
                      onMouseEnter={audioEngine.playHoverTick}
                      title="Fetch artwork for all games via SteamGridDB"
                    >
                      {isBatchFetchingArtwork ? <Download size={20} /> : <Cloud size={20} />}
                      <span>{isBatchFetchingArtwork ? 'Fetching' : 'Fetch Art'}</span>
                    </button>
                    <button
                      className="quick-btn-icon-label"
                      onClick={onOpenSettings}
                      onMouseEnter={audioEngine.playHoverTick}
                      title="Open settings"
                    >
                      <Settings size={20} />
                      <span>Settings</span>
                    </button>
                    <button
                      className="quick-btn-icon-label shutdown-btn"
                      onClick={handleExitApp}
                      onMouseEnter={audioEngine.playHoverTick}
                      title="Power off Windows"
                    >
                      <Power size={20} />
                      <span>Power Off</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMode === 'import' && (
            <div id="cc-panel-import" className="cc-panel" role="tabpanel">
              <div className="cc-panel-header">
                <div>
                  <h3 className="cc-section-title">Import</h3>
                  <p className="cc-panel-kicker">Manual executable import and batch library scanning.</p>
                </div>
                {scannedFiles.length > 0 && (
                  <button className="import-submit-badge-btn" onClick={handleImportSelected}>
                    Import Selected ({selectedScanCount})
                  </button>
                )}
              </div>

              <div className="import-toolbar">
                <button
                  className="quick-btn-icon-label import-manual-btn"
                  onClick={onManualImport}
                  onMouseEnter={audioEngine.playHoverTick}
                >
                  <PlusCircle size={20} />
                  <span>Manual EXE</span>
                </button>
                <div className="scanner-input-row">
                  <button
                    className="glow-btn browser-directory-btn"
                    onClick={handleSelectDirectory}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    Browse Path
                  </button>
                  <div className="directory-path-display" title={scanPath || 'No directory selected'}>
                    {scanPath || 'Click Browse to select scanning directory...'}
                  </div>
                  <button
                    className="glow-btn glow-btn-primary scan-action-btn"
                    onClick={handleRunScan}
                    disabled={!scanPath || isScanning}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    {isScanning ? 'Scanning...' : 'Scan Directory'}
                  </button>
                  <button
                    className="glow-btn scan-action-btn auto-detect-platforms-btn"
                    onClick={handleAutoDetectPlatforms}
                    disabled={isScanning}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    Auto-Detect
                  </button>
                </div>
              </div>

              <div className="scanner-output-box">
                {isScanning && (
                  <div className="scanning-radar-state">
                    <div className="radar-sweep-effect" />
                    <span className="radar-text">
                      {scanPath ? 'Analyzing executables, scanning depth 3...' : 'Probing Steam, Epic, GOG, and Xbox installations...'}
                    </span>
                  </div>
                )}

                {!isScanning && scannedFiles.length === 0 && (
                  <div className="scanner-empty-state">
                    <FolderSearch size={24} className="empty-icon" />
                    <span>Select a path, auto-detect platforms, or manually import one executable.</span>
                  </div>
                )}

                {!isScanning && scannedFiles.length > 0 && (
                  <div className="scanner-results-list">
                    <div className="results-header">
                      <span>Found {scannedFiles.length} matched games</span>
                      <span>{selectedScanCount} selected</span>
                    </div>
                    <div className="results-grid">
                      {scannedFiles.map((file, idx) => {
                        const isSelected = selectedScans[file.path];
                        return (
                          <div
                            key={idx}
                            className={`result-item-row ${isSelected ? 'row-active' : ''}`}
                            role="checkbox"
                            tabIndex={0}
                            aria-checked={isSelected}
                            onClick={() => handleToggleSelectFile(file.path)}
                            onFocus={audioEngine.playHoverTick}
                          >
                            {isSelected ? <CheckSquare size={14} className="checkbox-icon" /> : <Square size={14} className="checkbox-icon" />}
                            <div className="result-info">
                              <span className="result-name">{file.name}</span>
                              {file.steamAppId && <span className="result-path">Steam AppID: {file.steamAppId}</span>}
                              <span className="result-path">{file.path}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeMode === 'diagnostics' && (
            <div id="cc-panel-diagnostics" className="cc-panel" role="tabpanel">
              <div className="cc-panel-header">
                <div>
                  <h3 className="cc-section-title">Diagnostics</h3>
                  <p className="cc-panel-kicker">Import, scanner, and artwork events.</p>
                </div>
                {onClearDiagnostics && diagnostics.length > 0 && (
                  <button className="diagnostics-clear-btn" onClick={onClearDiagnostics}>Clear Diagnostics</button>
                )}
              </div>

              <div className="diagnostics-panel diagnostics-panel-full">
                <div className="diagnostics-header">
                  <span>Event Log</span>
                  <span>{diagnostics.length} event{diagnostics.length === 1 ? '' : 's'}</span>
                </div>
                <div className="diagnostics-list">
                  {diagnostics.length === 0 ? (
                    <div className="diagnostics-empty">Scan/import/SteamGridDB events will appear here.</div>
                  ) : diagnostics.slice(0, 24).map((event, idx) => (
                    <div key={`${event.timestamp || idx}-${idx}`} className={`diagnostic-row diagnostic-${event.level || 'info'}`}>
                      <span className="diagnostic-meta">{event.area || 'App'} - {event.level || 'info'}</span>
                      <span className="diagnostic-message">{event.message}</span>
                      {event.details && (
                        <span className="diagnostic-details" title={JSON.stringify(event.details)}>{JSON.stringify(event.details)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .control-center-drawer-container {
          position: fixed;
          bottom: -380px;
          left: 0;
          width: 100%;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: bottom 0.6s var(--ease-interface);
          pointer-events: none;
        }

        .control-center-drawer-container.drawer-open {
          bottom: 0;
        }

        .drawer-trigger-handle {
          background: rgba(10, 10, 16, 0.7);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: none;
          border-radius: 20px 20px 0 0;
          padding: 6px 30px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.25);
          transition: all var(--transition-fast);
        }

        .drawer-trigger-handle:hover {
          background: rgba(var(--accent-color-rgb), 0.15);
          border-color: rgba(var(--accent-color-rgb), 0.3);
          box-shadow: 0 -4px 15px rgba(var(--accent-color-rgb), 0.15);
        }

        .trigger-text {
          font-family: var(--font-display);
          font-size: var(--fs-10);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.8);
        }

        .drawer-panel-grid {
          width: calc(100% - 80px);
          max-width: 1360px;
          min-height: 360px;
          margin-bottom: 20px;
          border-radius: 20px;
          display: grid;
          grid-template-columns: 180px minmax(0, 1fr);
          padding: 18px;
          gap: 18px;
          pointer-events: auto;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.8);
        }

        .cc-mode-rail {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
        }

        .cc-mode-tab {
          position: relative;
          width: 100%;
          min-height: 54px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.025);
          color: rgba(255, 255, 255, 0.62);
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .cc-mode-tab:hover,
        .cc-mode-tab.mode-active {
          background: rgba(var(--accent-color-rgb), 0.1);
          border-color: rgba(var(--accent-color-rgb), 0.32);
          color: var(--accent-color);
          box-shadow: inset 0 0 18px rgba(var(--accent-color-rgb), 0.08);
        }

        .cc-mode-tab span:not(.mode-count) {
          font-family: var(--font-display);
          font-size: var(--fs-11);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .mode-count {
          margin-left: auto;
          min-width: 24px;
          height: 22px;
          padding: 0 7px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.8);
          font-size: var(--fs-10);
          font-weight: 700;
        }

        .cc-mode-content {
          min-width: 0;
          display: flex;
        }

        .cc-panel {
          width: 100%;
          display: flex;
          flex-direction: column;
          min-height: 324px;
        }

        .cc-panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .cc-panel-header .cc-section-title {
          margin-bottom: 6px;
        }

        .cc-panel-kicker {
          margin: 0;
          font-size: var(--fs-12);
          color: rgba(255, 255, 255, 0.48);
        }

        .cc-library-count {
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          padding: 6px 12px;
          color: rgba(255, 255, 255, 0.58);
          font-size: var(--fs-11);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        .cc-section {
          display: flex;
          flex-direction: column;
        }

        .cc-section-title {
          font-family: var(--font-display);
          font-size: var(--fs-12);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 16px;
        }

        .cc-subsection-title {
          margin: 0 0 14px;
          font-family: var(--font-display);
          font-size: var(--fs-11);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.42);
        }

        .quick-mode-grid {
          flex: 1;
          display: grid;
          grid-template-columns: minmax(260px, 0.85fr) minmax(360px, 1.15fr);
          gap: 16px;
        }

        .telemetry-card,
        .quick-actions-card {
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.16);
          padding: 16px;
          min-width: 0;
        }

        .telemetry-bar-item {
          margin-bottom: 14px;
        }

        .bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: var(--fs-11);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 6px;
        }

        .bar-container {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: var(--accent-color);
          box-shadow: var(--accent-glow-subtle);
          border-radius: 4px;
          transition: width 0.5s ease-out;
        }

        .quick-action-buttons-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          height: calc(100% - 30px);
        }

        .quick-btn-icon-label {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px 6px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          gap: 6px;
          transition: all var(--transition-fast);
          min-height: 86px;
        }

        .quick-btn-icon-label:hover {
          background: rgba(var(--accent-color-rgb), 0.1);
          border-color: rgba(var(--accent-color-rgb), 0.25);
          color: var(--accent-color);
          transform: translateY(-2px);
        }

        .quick-btn-icon-label:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .quick-btn-icon-label span {
          font-size: var(--fs-9);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .shutdown-btn:hover {
          background: rgba(239, 68, 68, 0.15) !important;
          border-color: rgba(239, 68, 68, 0.4) !important;
          color: #ef4444 !important;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
        }

        .artwork-btn:hover {
          background: rgba(99, 102, 241, 0.15) !important;
          border-color: rgba(99, 102, 241, 0.4) !important;
          color: #818cf8 !important;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
        }

        .scanner-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .scanner-title-row .cc-section-title {
          margin-bottom: 0;
        }

        .diagnostics-clear-btn {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.7);
          border-radius: 999px;
          padding: 6px 10px;
          font-size: var(--fs-10);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
        }

        .import-toolbar {
          display: grid;
          grid-template-columns: 116px minmax(0, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .import-manual-btn {
          min-height: 44px;
          padding: 8px;
        }

        .scanner-input-row {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .browser-directory-btn {
          flex-shrink: 0;
          font-size: var(--fs-11);
          padding: 8px 16px;
        }

        .directory-path-display {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 8px 12px;
          font-family: var(--font-sans);
          font-size: var(--fs-12);
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .scan-action-btn {
          flex-shrink: 0;
          font-size: var(--fs-11);
          padding: 8px 20px;
        }

        .auto-detect-platforms-btn {
          background: rgba(0, 242, 254, 0.12);
          border: 1px solid rgba(0, 242, 254, 0.3);
          color: #00f2fe;
        }

        .auto-detect-platforms-btn:hover {
          background: rgba(0, 242, 254, 0.2);
          border-color: rgba(0, 242, 254, 0.5);
        }

        .scanner-output-box {
          flex: 1;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          min-height: 0; /* Grid containment */
        }

        .diagnostics-panel {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.18);
          overflow: hidden;
        }

        .diagnostics-panel-full {
          flex: 1;
        }

        .diagnostics-header {
          display: flex;
          justify-content: space-between;
          padding: 8px 10px;
          font-size: var(--fs-10);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.55);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .diagnostics-list {
          max-height: 230px;
          overflow-y: auto;
        }

        .diagnostics-panel-full .diagnostics-list {
          max-height: 270px;
        }

        .diagnostics-empty {
          padding: 10px;
          font-size: var(--fs-11);
          color: rgba(255, 255, 255, 0.35);
        }

        .diagnostic-row {
          display: grid;
          grid-template-columns: minmax(80px, auto) minmax(0, 1fr);
          gap: 6px 10px;
          padding: 7px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          font-size: var(--fs-11);
        }

        .diagnostic-meta {
          color: rgba(255, 255, 255, 0.46);
          text-transform: uppercase;
          font-size: var(--fs-9);
          letter-spacing: 0.08em;
        }

        .diagnostic-message {
          color: rgba(255, 255, 255, 0.78);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .diagnostic-details {
          grid-column: 2;
          color: rgba(255, 255, 255, 0.35);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: var(--fs-10);
        }

        .diagnostic-warn .diagnostic-message {
          color: #f8d36b;
        }

        .diagnostic-error .diagnostic-message {
          color: #ff7b8f;
        }

        .scanning-radar-state {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .radar-text {
          font-family: var(--font-display);
          font-size: var(--fs-11);
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--accent-color);
          text-shadow: var(--accent-glow-subtle);
        }

        .scanner-empty-state {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.3);
          font-size: var(--fs-12);
          padding: 0 40px;
          text-align: center;
        }

        .empty-icon {
          color: rgba(255, 255, 255, 0.15);
        }

        .scanner-results-list {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 12px;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--fs-11);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .import-submit-badge-btn {
          background: var(--accent-color);
          border: none;
          color: #07070a;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: var(--fs-10);
          font-weight: 700;
          font-family: var(--font-display);
          cursor: pointer;
          box-shadow: var(--accent-glow-subtle);
          transition: all var(--transition-fast);
        }

        .import-submit-badge-btn:hover {
          background: #fff;
          color: #000;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        }

        .results-grid {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .result-item-row {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .result-item-row:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .result-item-row.row-active {
          background: rgba(var(--accent-color-rgb), 0.03);
          border-color: rgba(var(--accent-color-rgb), 0.15);
        }

        .checkbox-icon {
          color: rgba(255, 255, 255, 0.3);
          flex-shrink: 0;
        }

        .row-active .checkbox-icon {
          color: var(--accent-color);
        }

        .result-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .result-name {
          font-size: var(--fs-12);
          font-weight: 600;
          color: #fff;
        }

        .result-path {
          font-size: var(--fs-10);
          color: rgba(255, 255, 255, 0.3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 900px) {
          .drawer-panel-grid {
            width: calc(100% - 32px);
            grid-template-columns: 1fr;
            min-height: 430px;
          }

          .cc-mode-rail {
            flex-direction: row;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            overflow-x: auto;
          }

          .cc-mode-tab {
            min-width: 148px;
          }

          .quick-mode-grid,
          .import-toolbar {
            grid-template-columns: 1fr;
          }

          .scanner-input-row,
          .quick-action-buttons-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            display: grid;
          }

          .directory-path-display {
            grid-column: 1 / -1;
          }
        }
      `}} />
    </div>
  );
}
