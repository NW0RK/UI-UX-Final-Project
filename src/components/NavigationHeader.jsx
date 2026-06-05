import React, { useState, useEffect, useRef } from 'react';
import { Search, Settings, Minus, Square, X, CircleX } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { useSystemStatus } from '../hooks/useSystemStatus';

export default function NavigationHeader({ 
  onSearchChange, 
  searchQuery, 
  onOpenSettings,
  activeView,
  onViewChange,
  systemStatusTracking = true,
  username = "And360red",
  userAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  onOpenProfile
}) {
  const [time, setTime] = useState('');
  const searchInputRef = useRef(null);
  
  const { cpuUsage, ramUsage, ramUsedGb } = useSystemStatus(systemStatusTracking);

  const activeRamLabel = Number.isFinite(ramUsedGb)
    ? `${ramUsedGb.toFixed(ramUsedGb >= 10 ? 0 : 1)}GB`
    : `${ramUsage}%`;

  // Update Clock in HH:MM format
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
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

      {/* Primary Logo & Flat Tabs */}
      <div className="nav-left">
        <div
          className="nexus-logo"
          role="button"
          tabIndex={0}
          onClick={() => { audioEngine.playClickPulse(); onViewChange('library'); }}
        >
          N E X U S
        </div>
        <nav className="mode-tabs">
          <button
            className={`mode-tab ${activeView === 'store' || activeView === 'store-item' ? 'active' : ''}`}
            onClick={() => { audioEngine.playClickPulse(); onViewChange('store'); }}
          >
            Store
          </button>
          <button
            className={`mode-tab ${activeView === 'library' ? 'active' : ''}`}
            onClick={() => { audioEngine.playClickPulse(); onViewChange('library'); }}
          >
            Library
          </button>
          <button
            className={`mode-tab ${activeView === 'favourites' ? 'active' : ''}`}
            onClick={() => { audioEngine.playClickPulse(); onViewChange('favourites'); }}
          >
            Favourites
          </button>
        </nav>
      </div>

      {/* Center Search Bar */}
      <div className="nav-center">
        <div
          className={`search-wrapper ${searchQuery ? 'has-query' : ''}`}
          role="search"
          onClick={() => searchInputRef.current?.focus()}
        >
          <Search size={14} className="search-icon" />
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search games..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={audioEngine.playHoverTick}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              title="Clear Search"
              aria-label="Clear Search"
              onClick={(e) => {
                e.stopPropagation();
                audioEngine.playClickPulse();
                onSearchChange('');
                searchInputRef.current?.focus();
              }}
            >
              <CircleX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Right Profiles, Telemetry, and Settings */}
      <div className="nav-right">
        {/* Settings button next to dashboard */}
        <button 
          className="nav-icon-btn" 
          onClick={onOpenSettings}
          onMouseEnter={audioEngine.playHoverTick}
          title="Launcher Settings"
        >
          <Settings size={16} />
        </button>

        {/* Unified Glassmorphic Profile & Resource Telemetry Dashboard */}
        <div className="unified-profile-dashboard">
          {systemStatusTracking && (
            <>
              {/* CPU Telemetry Block */}
              <div className="telemetry-block">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="telemetry-icon">
                  <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="var(--accent-color)" strokeWidth="1" />
                  <path d="M4 0v2M8 0v2M4 10v2M8 10v2M0 4h2M0 8h2M10 4h2M10 8h2" stroke="var(--accent-color)" strokeWidth="1" />
                </svg>
                <span className="telemetry-text">CPU {cpuUsage}%</span>
              </div>

              {/* RAM Telemetry Block */}
              <div className="telemetry-block">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="telemetry-icon">
                  <rect x="1" y="3" width="10" height="6" rx="1.5" stroke="var(--accent-color)" strokeWidth="1" />
                  <path d="M3 3v6M6 3v6M9 3v6" stroke="var(--accent-color)" strokeWidth="1" />
                </svg>
                <span className="telemetry-text">RAM {activeRamLabel}</span>
              </div>

              {/* Divider */}
              <div className="dashboard-divider" />
            </>
          )}

          {/* User Profile Section */}
          <div 
            className="profile-user-section" 
            role="button"
            tabIndex={0}
            onClick={() => { audioEngine.playClickPulse(); onOpenProfile && onOpenProfile(); }}
            style={{ cursor: 'pointer' }}
            title="Manage Profile"
          >
            <span className="profile-username">{username}</span>
            <img 
              src={userAvatar} 
              alt={username} 
              className="profile-avatar" 
            />
          </div>
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

      {/* Styled JSX for the Redesigned Navigation Header */}
      <style dangerouslySetInnerHTML={{__html: `
        .navigation-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          min-height: var(--header-height);
          background: linear-gradient(180deg, rgba(5, 11, 20, 0.95) 0%, rgba(5, 11, 20, 0) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
          gap: 64px;
          z-index: 10000;
          -webkit-app-region: no-drag;
        }

        .nexus-logo {
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          font-size: var(--fs-30);
          line-height: 1.2;
          letter-spacing: 12px;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.3s var(--ease-interface);
          text-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.15);
        }

        .nexus-logo:hover {
          color: var(--accent-color);
          text-shadow: var(--accent-glow-subtle);
        }

        .mode-tabs {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .mode-tab {
          background: transparent;
          border: none;
          color: #94A3B8;
          padding: 0px 0px 4px;
          display: flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: var(--fs-14);
          line-height: 1.4;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color var(--transition-fast), border-color var(--transition-fast);
          border-bottom: 2px solid transparent;
        }

        .mode-tab:hover {
          color: #FFFFFF;
        }

        .mode-tab.active {
          color: var(--accent-color);
          border-bottom: 2px solid var(--accent-color);
        }

        .nav-center {
          width: 320px;
          z-index: 10000;
          -webkit-app-region: no-drag;
          display: flex;
          justify-content: center;
          transition: width 360ms var(--ease-interface);
        }

        .nav-center:focus-within,
        .nav-center:has(.search-wrapper.has-query) {
          width: 430px;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          min-width: 54px;
          border-radius: 22px;
          cursor: text;
          transition: transform 240ms var(--ease-interface), filter 240ms var(--ease-interface);
        }

        .search-wrapper:focus-within {
          transform: translateY(-1px);
          filter: drop-shadow(0 8px 18px rgba(var(--accent-color-rgb), 0.08));
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
          padding: 8px 38px 8px 40px;
          color: #fff;
          font-family: var(--font-sans);
          font-size: var(--fs-13);
          transition: background 260ms var(--ease-interface), border-color 260ms var(--ease-interface), box-shadow 260ms var(--ease-interface), padding 260ms var(--ease-interface);
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--accent-color);
          box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.15);
        }

        .search-clear-btn {
          position: absolute;
          right: 10px;
          width: 22px;
          height: 22px;
          border: none;
          border-radius: 50%;
          background: transparent;
          color: rgba(255, 255, 255, 0.42);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color var(--transition-fast), transform var(--transition-fast), background var(--transition-fast);
        }

        .search-clear-btn:hover,
        .search-clear-btn:focus-visible {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          transform: scale(1.08);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
          z-index: 10000;
          margin-right: 120px;
          -webkit-app-region: no-drag;
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

        /* Unified Glassmorphic Dashboard Pill Styles */
        .unified-profile-dashboard {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 8px 16px;
          gap: 24px;
          min-height: 50px;
          background: rgba(255, 255, 255, 0.0305882);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 33554400px;
          transition: all var(--transition-normal);
        }

        .unified-profile-dashboard:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .telemetry-block {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 8px;
          min-height: 16px;
        }

        .telemetry-icon {
          flex-shrink: 0;
        }

        .telemetry-text {
          font-family: 'Liberation Mono', monospace;
          font-style: normal;
          font-weight: 400;
          font-size: var(--fs-12);
          line-height: 1.3;
          display: flex;
          align-items: center;
          letter-spacing: 0.3px;
          color: #94A3B8;
        }

        .dashboard-divider {
          width: 1px;
          height: 16px;
          background: rgba(255, 255, 255, 0.1);
        }

        .profile-user-section {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 12px;
          min-height: 32px;
        }

        .profile-username {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: var(--fs-12);
          line-height: 1.3;
          display: flex;
          align-items: center;
          letter-spacing: 0.3px;
          color: #FFFFFF;
        }

        .profile-avatar {
          box-sizing: border-box;
          width: 32px;
          height: 32px;
          border: 2px solid var(--accent-color);
          border-radius: 33554400px;
          object-fit: cover;
          display: block;
        }

        .live-clock {
          font-family: var(--font-display);
          font-size: var(--fs-13);
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

