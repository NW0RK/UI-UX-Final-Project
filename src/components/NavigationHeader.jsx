import React, { useState, useEffect } from 'react';
import { Search, Settings, Minus, Square, X, User, Library, ShoppingCart, Trophy } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './NavigationHeader.css';

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

    </header>
  );
}
