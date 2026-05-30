import React from 'react';
import { Play, Pin, Edit, Star, Trash2, Flame, Clock, Award, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

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
        <p className="game-banner-description">{game.description}</p>

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

      <style dangerouslySetInnerHTML={{__html: `
        .game-main-banner-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% - 480px);
          display: flex;
          align-items: flex-end;
          padding: 0 60px 48px;
          pointer-events: none;
        }

        .backdrop-image-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% + 180px);
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        .banner-backdrop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.05);
          filter: brightness(0.6) contrast(1.05);
          transition: opacity 1.2s ease-in-out;
          animation: fade-in-backdrop 1.2s forwards ease-in-out;
        }

        .banner-art-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 35%, rgba(var(--accent-color-rgb), 0.22), rgba(7, 7, 10, 0.95) 62%);
          color: rgba(255, 255, 255, 0.42);
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @keyframes fade-in-backdrop {
          0% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 0.65; transform: scale(1.0); }
        }

        .backdrop-image-mask::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 320px;
          background: linear-gradient(
            to bottom,
            rgba(7, 7, 10, 0) 0%,
            rgba(7, 7, 10, 0.22) 38%,
            rgba(7, 7, 10, 0.68) 72%,
            #07070a 100%
          );
          z-index: 3;
          pointer-events: none;
        }

        .backdrop-overlay-vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 50% 38%, transparent 12%, rgba(7, 7, 10, 0.18) 48%, rgba(7, 7, 10, 0.82) 100%),
                      linear-gradient(90deg, #07070a 0%, rgba(7, 7, 10, 0.16) 15%, rgba(7, 7, 10, 0.05) 50%, rgba(7, 7, 10, 0.38) 84%, #07070a 100%),
                      linear-gradient(0deg, rgba(7, 7, 10, 0.64) 0%, rgba(7, 7, 10, 0.16) 50%, rgba(7, 7, 10, 0.4) 100%);
          z-index: 2;
        }

        .banner-content-box {
          position: relative;
          z-index: 10;
          max-width: 650px;
          max-height: calc(100% - 24px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          pointer-events: auto;
          overflow: hidden;
        }

        .genre-badges-row {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .genre-badge {
          background: rgba(var(--accent-color-rgb), 0.12);
          border: 1px solid rgba(var(--accent-color-rgb), 0.25);
          color: var(--accent-color);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .banner-title-container {
          width: 100%;
          height: 80px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .banner-logo-img {
          height: 80px;
          width: auto;
          filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.8));
          flex-shrink: 0;
        }

        .banner-game-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 44px;
          letter-spacing: 2px;
          line-height: 1.1;
          color: #fff;
          text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.5);
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          min-width: 0;
        }

        .developer-meta {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }

        .dot-divider {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          margin: 0 10px;
        }

        .game-banner-description {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 25px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
          max-height: 92px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .telemetry-stats-glass-row {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          width: 100%;
          flex-shrink: 0;
        }

        .stat-glass-card {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .stat-icon {
          color: var(--accent-color);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          margin-top: 2px;
        }

        .banner-actions-row {
          display: flex;
          gap: 12px;
          width: 100%;
          flex-shrink: 0;
        }

        .play-game-btn {
          padding: 12px 30px;
          font-size: 14px;
        }

        .play-game-btn.running-pulse {
          background: #ef4444 !important;
          border-color: #ef4444 !important;
          color: #fff !important;
          animation: running-pulse-glow 1.5s infinite ease-in-out;
        }

        .action-pill-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          width: auto;
          min-width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
        }

        .action-pill-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .pinned-active {
          color: var(--accent-color) !important;
          border-color: rgba(var(--accent-color-rgb), 0.3) !important;
          background: rgba(var(--accent-color-rgb), 0.08) !important;
          box-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.2);
        }

        .fav-pill-btn.active-favorite {
          color: #e6af2e !important;
          border-color: rgba(230, 175, 46, 0.3) !important;
          background: rgba(230, 175, 46, 0.08) !important;
          box-shadow: 0 0 10px rgba(230, 175, 46, 0.2);
        }

        .remove-pill-btn {
          color: rgba(255, 255, 255, 0.35) !important;
        }

        .remove-pill-btn:hover {
          color: #ef4444 !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
          background: rgba(239, 68, 68, 0.08) !important;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
        }
      `}} />
    </div>
  );
}
