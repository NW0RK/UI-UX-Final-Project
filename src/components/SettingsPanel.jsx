import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, RefreshCw, Layers, Lock, Unlock, Activity, Image, Trash2, BadgeCheck, Clapperboard, Music } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function SettingsPanel({ 
  settings, 
  onUpdateSettings, 
  onClose,
  onResetDatabase,
  onClearArtworkCache,
  gamesCount
}) {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyStatus, setApiKeyStatus] = useState('loading'); // loading | custom | builtin
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [igdbClientId, setIgdbClientId] = useState('331ozbtylxc949s6y4o2amakole28q');
  const [igdbClientSecret, setIgdbClientSecret] = useState('');
  const [igdbStatus, setIgdbStatus] = useState('loading');
  const [igdbSaved, setIgdbSaved] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getApiKey().then(result => {
        setApiKey(result.key);
        setApiKeyStatus(result.isCustom ? 'custom' : 'builtin');
      }).catch(() => setApiKeyStatus('builtin'));
    }
  }, []);

  useEffect(() => {
    if (window.electronAPI?.getIgdbCredentials) {
      window.electronAPI.getIgdbCredentials().then(result => {
        setIgdbClientId(result.clientId || '331ozbtylxc949s6y4o2amakole28q');
        setIgdbClientSecret(result.hasClientSecret ? '********' : '');
        setIgdbStatus(result.hasClientSecret ? result.source || 'custom' : 'missing-secret');
      }).catch(() => setIgdbStatus('missing-secret'));
    } else {
      setIgdbStatus('preview');
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
    audioEngine.setMuted(nextMute);
    if (!nextMute) {
      audioEngine.playClickPulse();
    }
    onUpdateSettings({ ...settings, isMuted: nextMute });
  };

  const handleMenuMusicToggle = () => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, menuMusicEnabled: !settings.menuMusicEnabled });
  };

  const handleSystemStatusToggle = () => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, trackSystemStatus: !settings.trackSystemStatus });
  };

  const handleBannerAnimationToggle = () => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, bannerAnimation: !settings.bannerAnimation });
  };

  const handleAnimatedHeroesModeChange = (mode) => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, libraryAnimatedHeroesMode: mode });
  };

  const handleLibraryTrailerToggle = () => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, libraryTrailerAutoplay: !settings.libraryTrailerAutoplay });
  };

  const handleLibraryTrailerMutedDefaultToggle = () => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, libraryTrailerMutedByDefault: !settings.libraryTrailerMutedByDefault });
  };

  const handleStudioLogosToggle = () => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, studioLogosEnabled: !settings.studioLogosEnabled });
  };

  const handleProtonDbToggle = () => {
    audioEngine.playClickPulse();
    onUpdateSettings({ ...settings, protonDbEnabled: !settings.protonDbEnabled });
  };

  const handleBrandfetchClientIdChange = (value) => {
    onUpdateSettings({ ...settings, brandfetchClientId: value });
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

  const handleClearCacheClick = () => {
    audioEngine.playClickPulse();
    if (confirm("Are you sure you want to completely clear the cache of downloaded pictures (grids, hero banners, logos, icons, and Brandfetch studio logos)? The launcher will automatically re-fetch clean pictures.")) {
      onClearArtworkCache();
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

  const handleSaveIgdbCredentials = async () => {
    audioEngine.playClickPulse();
    if (window.electronAPI?.saveIgdbCredentials) {
      const payload = { clientId: igdbClientId };
      if (igdbClientSecret !== '********') {
        payload.clientSecret = igdbClientSecret;
      }
      await window.electronAPI.saveIgdbCredentials(payload);
      const result = await window.electronAPI.getIgdbCredentials();
      setIgdbClientId(result.clientId || '331ozbtylxc949s6y4o2amakole28q');
      setIgdbClientSecret(result.hasClientSecret ? '********' : '');
      setIgdbStatus(result.hasClientSecret ? result.source || 'custom' : 'missing-secret');
      setIgdbSaved(true);
      setTimeout(() => setIgdbSaved(false), 2000);
    }
  };

  const handleResetIgdbCredentials = async () => {
    audioEngine.playClickPulse();
    if (window.electronAPI?.saveIgdbCredentials) {
      await window.electronAPI.saveIgdbCredentials({ clientId: '', clientSecret: '' });
      const result = await window.electronAPI.getIgdbCredentials();
      setIgdbClientId(result.clientId || '331ozbtylxc949s6y4o2amakole28q');
      setIgdbClientSecret(result.hasClientSecret ? '********' : '');
      setIgdbStatus(result.hasClientSecret ? result.source || 'custom' : 'missing-secret');
    }
  };

  return (
    <div className="settings-overlay flex-center">
      <div className="settings-modal glass-panel-heavy">
        {/* Header */}
        <div className="settings-header">
          <div className="settings-title-group">
            <Layers size={16} className="title-icon" />
            <h2 className="settings-title">Settings</h2>
          </div>
          <button 
            className="settings-close-btn" 
            onClick={handleClose}
            onMouseEnter={audioEngine.playHoverTick}
            data-controller-back="true"
          >
            <X size={16} />
          </button>
        </div>

        {/* Settings Body */}
        <div className="settings-body-scrollable">
          
          {/* Appearance */}
          <div className="settings-section">
            <h3 className="section-label-heading">Appearance</h3>
            <p className="section-description">Choose the launcher theme and adjust the main visual effects.</p>
            
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

            <div className="sliders-form-grid settings-subgroup">
              <div className="slider-input-group">
                <div className="slider-labels">
                  <span>Panel Blur</span>
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
                  <span>Panel Opacity</span>
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
                  <span>Particle Density</span>
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
                  <span>Particle Speed</span>
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

              <div className="slider-input-group">
                <div className="slider-labels">
                  <span>Font Size</span>
                  <span>{Math.round((settings.fontScale || 1.0) * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="150" 
                  step="5" 
                  className="settings-slider-bar" 
                  value={Math.round((settings.fontScale || 1.0) * 100)}
                  onChange={(e) => handleSliderChange('fontScale', parseFloat(e.target.value) / 100)}
                />
              </div>
            </div>
          </div>

          {/* Audio */}
          <div className="settings-section">
            <h3 className="section-label-heading">Audio</h3>
            <p className="section-description">Turn launcher sound effects, menu music, and ambient audio on or off.</p>
            
            <div
              className="audio-toggle-card"
              role="switch"
              tabIndex={0}
              aria-checked={!settings.isMuted}
              onClick={handleAudioToggle}
              onFocus={audioEngine.playHoverTick}
            >
              <div className="audio-card-left">
                {settings.isMuted ? <VolumeX size={20} className="mute-status-icon muted" /> : <Volume2 size={20} className="mute-status-icon active-volume" />}
                <div className="audio-card-info">
                  <span className="audio-card-title">Launcher Sounds</span>
                  <span className="audio-card-desc">{settings.isMuted ? 'Clicks, UI sounds, and ambient audio are muted.' : 'Clicks, UI sounds, and ambient audio are on.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.isMuted ? 'sw-muted' : 'sw-active'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>

            <div className="slider-input-group settings-subgroup">
              <div className="slider-labels">
                <span>Overall Volume</span>
                <span>{Math.round((settings.launcherVolume ?? 1.0) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="settings-slider-bar"
                value={Math.round((settings.launcherVolume ?? 1.0) * 100)}
                onChange={(e) => handleSliderChange('launcherVolume', parseFloat(e.target.value) / 100)}
              />
            </div>

            <div
              className="audio-toggle-card settings-subgroup"
              role="switch"
              tabIndex={0}
              aria-checked={settings.menuMusicEnabled && !settings.isMuted}
              onClick={handleMenuMusicToggle}
              onFocus={audioEngine.playHoverTick}
            >
              <div className="audio-card-left">
                <Music size={20} className={settings.menuMusicEnabled && !settings.isMuted ? 'mute-status-icon active-volume' : 'mute-status-icon muted'} />
                <div className="audio-card-info">
                  <span className="audio-card-title">Menu Music</span>
                  <span className="audio-card-desc">{settings.menuMusicEnabled ? 'The menu soundtrack loops in the background.' : 'The menu soundtrack is off.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.menuMusicEnabled && !settings.isMuted ? 'sw-active' : 'sw-muted'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>
          </div>

          {/* Artwork */}
          <div className="settings-section">
            <h3 className="section-label-heading flex-center-start">
              <Image size={14} className="heading-icon" />
              <span>Artwork</span>
            </h3>
            <p className="section-description">Manage banner motion, studio logos, and artwork API keys.</p>
            
            <div
              className="audio-toggle-card"
              role="switch"
              tabIndex={0}
              aria-checked={settings.bannerAnimation}
              onClick={handleBannerAnimationToggle}
              onFocus={audioEngine.playHoverTick}
            >
              <div className="audio-card-left">
                <Image size={20} className={settings.bannerAnimation ? 'mute-status-icon active-volume' : 'mute-status-icon muted'} />
                <div className="audio-card-info">
                  <span className="audio-card-title">Banner Motion</span>
                  <span className="audio-card-desc">{settings.bannerAnimation ? 'Hero banners slowly zoom and pan.' : 'Hero banners stay still.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.bannerAnimation ? 'sw-active' : 'sw-muted'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>

            <div className="animated-heroes-card settings-subgroup">
              <div className="audio-card-left">
                <Image size={20} className={(settings.libraryAnimatedHeroesMode || 'off') === 'off' ? 'mute-status-icon muted' : 'mute-status-icon active-volume'} />
                <div className="audio-card-info">
                  <span className="audio-card-title">Animated Library Banners</span>
                  <span className="audio-card-desc">
                    {(settings.libraryAnimatedHeroesMode || 'off') === 'off'
                      ? 'Static library hero banners only.'
                      : (settings.libraryAnimatedHeroesMode || 'off') === 'individual'
                        ? 'Only games enabled in metadata use animated heroes.'
                        : 'Use animated heroes for every game when available.'}
                  </span>
                </div>
              </div>
              <div className="animated-heroes-segment" role="group" aria-label="Animated library banner mode">
                {[
                  ['off', 'Off'],
                  ['individual', 'Individual'],
                  ['on', 'On']
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    className={(settings.libraryAnimatedHeroesMode || 'off') === mode ? 'active' : ''}
                    onClick={() => handleAnimatedHeroesModeChange(mode)}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="audio-toggle-card settings-subgroup"
              role="switch"
              tabIndex={0}
              aria-checked={settings.libraryTrailerAutoplay}
              onClick={handleLibraryTrailerToggle}
              onFocus={audioEngine.playHoverTick}
            >
              <div className="audio-card-left">
                <Clapperboard size={20} className={settings.libraryTrailerAutoplay ? 'mute-status-icon active-volume' : 'mute-status-icon muted'} />
                <div className="audio-card-info">
                  <span className="audio-card-title">Trailer Preview</span>
                  <span className="audio-card-desc">{settings.libraryTrailerAutoplay ? 'Library heroes transition to IGDB trailers after a short pause.' : 'Library heroes stay on artwork only.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.libraryTrailerAutoplay ? 'sw-active' : 'sw-muted'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>

            <div
              className="audio-toggle-card settings-subgroup"
              role="switch"
              tabIndex={0}
              aria-checked={!settings.libraryTrailerMutedByDefault}
              onClick={handleLibraryTrailerMutedDefaultToggle}
              onFocus={audioEngine.playHoverTick}
            >
              <div className="audio-card-left">
                {settings.libraryTrailerMutedByDefault
                  ? <VolumeX size={20} className="mute-status-icon muted" />
                  : <Volume2 size={20} className="mute-status-icon active-volume" />}
                <div className="audio-card-info">
                  <span className="audio-card-title">Trailer Audio</span>
                  <span className="audio-card-desc">{settings.libraryTrailerMutedByDefault ? 'Trailer previews start muted.' : 'Trailer previews start with audio on.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.libraryTrailerMutedByDefault ? 'sw-muted' : 'sw-active'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>

            <div
              className="audio-toggle-card settings-subgroup"
              role="switch"
              tabIndex={0}
              aria-checked={settings.studioLogosEnabled}
              onClick={handleStudioLogosToggle}
              onFocus={audioEngine.playHoverTick}
            >
              <div className="audio-card-left">
                <BadgeCheck size={20} className={settings.studioLogosEnabled ? 'mute-status-icon active-volume' : 'mute-status-icon muted'} />
                <div className="audio-card-info">
                  <span className="audio-card-title">Logo Lookup</span>
                  <span className="audio-card-desc">{settings.studioLogosEnabled ? 'Use Brandfetch logos when possible.' : 'Show studio names as text.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.studioLogosEnabled ? 'sw-active' : 'sw-muted'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>

            <div
              className="audio-toggle-card settings-subgroup"
              role="switch"
              tabIndex={0}
              aria-checked={settings.protonDbEnabled}
              onClick={handleProtonDbToggle}
              onFocus={audioEngine.playHoverTick}
            >
              <div className="audio-card-left">
                <Activity size={20} className={settings.protonDbEnabled ? 'mute-status-icon active-volume' : 'mute-status-icon muted'} />
                <div className="audio-card-info">
                  <span className="audio-card-title">Linux Compatibility</span>
                  <span className="audio-card-desc">{settings.protonDbEnabled ? 'Show ProtonDB compatibility for Steam-matched games.' : 'Hide ProtonDB compatibility and skip Linux compatibility lookups.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.protonDbEnabled ? 'sw-active' : 'sw-muted'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>

            <div className="api-key-card brandfetch-key-card">
              <div className="api-key-input-row">
                <div className="api-key-status-icon brandfetch-status-icon">
                  <BadgeCheck size={14} />
                </div>
                <input 
                  type="text" 
                  className="glass-input api-key-input" 
                  value={settings.brandfetchClientId || ''}
                  onChange={(e) => handleBrandfetchClientIdChange(e.target.value)}
                  placeholder="Brandfetch Client ID..."
                />
              </div>
              <span className="api-key-status-text">
                Brandfetch client ID
              </span>
            </div>

            <div className="api-key-card settings-subgroup">
              <div className="api-key-input-row">
                <div className="api-key-status-icon">
                  {apiKeyStatus === 'custom' ? <Lock size={14} /> : <Unlock size={14} />}
                </div>
                <input 
                  type="text" 
                  className="glass-input api-key-input" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="SteamGridDB API key..."
                />
              </div>
              <div className="api-key-actions">
                <span className="api-key-status-text">
                  {apiKeySaved ? 'Saved!' : apiKeyStatus === 'custom' ? 'Custom SteamGridDB key' : 'Built-in SteamGridDB key'}
                </span>
                <div className="api-key-buttons">
                  <button 
                    className="glow-btn api-key-btn"
                    onClick={handleResetApiKey}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    Reset
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

            <div className="api-key-card settings-subgroup">
              <div className="api-key-input-row">
                <div className="api-key-status-icon">
                  {igdbStatus === 'missing-secret' ? <Unlock size={14} /> : <Lock size={14} />}
                </div>
                <input
                  type="text"
                  className="glass-input api-key-input"
                  value={igdbClientId}
                  onChange={(e) => setIgdbClientId(e.target.value)}
                  placeholder="IGDB Client ID..."
                />
              </div>
              <div className="api-key-input-row api-key-secret-row">
                <div className="api-key-status-icon">
                  <Lock size={14} />
                </div>
                <input
                  type="password"
                  className="glass-input api-key-input"
                  value={igdbClientSecret}
                  onFocus={() => {
                    if (igdbClientSecret === '********') setIgdbClientSecret('');
                  }}
                  onChange={(e) => setIgdbClientSecret(e.target.value)}
                  placeholder="IGDB / Twitch Client Secret..."
                />
              </div>
              <div className="api-key-actions">
                <span className="api-key-status-text">
                  {igdbSaved ? 'Saved!' : igdbStatus === 'missing-secret' ? 'IGDB secret required for discovery' : 'IGDB discovery credentials'}
                </span>
                <div className="api-key-buttons">
                  <button
                    className="glow-btn api-key-btn"
                    onClick={handleResetIgdbCredentials}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    Reset
                  </button>
                  <button
                    className="glow-btn glow-btn-primary api-key-btn"
                    onClick={handleSaveIgdbCredentials}
                    onMouseEnter={audioEngine.playHoverTick}
                  >
                    Save IGDB
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* System */}
          <div className="settings-section">
            <h3 className="section-label-heading flex-center-start">
              <Activity size={14} className="heading-icon" />
              <span>System</span>
            </h3>
            <p className="section-description">Control CPU and RAM status readouts.</p>
            
            <div
              className="audio-toggle-card"
              role="switch"
              tabIndex={0}
              aria-checked={settings.trackSystemStatus}
              onClick={handleSystemStatusToggle}
              onFocus={audioEngine.playHoverTick}
            >
              <div className="audio-card-left">
                <Activity size={20} className={settings.trackSystemStatus ? 'mute-status-icon active-volume' : 'mute-status-icon muted'} />
                <div className="audio-card-info">
                  <span className="audio-card-title">System Status</span>
                  <span className="audio-card-desc">{settings.trackSystemStatus ? 'CPU and RAM indicators are on.' : 'CPU and RAM indicators are off.'}</span>
                </div>
              </div>
              <div className="audio-card-right">
                <div className={`checkbox-toggle-switch ${settings.trackSystemStatus ? 'sw-active' : 'sw-muted'}`}>
                  <div className="switch-knob" />
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="settings-section reset-system-sec">
            <h3 className="section-label-heading red-heading">Maintenance</h3>
            <div className="maintenance-card">
              <div className="m-left">
                <span className="m-title">Reset Database</span>
                <span className="m-desc">Currently managing <strong>{gamesCount} games</strong>. Clears scanned paths, default catalog changes, and playtimes.</span>
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

            <div className="maintenance-card" style={{ marginTop: '14px' }}>
              <div className="m-left">
                <span className="m-title">Clear Artwork Cache</span>
                <span className="m-desc">Deletes downloaded grids, banners, logos, icons, and studio logos. The launcher will fetch them again.</span>
              </div>
              <button 
                className="glow-btn clear-cache-btn"
                onClick={handleClearCacheClick}
                onMouseEnter={audioEngine.playHoverTick}
              >
                <Trash2 size={12} />
                <span>Clear Cache</span>
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
            Done
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
          animation: scale-up-editor 0.4s var(--ease-interface) forwards;
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
          font-size: var(--fs-15);
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

        .settings-subgroup {
          margin-top: 12px;
        }

        .section-label-heading {
          font-family: var(--font-display);
          font-size: var(--fs-12);
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
          font-size: var(--fs-11);
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
          font-size: var(--fs-12);
          font-weight: 700;
          color: #fff;
        }

        .theme-pill-desc {
          font-size: var(--fs-9-5);
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

        .animated-heroes-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
        }

        .animated-heroes-segment {
          display: grid;
          grid-template-columns: repeat(3, minmax(78px, 1fr));
          gap: 4px;
          padding: 4px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.055);
          flex-shrink: 0;
        }

        .animated-heroes-segment button {
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: rgba(255, 255, 255, 0.55);
          font-family: var(--font-sans);
          font-size: var(--fs-11);
          font-weight: 700;
          padding: 8px 10px;
          cursor: pointer;
          transition: background var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .animated-heroes-segment button:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .animated-heroes-segment button.active {
          color: #fff;
          background: rgba(var(--accent-color-rgb), 0.24);
          box-shadow: inset 0 0 0 1px rgba(var(--accent-color-rgb), 0.34);
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
          font-size: var(--fs-12-5);
          font-weight: 700;
          color: #fff;
        }

        .audio-card-desc {
          font-size: var(--fs-10);
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

        .brandfetch-key-card {
          margin-top: 12px;
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

        .brandfetch-status-icon {
          background: rgba(var(--accent-color-rgb), 0.1);
          color: var(--accent-color);
        }

        .api-key-input {
          flex: 1;
          font-family: monospace;
          font-size: var(--fs-12);
          padding: 10px 14px;
        }

        .api-key-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .api-key-status-text {
          font-size: var(--fs-10);
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
          font-size: var(--fs-10);
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
          font-size: var(--fs-11);
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
          font-size: var(--fs-12);
          font-weight: 700;
          color: #fff;
        }

        .m-desc {
          font-size: var(--fs-10);
          color: rgba(255, 255, 255, 0.4);
        }

        .reset-db-btn {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.03);
          color: #ef4444;
          font-size: var(--fs-11);
          padding: 8px 16px;
        }

        .reset-db-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
        }

        .clear-cache-btn {
          border-color: rgba(245, 158, 11, 0.3);
          background: rgba(245, 158, 11, 0.03);
          color: #f59e0b;
          font-size: var(--fs-11);
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .clear-cache-btn:hover {
          background: #f59e0b;
          color: #fff;
          border-color: #f59e0b;
          box-shadow: 0 0 15px rgba(245, 158, 11, 0.4);
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
