import React, { useState, useEffect } from 'react';
import { Search, Settings, Minus, Square, X, User, Library, ShoppingCart, Trophy } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function NavigationHeader({ 
  onSearchChange, 
  searchQuery, 
  onOpenSettings,
  cpuUsage,
  ramUsage,
  activeView,
  onViewChange,
  systemStatusTracking = true
}) {
  const [time, setTime] = useState('');

  // Update Clock in PS5 format (HH:MM)
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleControlClick = (action) => {
    audioEngine.playClickPulse();
    if (window.electronAPI) {
      if (action === 'minimize') window.electronAPI.windowMinimize();
      if (action === 'maximize') window.electronAPI.windowMaximize();
      if (action === 'close') window.electronAPI.windowClose();
    }
  };

  return (
    <header className="navigation-header">
      {/* Frameless Drag Handle */}
      <div className="titlebar-draggable" />

      {/* Primary Logo */}
      <div className="nav-left">
        <div className="nexus-logo">
          N E X U S
        </div>
        <div className="mode-tabs">
          <button
            className={`mode-tab ${activeView === 'library' ? 'active' : ''}`}
            onClick={() => { audioEngine.playClickPulse(); onViewChange('library'); }}
          >
            <Library size={12} />
            <span>Library</span>
          </button>
          <button
            className={`mode-tab ${activeView === 'favourites' ? 'active' : ''}`}
            onClick={() => { audioEngine.playClickPulse(); onViewChange('favourites'); }}
          >
            <Trophy size={12} />
            <span>Favourites</span>
          </button>
          <button
            className={`mode-tab ${activeView === 'store' || activeView === 'store-item' ? 'active' : ''}`}
            onClick={() => { audioEngine.playClickPulse(); onViewChange('store'); }}
          >
            <ShoppingCart size={12} />
            <span>Store</span>
          </button>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="nav-center">
        <div className="search-wrapper">
          <Search size={14} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search games, activities..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={audioEngine.playHoverTick}
          />
        </div>
      </div>

      {/* Right Profiles, Telemetry, and Native Controls */}
      <div className="nav-right">
        {/* System Monitor Telemetry */}
        {systemStatusTracking && (
          <div className="system-telemetry-pill">
            <div className="telemetry-item">
              <span className="telemetry-label">CPU</span>
              <span className="telemetry-value">{cpuUsage}%</span>
            </div>
            <div className="telemetry-divider" />
            <div className="telemetry-item">
              <span className="telemetry-label">RAM</span>
              <span className="telemetry-value">{ramUsage}%</span>
            </div>
          </div>
        )}

        {/* Action Widgets */}
        <button 
          className="nav-icon-btn" 
          onClick={onOpenSettings}
          onMouseEnter={audioEngine.playHoverTick}
          title="Launcher Settings"
        >
          <Settings size={18} />
        </button>

        {/* Profile Avatar widget */}
        <div 
          className="profile-avatar-pill" 
          onMouseEnter={audioEngine.playHoverTick}
          title="User Profile"
        >
          <div className="avatar-icon-wrapper">
            <User size={14} />
          </div>
          <span className="avatar-username">Player 1</span>
        </div>

        {/* Live Clock */}
        <div className="live-clock">{time}</div>

        {/* Native Windows Frameless Window Buttons */}
        <div className="titlebar-controls-container">
          <button 
            className="titlebar-btn" 
            onClick={() => handleControlClick('minimize')}
            title="Minimize"
          >
            <Minus size={14} />
          </button>
          <button 
            className="titlebar-btn" 
            onClick={() => handleControlClick('maximize')}
            title="Maximize/Restore"
          >
            <Square size={10} />
          </button>
          <button 
            className="titlebar-btn close-btn" 
            onClick={() => handleControlClick('close')}
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Styled JSX for the Navigation Header */}
      <style dangerouslySetInnerHTML={{__html: `
        .navigation-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--header-height);
          background: linear-gradient(180deg, rgba(10, 10, 16, 0.8) 0%, rgba(10, 10, 16, 0) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          z-index: 1000;
          pointer-events: auto;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 40px;
          z-index: 10000;
          -webkit-app-region: no-drag;
        }

        .nexus-logo {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 20px;
          letter-spacing: 5px;
          color: #fff;
          cursor: pointer;
          background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }

        .mode-tabs {
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 4px;
          border-radius: 30px;
        }

        .mode-tab {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          padding: 6px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mode-tab:hover {
          color: #fff;
        }

        .mode-tab.active {
          background: rgba(255, 255, 255, 0.08);
          color: var(--accent-color);
          box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.1);
          border: 1px solid rgba(var(--accent-color-rgb), 0.15);
        }

        .nav-center {
          width: 320px;
          z-index: 10000;
          -webkit-app-region: no-drag;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 8px 16px 8px 40px;
          color: #fff;
          font-family: var(--font-sans);
          font-size: 13px;
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--accent-color);
          box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.15);
          width: 380px;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
          z-index: 10000;
          margin-right: 120px; /* Leave space for native window controls */
          -webkit-app-region: no-drag;
        }

        .system-telemetry-pill {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 4px 12px;
          font-size: 11px;
          font-family: var(--font-display);
        }

        .telemetry-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .telemetry-label {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 400;
        }

        .telemetry-value {
          color: var(--accent-color);
          font-weight: 700;
        }

        .telemetry-divider {
          width: 1px;
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 10px;
        }

        .nav-icon-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          transform: translateY(-1px);
        }

        .profile-avatar-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 4px 12px 4px 4px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .profile-avatar-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .avatar-icon-wrapper {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--accent-color);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--accent-glow-subtle);
        }

        .avatar-username {
          color: #fff;
          font-size: 12px;
          font-weight: 600;
        }

        .live-clock {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #fff;
          padding-left: 10px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
        }
      `}} />
    </header>
  );
}
