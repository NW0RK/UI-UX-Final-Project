import React, { useState, useEffect } from 'react';
import { Search, Settings, Minus, Square, X } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function NavigationHeader({ 
  onSearchChange, 
  searchQuery, 
  onOpenSettings,
  cpuUsage,
  ramUsage,
  activeView,
  onViewChange,
  systemStatusTracking = true,
  username = "And360red",
  userAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  onOpenProfile
}) {
  const [time, setTime] = useState('');

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
        <div className="nexus-logo" onClick={() => { audioEngine.playClickPulse(); onViewChange('library'); }}>
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
                <span className="telemetry-text">RAM {12 + Math.round((ramUsage / 100) * 4)}GB</span>
              </div>

              {/* Divider */}
              <div className="dashboard-divider" />
            </>
          )}

          {/* User Profile Section */}
          <div 
            className="profile-user-section" 
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
          letter-spacing: 8px;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.3s var(--ease-ps5);
          text-shadow: 0 0 5px rgba(var(--accent-color-rgb), 0.1);
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
          padding: 6px 12px;
          border-radius: 6px;
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
          transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
        }

        .mode-tab:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.05);
        }

        .mode-tab.active {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.1);
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
          border-radius: 24px;
          padding: 10px 16px 10px 40px;
          color: #fff;
          font-family: var(--font-sans);
          font-size: var(--fs-13);
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
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
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

