import React, { useState } from 'react';
import { Settings, FolderSearch, PlusCircle, Power, User, ShieldCheck, ChevronUp, ChevronDown, CheckSquare, Square, Search, Cloud, Download } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './ControlCenter.css';

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
  const [scanPath, setScanPath] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedFiles, setScannedFiles] = useState([]);
  const [selectedScans, setSelectedScans] = useState({});

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

  const handleToggleSelectFile = (filePath) => {
    audioEngine.playHoverTick();
    setSelectedScans(prev => ({
      ...prev,
      [filePath]: !prev[filePath]
    }));
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
        onClick={handleToggleClick}
        onMouseEnter={audioEngine.playHoverTick}
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        <span className="trigger-text">{isOpen ? 'Close CC' : 'Control Center'}</span>
      </div>

      {/* Floating System Dock Layer */}
      <div className="drawer-panel-grid glass-panel-heavy">
        {/* Left Side: System Telemetry and Quick Actions */}
        <div className="cc-section cc-telemetry-panel">
          <h3 className="cc-section-title">{systemStatusTracking ? 'System Status' : 'Quick Actions'}</h3>
          
          {/* Progress Indicators */}
          {systemStatusTracking && (
            <>
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
            </>
          )}

          {/* Quick utility controls */}
          <div className="quick-action-buttons-grid">
            <button 
              className="quick-btn-icon-label" 
              onClick={onManualImport}
              onMouseEnter={audioEngine.playHoverTick}
            >
              <PlusCircle size={18} />
              <span>Import EXE</span>
            </button>
            <button 
              className="quick-btn-icon-label artwork-btn" 
              onClick={onBatchFetchArtwork}
              disabled={!onBatchFetchArtwork || isBatchFetchingArtwork}
              onMouseEnter={audioEngine.playHoverTick}
              title="Fetch artwork for all games via SteamGridDB"
            >
              {isBatchFetchingArtwork ? <Download size={18} /> : <Cloud size={18} />}
              <span>{isBatchFetchingArtwork ? 'Fetching' : 'Fetch Art'}</span>
            </button>
            <button 
              className="quick-btn-icon-label" 
              onClick={onOpenSettings}
              onMouseEnter={audioEngine.playHoverTick}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button 
              className="quick-btn-icon-label shutdown-btn" 
              onClick={handleExitApp}
              onMouseEnter={audioEngine.playHoverTick}
            >
              <Power size={18} />
              <span>Power Off</span>
            </button>
          </div>
        </div>

        {/* Right Side: Deep Library Scanner Suite */}
        <div className="cc-section cc-scanner-panel">
          <div className="scanner-title-row">
            <h3 className="cc-section-title">Batch Library Scanner</h3>
            {onClearDiagnostics && diagnostics.length > 0 && (
              <button className="diagnostics-clear-btn" onClick={onClearDiagnostics}>Clear Diagnostics</button>
            )}
          </div>
          
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
          </div>

          {/* Scanner Output Box */}
          <div className="scanner-output-box">
            {isScanning && (
              <div className="scanning-radar-state">
                <div className="radar-sweep-effect" />
                <span className="radar-text">Analyzing executables, scanning depth 3...</span>
              </div>
            )}

            {!isScanning && scannedFiles.length === 0 && (
              <div className="scanner-empty-state">
                <FolderSearch size={24} className="empty-icon" />
                <span>Select a path and click Scan to match executables against PS5 cover database</span>
              </div>
            )}

            {!isScanning && scannedFiles.length > 0 && (
              <div className="scanner-results-list">
                <div className="results-header">
                  <span>Found {scannedFiles.length} matched games:</span>
                  <button className="import-submit-badge-btn" onClick={handleImportSelected}>
                    Import Selected ({Object.values(selectedScans).filter(Boolean).length})
                  </button>
                </div>
                <div className="results-grid">
                  {scannedFiles.map((file, idx) => {
                    const isSelected = selectedScans[file.path];
                    return (
                      <div 
                        key={idx} 
                        className={`result-item-row ${isSelected ? 'row-active' : ''}`}
                        onClick={() => handleToggleSelectFile(file.path)}
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

          <div className="diagnostics-panel">
            <div className="diagnostics-header">
              <span>Diagnostics</span>
              <span>{diagnostics.length} event{diagnostics.length === 1 ? '' : 's'}</span>
            </div>
            <div className="diagnostics-list">
              {diagnostics.length === 0 ? (
                <div className="diagnostics-empty">Scan/import/SteamGridDB events will appear here.</div>
              ) : diagnostics.slice(0, 12).map((event, idx) => (
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
      </div>


    </div>
  );
}
