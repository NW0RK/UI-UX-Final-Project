import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Sparkles, Sliders, RefreshCw, Layers, Key, Lock, Unlock, Activity, Image } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './SettingsPanel.css';

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

  const handleSystemStatusToggle = () => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, trackSystemStatus: !settings.trackSystemStatus });
  };

  const handleBannerAnimationToggle = () => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, bannerAnimation: !settings.bannerAnimation });
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
      await window.electronAPI.saveApiKey('');
      const result = await window.electronAPI.getApiKey();
      setApiKey(result.key);
      setApiKeyStatus(result.isCustom ? 'custom' : 'builtin');
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

          {/* Section 3: System Status Tracking */}
          <div className="settings-section">
            <h3 className="section-label-heading flex-center-start">
              <Activity size={14} className="heading-icon" />
              <span>System Status Tracking</span>
            </h3>
            <p className="section-description">Disable this to stop CPU/RAM status polling and hide System Status readouts across the launcher.</p>
            
            <div className="audio-toggle-card" onClick={handleSystemStatusToggle}>
              <div className="audio-card-left">
                <Activity size={20} className={settings.trackSystemStatus ? 'mute-status-icon active-volume' : 'mute-status-icon muted'} />
                <div className="audio-card-info">
                  <span className="audio-card-title">System Status Telemetry</span>
                  <span className="audio-card-desc">{settings.trackSystemStatus ? 'CPU and RAM status indicators are currently active.' : 'CPU and RAM status tracking is fully disabled.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.trackSystemStatus ? 'sw-active' : 'sw-muted'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Banner Animation */}
          <div className="settings-section">
            <h3 className="section-label-heading flex-center-start">
              <Image size={14} className="heading-icon" />
              <span>Banner Cinematic Zoom</span>
            </h3>
            <p className="section-description">Disable this to stop the hero banner background from slowly zooming and panning.</p>
            
            <div className="audio-toggle-card" onClick={handleBannerAnimationToggle}>
              <div className="audio-card-left">
                <Image size={20} className={settings.bannerAnimation ? 'mute-status-icon active-volume' : 'mute-status-icon muted'} />
                <div className="audio-card-info">
                  <span className="audio-card-title">Banner Cinematic Pan Animation</span>
                  <span className="audio-card-desc">{settings.bannerAnimation ? 'Hero banner background slowly zooms and pans for a cinematic effect.' : 'Hero banner background is static with no zoom animation.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.bannerAnimation ? 'sw-active' : 'sw-muted'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: SteamGridDB API Key */}
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

          {/* Section 6: Fine Sliders Tuning */}
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

          {/* Section 7: System Reset */}
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


    </div>
  );
}
