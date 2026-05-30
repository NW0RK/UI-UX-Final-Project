import React, { useState } from 'react';
import { Settings, FolderSearch, PlusCircle, Power, User, ShieldCheck, ChevronUp, ChevronDown, CheckSquare, Square, Search, Cloud, Download } from 'lucide-react';
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
  games
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
        const results = await window.electronAPI.scanExecutables(scanPath);
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
          <h3 className="cc-section-title">System Status</h3>
          
          {/* Progress Indicators */}
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
          <h3 className="cc-section-title">Batch Library Scanner</h3>
          
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
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .control-center-drawer-container {
          position: fixed;
          bottom: -300px;
          left: 0;
          width: 100%;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: bottom 0.6s var(--ease-ps5);
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
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.8);
        }

        .drawer-panel-grid {
          width: calc(100% - 80px);
          max-width: 1360px;
          height: 280px;
          margin-bottom: 20px;
          border-radius: 20px;
          display: grid;
          grid-template-columns: 350px 1fr;
          padding: 24px;
          gap: 24px;
          pointer-events: auto;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.8);
        }

        .cc-section {
          display: flex;
          flex-direction: column;
        }

        .cc-section-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 16px;
        }

        .cc-telemetry-panel {
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding-right: 24px;
        }

        .telemetry-bar-item {
          margin-bottom: 14px;
        }

        .bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
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
          margin-top: auto;
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
          font-size: 9px;
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

        .cc-scanner-panel {
          min-width: 0; /* Prevents overflow */
        }

        .scanner-input-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .browser-directory-btn {
          flex-shrink: 0;
          font-size: 11px;
          padding: 8px 16px;
        }

        .directory-path-display {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 8px 12px;
          font-family: var(--font-sans);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .scan-action-btn {
          flex-shrink: 0;
          font-size: 11px;
          padding: 8px 20px;
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
          font-size: 11px;
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
          font-size: 12px;
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
          font-size: 11px;
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
          font-size: 10px;
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
          font-size: 12px;
          font-weight: 600;
          color: #fff;
        }

        .result-path {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}} />
    </div>
  );
}
