import React, { useState } from 'react';
import { Play, Pin, Edit, Star, Trash2, Flame, Clock, Award, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './GameMainBanner.css';

export default function GameMainBanner({ 
  game, 
  onLaunch, 
  onToggleFavorite, 
  onEditMetadata, 
  onPinSidebar,
  onRemoveGame,
  isRunning,
  isSidebarPinned,
  bannerAnimation = true
}) {
  const [descExpanded, setDescExpanded] = useState(false);

  if (!game) return null;

  const handleLaunchClick = () => {
    audioEngine.playClickPulse();
    onLaunch(game);
  };

  const handleFavoriteClick = () => {
    audioEngine.playClickPulse();
    onToggleFavorite(game.id);
  };

  const handleEditClick = () => {
    audioEngine.playClickPulse();
    onEditMetadata(game);
  };

  const handlePinClick = () => {
    audioEngine.playClickPulse();
    onPinSidebar();
  };

  const handleRemoveClick = () => {
    audioEngine.playClickPulse();
    onRemoveGame(game.id);
  };

  const parallaxClass = bannerAnimation ? ' backdrop-parallax' : '';

  // Playtime formatting (convert seconds to hours and minutes)
  const formatPlaytime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs === 0) return `${mins} mins`;
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="game-main-banner-container">
      {/* Background Dissolve Backdrop Canvas */}
      <div className="backdrop-image-mask">
          {game.bannerUrl ? (
            <img 
              src={game.bannerUrl} 
              alt={game.title} 
              className={`banner-backdrop-img${parallaxClass}`} 
              key={game.id}
            />
          ) : (
            <div className={`banner-backdrop-img banner-art-placeholder${parallaxClass}`} key={game.id}>
              <span>SteamGridDB artwork pending</span>
            </div>
          )}
        <div className="backdrop-overlay-vignette" />
      </div>

      {/* Floating Info Overlay Sheet */}
      <div className="banner-content-box">
        {/* Genre Tags */}
        <div className="genre-badges-row">
          {game.tags?.map((tag, idx) => (
            <span key={idx} className="genre-badge">{tag}</span>
          ))}
        </div>

        {/* Logo (if available, otherwise fallback to text title) — fixed 80px container */}
        <div className="banner-title-container">
          {game.logoUrl ? (
            <img src={game.logoUrl} alt={game.title} className="banner-logo-img" />
          ) : (
            <h1 className="banner-game-title">{game.title}</h1>
          )}
        </div>
        
        {/* Developer & Developer Meta */}
        <div className="developer-meta">
          <span>{game.developer}</span>
          <span className="dot-divider" />
          <span>Rating: <strong>{game.rating}★</strong></span>
        </div>

        {/* Short Description */}
        <p
          className={`game-banner-description${descExpanded ? ' expanded' : ''}`}
          onClick={() => setDescExpanded(!descExpanded)}
        >
          {game.description}
        </p>

        {/* Telemetry Stats Card */}
        <div className="telemetry-stats-glass-row">
          <div className="stat-glass-card">
            <Clock size={16} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-label">Playtime</span>
              <span className="stat-value">{formatPlaytime(game.playtime)}</span>
            </div>
          </div>

          <div className="stat-glass-card">
            <Flame size={16} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-label">Last Session</span>
              <span className="stat-value">{game.lastPlayed}</span>
            </div>
          </div>

          {game.progress > 0 && (
            <div className="stat-glass-card">
              <Award size={16} className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Progress</span>
                <span className="stat-value">{game.progress}% ({game.timeToComplete} left)</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Row */}
        <div className="banner-actions-row">
          {/* Main Launch Trigger */}
          <button 
            className={`glow-btn glow-btn-primary play-game-btn ${isRunning ? 'running-pulse' : ''}`}
            onClick={handleLaunchClick}
            onMouseEnter={audioEngine.playHoverTick}
          >
            <Play fill={isRunning ? 'transparent' : 'currentColor'} size={18} />
            <span>{isRunning ? 'Running...' : 'Play Game'}</span>
          </button>

          {/* Pin Sidebar for Multitasking */}
          <button 
            className={`glow-btn action-pill-btn ${isSidebarPinned ? 'pinned-active' : ''}`}
            onClick={handlePinClick}
            onMouseEnter={audioEngine.playHoverTick}
            title="Pin Achievements to Side"
          >
            <Pin size={16} />
            <span>{isSidebarPinned ? 'Pinned' : 'Pin to Side'}</span>
          </button>

          {/* Edit Metadata */}
          <button 
            className="glow-btn action-pill-btn"
            onClick={handleEditClick}
            onMouseEnter={audioEngine.playHoverTick}
            title="Edit Game Metadata"
          >
            <Edit size={16} />
            <span>Metadata</span>
          </button>

          {/* Toggle Favorite Star */}
          <button 
            className={`glow-btn action-pill-btn fav-pill-btn ${game.isFavorite ? 'active-favorite' : ''}`}
            onClick={handleFavoriteClick}
            onMouseEnter={audioEngine.playHoverTick}
            title="Add to Favorites"
          >
            <Star size={16} fill={game.isFavorite ? 'currentColor' : 'transparent'} />
          </button>

          {/* Remove from Library */}
          <button 
            className="glow-btn action-pill-btn remove-pill-btn"
            onClick={handleRemoveClick}
            onMouseEnter={audioEngine.playHoverTick}
            title="Remove from Library"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>


    </div>
  );
}
