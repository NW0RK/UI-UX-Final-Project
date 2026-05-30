import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Sparkles, Sliders, RefreshCw, Layers, Key, Lock, Unlock } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function SettingsPanel({ 
  settings, 
  onUpdateSettings, 
  onClose,
  onResetDatabase,
  gamesCount
}) {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyStatus, setApiKeyStatus] = useState('loading'); // loading | custom | builtin
  const [apiKeySaved, setApiKeySaved] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getApiKey().then(result => {
        setApiKey(result.key);
        setApiKeyStatus(result.isCustom ? 'custom' : 'builtin');
      }).catch(() => setApiKeyStatus('builtin'));
    }
  }, []);

  const handleClose = () => {
    audioEngine.playClickPulse();
    onClose();
  };

  const handleThemeChange = (themeName) => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, theme: themeName });
  };

  const handleAudioToggle = () => {
    const nextMute = !settings.isMuted;
    audioEngine.playClickPulse();
    audioEngine.setMuted(nextMute);
    onUpdateSettings({ ...settings, isMuted: nextMute });
  };

  const handleSliderChange = (key, value) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  const handleResetClick = () => {
    audioEngine.playClickPulse();
    if (confirm("Are you sure you want to reset the Nexus database? This will clear scanned paths, restore default catalog games, and reset playtimes.")) {
      onResetDatabase();
      alert("Database reset completed successfully!");
      onClose();
    }
  };

  const handleSaveApiKey = async () => {
    audioEngine.playClickPulse();
    if (window.electronAPI) {
      await window.electronAPI.saveApiKey(apiKey);
      setApiKeySaved(true);
      setApiKeyStatus('custom');
      setTimeout(() => setApiKeySaved(false), 2000);
    }
  };

  const handleResetApiKey = async () => {
    audioEngine.playClickPulse();
    if (window.electronAPI) {
      const result = await window.electronAPI.getApiKey();
      setApiKey(result.key);
      setApiKeyStatus('builtin');
      await window.electronAPI.saveApiKey('');
    }
  };

  return (
    <div className="settings-overlay flex-center">
      <div className="settings-modal glass-panel-heavy">
        {/* Header */}
        <div className="settings-header">
          <div className="settings-title-group">
            <Layers size={16} className="title-icon" />
            <h2 className="settings-title">Nexus Customization Suite</h2>
          </div>
          <button 
            className="settings-close-btn" 
            onClick={handleClose}
            onMouseEnter={audioEngine.playHoverTick}
          >
            <X size={16} />
          </button>
        </div>

        {/* Settings Body */}
        <div className="settings-body-scrollable">
          
          {/* Section 1: Themes */}
          <div className="settings-section">
            <h3 className="section-label-heading">PS5 Console Telemetry Themes</h3>
            <p className="section-description">Select your launcher theme profiles. Changes primary glowing vectors, canvas dust tones, and telemetry backdrops.</p>
            
            <div className="themes-grid-row">
              <button 
                className={`theme-pill-btn theme-aether-pill ${settings.theme === 'theme-aether' ? 'active' : ''}`}
                onClick={() => handleThemeChange('theme-aether')}
                onMouseEnter={audioEngine.playHoverTick}
              >
                <span className="color-dot blue-dot" />
                <div className="theme-pill-details">
                  <span className="theme-pill-name">Aether Core</span>
                  <span className="theme-pill-desc">Cyan and deep space teal</span>
                </div>
              </button>

              <button 
                className={`theme-pill-btn theme-cyber-pill ${settings.theme === 'theme-cyber' ? 'active' : ''}`}
                onClick={() => handleThemeChange('theme-cyber')}
                onMouseEnter={audioEngine.playHoverTick}
              >
                <span className="color-dot pink-dot" />
                <div className="theme-pill-details">
                  <span className="theme-pill-name">Cyber Glitch</span>
                  <span className="theme-pill-desc">Hot pink and high-contrast violet</span>
                </div>
              </button>

              <button 
                className={`theme-pill-btn theme-emerald-pill ${settings.theme === 'theme-emerald' ? 'active' : ''}`}
                onClick={() => handleThemeChange('theme-emerald')}
                onMouseEnter={audioEngine.playHoverTick}
              >
                <span className="color-dot green-dot" />
                <div className="theme-pill-details">
                  <span className="theme-pill-name">Emerald Matrix</span>
                  <span className="theme-pill-desc">Electric green and dark matrix web</span>
                </div>
              </button>

              <button 
                className={`theme-pill-btn theme-gold-pill ${settings.theme === 'theme-gold' ? 'active' : ''}`}
                onClick={() => handleThemeChange('theme-gold')}
                onMouseEnter={audioEngine.playHoverTick}
              >
                <span className="color-dot gold-dot" />
                <div className="theme-pill-details">
                  <span className="theme-pill-name">Imperial Gold</span>
                  <span className="theme-pill-desc">Obsidian black and Warm liquid gold</span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Sound Settings */}
          <div className="settings-section">
            <h3 className="section-label-heading">Acoustic System Settings</h3>
            <p className="section-description">Toggle synthesized haptics, click ticks, game-specific ambient drones, and orchestral intro swells.</p>
            
            <div className="audio-toggle-card" onClick={handleAudioToggle}>
              <div className="audio-card-left">
                {settings.isMuted ? <VolumeX size={20} className="mute-status-icon muted" /> : <Volume2 size={20} className="mute-status-icon active-volume" />}
                <div className="audio-card-info">
                  <span className="audio-card-title">Console Synthesized Sounds</span>
                  <span className="audio-card-desc">{settings.isMuted ? 'All UI ticks, clicks, and game drone swells are currently muted.' : 'UI interactive acoustic sweeps and ambient chord backdrops are active.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.isMuted ? 'sw-muted' : 'sw-active'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: SteamGridDB API Key */}
          <div className="settings-section">
            <h3 className="section-label-heading flex-center-start">
              <Key size={14} className="heading-icon" />
              <span>SteamGridDB API Configuration</span>
            </h3>
            <p className="section-description">
              {apiKeyStatus === 'builtin' 
                ? 'Using built-in SteamGridDB API key. You can override it with your own key for higher rate limits.'
                : 'Using your custom SteamGridDB API key.'}
            </p>
            
            <div className="api-key-card">
              <div className="api-key-input-row">
                <div className="api-key-status-icon">
                  {apiKeyStatus === 'custom' ? <Lock size={14} /> : <Unlock size={14} />}
                </div>
                <input 
                  type="text" 
                  className="glass-input api-key-input" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your SteamGridDB API key..."
                />
              </div>
              <div className="api-key-actions">
                <span className="api-key-status-text">
                  {apiKeySaved ? 'Saved!' : apiKeyStatus === 'custom' ? 'Custom key active' : 'Built-in key active'}
                </span>
                <div className="api-key-buttons">
                  <button 
                    className="glow-btn api-key-btn"
                    onClick={handleResetApiKey}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    Reset to Default
                  </button>
                  <button 
                    className="glow-btn glow-btn-primary api-key-btn"
                    onClick={handleSaveApiKey}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    Save Key
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Fine Sliders Tuning */}
          <div className="settings-section">
            <h3 className="section-label-heading flex-center-start">
              <Sliders size={14} className="heading-icon" />
              <span>Glassmorphism & Stardust Tuning</span>
            </h3>
            
            <div className="sliders-form-grid">
              <div className="slider-input-group">
                <div className="slider-labels">
                  <span>Glassmorphism Backdrop Blur</span>
                  <span>{settings.glassBlur}px</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="40" 
                  className="settings-slider-bar" 
                  value={settings.glassBlur}
                  onChange={(e) => handleSliderChange('glassBlur', parseInt(e.target.value))}
                />
              </div>

              <div className="slider-input-group">
                <div className="slider-labels">
                  <span>Glass Panel Transparency</span>
                  <span>{Math.round(settings.glassOpacity * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="90" 
                  className="settings-slider-bar" 
                  value={settings.glassOpacity * 100}
                  onChange={(e) => handleSliderChange('glassOpacity', parseFloat(e.target.value) / 100)}
                />
              </div>

              <div className="slider-input-group">
                <div className="slider-labels">
                  <span>Stardust Ambient Particle Density</span>
                  <span>{settings.particleDensity}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.0" 
                  step="0.1" 
                  className="settings-slider-bar" 
                  value={settings.particleDensity}
                  onChange={(e) => handleSliderChange('particleDensity', parseFloat(e.target.value))}
                />
              </div>

              <div className="slider-input-group">
                <div className="slider-labels">
                  <span>Stardust Velocity Float Speed</span>
                  <span>{settings.particleSpeed}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3.0" 
                  step="0.1" 
                  className="settings-slider-bar" 
                  value={settings.particleSpeed}
                  onChange={(e) => handleSliderChange('particleSpeed', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Section 5: System Reset */}
          <div className="settings-section reset-system-sec">
            <h3 className="section-label-heading red-heading">Maintenance & Cache</h3>
            <div className="maintenance-card">
              <div className="m-left">
                <span className="m-title">Re-index database catalog</span>
                <span className="m-desc">Currently managing <strong>{gamesCount} library indices</strong>. Resetting clears custom cover edits and logs.</span>
              </div>
              <button 
                className="glow-btn reset-db-btn"
                onClick={handleResetClick}
                onMouseEnter={audioEngine.playHoverTick}
              >
                <RefreshCw size={12} />
                <span>Reset Database</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="settings-footer flex-center-end">
          <button 
            className="glow-btn glow-btn-primary" 
            onClick={handleClose}
            onMouseEnter={audioEngine.playHoverTick}
          >
            Save & Exit Config
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .settings-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 10000;
          pointer-events: auto;
        }

        .settings-modal {
          width: 800px;
          max-width: 90%;
          max-height: 85vh;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scale-up-editor 0.4s var(--ease-ps5) forwards;
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .settings-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .title-icon {
          color: var(--accent-color);
        }

        .settings-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
        }

        .settings-close-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .settings-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .settings-body-scrollable {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .settings-section {
          display: flex;
          flex-direction: column;
        }

        .section-label-heading {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #fff;
          margin-bottom: 6px;
        }

        .heading-icon {
          color: var(--accent-color);
          margin-right: 8px;
        }

        .flex-center-start {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .section-description {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.4;
          margin-bottom: 16px;
        }

        .themes-grid-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .theme-pill-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }

        .theme-pill-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .theme-pill-btn.active {
          background: rgba(var(--accent-color-rgb), 0.04);
          border-color: var(--accent-color);
          box-shadow: 0 4px 15px rgba(var(--accent-color-rgb), 0.1);
        }

        .color-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 10px currentColor;
        }

        .blue-dot { color: #00e5ff; background: #00e5ff; }
        .pink-dot { color: #ff007f; background: #ff007f; }
        .green-dot { color: #00ff66; background: #00ff66; }
        .gold-dot { color: #e6af2e; background: #e6af2e; }

        .theme-pill-details {
          display: flex;
          flex-direction: column;
        }

        .theme-pill-name {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }

        .theme-pill-desc {
          font-size: 9.5px;
          color: rgba(255, 255, 255, 0.35);
          margin-top: 2px;
        }

        .audio-toggle-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .audio-toggle-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .audio-card-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mute-status-icon {
          flex-shrink: 0;
        }

        .mute-status-icon.active-volume {
          color: var(--accent-color);
        }

        .mute-status-icon.muted {
          color: rgba(255, 255, 255, 0.25);
        }

        .audio-card-info {
          display: flex;
          flex-direction: column;
        }

        .audio-card-title {
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
        }

        .audio-card-desc {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.35);
          margin-top: 2px;
        }

        .checkbox-toggle-switch {
          width: 46px;
          height: 24px;
          border-radius: 15px;
          padding: 3px;
          transition: all 0.3s ease;
        }

        .sw-active {
          background: var(--accent-color);
          box-shadow: var(--accent-glow-subtle);
        }

        .sw-muted {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .switch-knob {
          width: 18px;
          height: 18px;
          background: #000;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.15, 0.85, 0.3, 1);
        }

        .sw-active .switch-knob {
          transform: translateX(22px);
          background: #07070a;
        }

        .sw-muted .switch-knob {
          background: rgba(255, 255, 255, 0.3);
        }

        .api-key-card {
          background: rgba(99, 102, 241, 0.02);
          border: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .api-key-input-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .api-key-status-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
          flex-shrink: 0;
        }

        .api-key-input {
          flex: 1;
          font-family: monospace;
          font-size: 12px;
          padding: 10px 14px;
        }

        .api-key-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .api-key-status-text {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .api-key-buttons {
          display: flex;
          gap: 8px;
        }

        .api-key-btn {
          font-size: 10px;
          padding: 6px 14px;
        }

        .sliders-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .slider-input-group {
          display: flex;
          flex-direction: column;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
        }

        .slider-labels span:last-child {
          color: var(--accent-color);
          font-weight: 700;
        }

        .settings-slider-bar {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          outline: none;
        }

        .settings-slider-bar::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent-color);
          cursor: pointer;
          box-shadow: var(--accent-glow-subtle);
          transition: transform 0.1s ease;
        }

        .settings-slider-bar::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .red-heading {
          color: #ef4444 !important;
        }

        .maintenance-card {
          background: rgba(239, 68, 68, 0.02);
          border: 1px solid rgba(239, 68, 68, 0.1);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .m-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .m-title {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }

        .m-desc {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }

        .reset-db-btn {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.03);
          color: #ef4444;
          font-size: 11px;
          padding: 8px 16px;
        }

        .reset-db-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
        }

        .settings-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 20px 24px;
        }

        .flex-center-end {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      `}} />
    </div>
  );
}
