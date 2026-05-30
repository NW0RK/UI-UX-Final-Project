import React, { useRef, useState } from 'react';
import { Play, Flame, Star, Award } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function HorizontalLibrary({ 
  games, 
  selectedGame, 
  onSelectGame, 
  onLaunchGame, 
  runningGameId 
}) {
  const shelfRef = useRef(null);

  const handleCardClick = (game) => {
    audioEngine.playClickPulse();
    onSelectGame(game);
  };

  return (
    <div className="horizontal-library-shelf" ref={shelfRef}>
      <div className="shelf-title-row">
        <h2 className="shelf-title">My Library</h2>
        <span className="library-count">{games.length} games available</span>
      </div>

      <div className="library-grid-horizontal">
        {games.map((game) => {
          const isSelected = selectedGame?.id === game.id;
          const isRunning = runningGameId === game.id;
          
          return (
            <GameCard 
              key={game.id} 
              game={game} 
              isSelected={isSelected}
              isRunning={isRunning}
              onClick={() => handleCardClick(game)}
              onLaunch={() => onLaunchGame(game)}
            />
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .horizontal-library-shelf {
          margin-top: auto;
          padding-bottom: 20px;
          z-index: 10;
          position: relative;
        }

        .shelf-title-row {
          display: flex;
          align-items: baseline;
          gap: 15px;
          margin-bottom: 20px;
          padding-left: 10px;
        }

        .shelf-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .library-count {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.5px;
        }

        .library-grid-horizontal {
          display: flex;
          gap: 26px;
          overflow-x: auto;
          padding: 15px 10px 30px 10px;
          scroll-behavior: smooth;
        }

        /* Hide Scrollbar but allow scrolling */
        .library-grid-horizontal::-webkit-scrollbar {
          height: 4px;
        }
        .library-grid-horizontal::-webkit-scrollbar-track {
          background: transparent;
        }
        .library-grid-horizontal::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .library-grid-horizontal:hover::-webkit-scrollbar-thumb {
          background: rgba(var(--accent-color-rgb), 0.25);
        }
      `}} />
    </div>
  );
}

// 3D Perspective-Tilting GameCard Component
function GameCard({ game, isSelected, isRunning, onClick, onLaunch }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate inside element
    const y = e.clientY - rect.top;  // y coordinate inside element
    
    const width = rect.width;
    const height = rect.height;
    
    const maxTilt = 15; // Max tilt rotation in degrees
    
    // Calculate rotation coordinates (range -1 to 1)
    const tiltX = ((y - height / 2) / (height / 2)) * maxTilt;
    const tiltY = -((x - width / 2) / (width / 2)) * maxTilt;

    setTilt({
      x: tiltX,
      y: tiltY,
      scale: 1.06
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, scale: 1 });
  };

  const handleLaunchClick = (e) => {
    e.stopPropagation(); // Avoid selecting card
    onLaunch();
  };

  // Convert playtime seconds to neat hours
  const playtimeHours = Math.round((game.playtime / 3600) * 10) / 10;

  return (
    <div 
      ref={cardRef}
      className={`game-card-wrapper ${isSelected ? 'selected' : ''} ${isRunning ? 'running' : ''}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={audioEngine.playHoverTick}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scale})`,
        transition: tilt.scale === 1 ? 'transform 0.5s ease' : 'transform 0.08s ease'
      }}
    >
      {/* 3D Depth Card Body */}
      <div className="card-face">
        {/* Cover Artwork */}
        <div className="card-image-container">
          {game.coverUrl ? (
            <img src={game.coverUrl} alt={game.title} className="card-image" loading="lazy" />
          ) : (
            <div className="card-image card-image-placeholder">
              <span>{game.title}</span>
            </div>
          )}
          
          {/* Running State Pulse Overlay */}
          {isRunning && (
            <div className="running-overlay-indicator">
              <span className="running-dot-pulse" />
              <span className="running-text">Running</span>
            </div>
          )}

          {/* Quick Action Play Overlay */}
          <div className="card-hover-actions">
            <button 
              className={`quick-play-button ${isRunning ? 'running-btn' : ''}`}
              onClick={handleLaunchClick}
              title={isRunning ? "Game Running" : "Launch Game"}
            >
              <Play fill={isRunning ? "transparent" : "currentColor"} size={16} />
            </button>
          </div>

          {/* Favorite Indicator */}
          {game.isFavorite && (
            <div className="favorite-indicator-badge">
              <Star size={10} fill="currentColor" />
            </div>
          )}
        </div>

        {/* Card Footer Metrics (Telemetry) */}
        <div className="card-details-panel">
          <div className="card-title">{game.title}</div>
          <div className="card-meta-metrics">
            <div className="metric-item" title="Total Playtime">
              <Flame size={12} className="metric-icon" />
              <span>{playtimeHours}h</span>
            </div>
            {game.progress > 0 && (
              <div className="metric-item" title="Completion Progress">
                <Award size={12} className="metric-icon" />
                <span>{game.progress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .game-card-wrapper {
          flex: 0 0 205px;
          height: 300px;
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          perspective: 600px;
          z-index: 5;
        }

        .card-face {
          width: 100%;
          height: 100%;
          background: rgba(20, 20, 30, 0.45);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all var(--transition-normal);
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
        }

        .game-card-wrapper:hover .card-face {
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        .game-card-wrapper.selected .card-face {
          border-color: var(--accent-color);
          box-shadow: var(--accent-glow), 0 10px 30px rgba(var(--accent-color-rgb), 0.2);
          background: rgba(var(--accent-color-rgb), 0.04);
        }

        .game-card-wrapper.running .card-face {
          border-color: rgba(239, 68, 68, 0.6);
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
        }

        .card-image-container {
          width: 100%;
          height: 215px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          transition: transform 0.8s ease;
        }

        .card-image-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.18), rgba(7, 7, 10, 0.94));
          color: rgba(255, 255, 255, 0.72);
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 1px;
          text-align: center;
          text-transform: uppercase;
        }

        .game-card-wrapper:hover .card-image {
          transform: scale(1.05);
        }

        .running-overlay-indicator {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(239, 68, 68, 0.85);
          backdrop-filter: blur(5px);
          padding: 4px 8px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #fff;
          z-index: 10;
        }

        .running-dot-pulse {
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          animation: running-pulse-glow 1.2s infinite ease-in-out;
        }

        @keyframes running-pulse-glow {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }

        .favorite-indicator-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(230, 175, 46, 0.95);
          color: #07070a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 0 10px rgba(230, 175, 46, 0.4);
        }

        .card-hover-actions {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
          z-index: 9;
        }

        .game-card-wrapper:hover .card-hover-actions {
          opacity: 1;
        }

        .quick-play-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent-color);
          border: none;
          color: #07070a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--accent-glow);
          transform: translateY(10px);
        }

        .game-card-wrapper:hover .quick-play-button {
          transform: translateY(0);
        }

        .quick-play-button:hover {
          background: #fff;
          color: #000;
          transform: scale(1.1);
          box-shadow: 0 0 20px #fff;
        }

        .quick-play-button.running-btn {
          background: #ef4444;
          color: #fff;
          box-shadow: 0 0 15px #ef4444;
        }
        .quick-play-button.running-btn:hover {
          background: #f87171;
        }

        .card-details-panel {
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          background: rgba(10, 10, 15, 0.4);
        }

        .card-title {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 14px;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 6px;
        }

        .card-meta-metrics {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.45);
        }

        .metric-icon {
          color: var(--accent-color);
        }
      `}} />
    </div>
  );
}
