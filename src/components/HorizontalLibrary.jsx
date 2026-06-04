import React, { useRef } from 'react';
import { Play, Star } from 'lucide-react';
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

  const handleCardFocus = (game) => {
    if (selectedGame?.id !== game.id) {
      onSelectGame(game);
      audioEngine.playHoverTick();
    }
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
              onFocus={() => handleCardFocus(game)}
              onLaunch={() => onLaunchGame(game)}
            />
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .horizontal-library-shelf {
          margin-top: auto;
          padding-top: 24px;
          padding-bottom: 0px;
          z-index: 10;
          position: relative;
        }

        .shelf-title-row {
          display: flex;
          align-items: baseline;
          gap: 15px;
          margin-bottom: 5px;
          padding-left: 10px;
        }

        .shelf-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: var(--fs-16);
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .library-count {
          font-size: var(--fs-11);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.5px;
        }

        .library-grid-horizontal {
          display: flex;
          gap: 26px;
          overflow-x: auto;
          padding: 15px 10px 20px 10px;
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

function GameCard({ game, isSelected, isRunning, onClick, onFocus, onLaunch }) {
  const handleLaunchClick = (e) => {
    e.stopPropagation();
    onLaunch();
  };

  return (
    <div 
      className={`store-card ${isSelected ? 'selected' : ''} ${isRunning ? 'running' : ''}`}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      data-controller-confirm-label={`Select ${game.title}`}
      data-controller-selected={isSelected ? 'true' : undefined}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={audioEngine.playHoverTick}
    >
      <div className="store-card-image-wrapper">
        {game.coverUrl ? (
          <img src={game.coverUrl} alt={game.title} className="store-card-image" loading="lazy" />
        ) : (
          <div className="store-card-image store-card-image-placeholder">
            <span>{game.title}</span>
          </div>
        )}

        {isRunning && (
          <div className="running-overlay-indicator">
            <span className="running-dot-pulse" />
            <span className="running-text">Running</span>
          </div>
        )}

        {game.isFavorite && (
          <div className="favorite-indicator-badge">
            <Star size={10} fill="currentColor" />
          </div>
        )}

        <div className="store-card-hover">
          <button
            className={`quick-play-button ${isRunning ? 'running-btn' : ''}`}
            onClick={handleLaunchClick}
            title={isRunning ? "Game Running" : "Launch Game"}
          >
            <Play fill={isRunning ? "transparent" : "currentColor"} size={16} />
          </button>
        </div>
      </div>

      <div className="store-card-info">
        <div className="store-card-title">{game.title}</div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .store-card {
          flex: 0 0 210px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .store-card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
          box-sizing: border-box;
          transition: all 0.4s cubic-bezier(0.15, 0.85, 0.3, 1);
          
          /* Inactive card default style */
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          opacity: 0.5;
        }

        /* Hovering over inactive card */
        .store-card:not(.selected):hover .store-card-image-wrapper {
          opacity: 0.85;
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Active Selected Card styling matching Favourites page */
        .store-card.selected .store-card-image-wrapper {
          border: 2px solid var(--accent-color);
          box-shadow: 0px 0px 25px rgba(var(--accent-color-rgb), 0.25);
          border-radius: 32px;
          opacity: 1;
        }

        .store-card.selected:hover .store-card-image-wrapper {
          transform: translateY(-4px);
        }

        .store-card.running .store-card-image-wrapper {
          border-color: rgba(239, 68, 68, 0.6);
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
        }

        .store-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease, filter 0.4s ease;
          display: block;
        }

        /* Grayscale for inactive cover images matching Favourites page */
        .store-card:not(.selected) .store-card-image {
          filter: grayscale(100%) brightness(0.5) contrast(1.1);
        }

        .store-card:not(.selected):hover .store-card-image {
          filter: grayscale(40%) brightness(0.7) contrast(1.05);
        }

        .store-card.selected .store-card-image {
          filter: none;
        }

        .store-card-image-placeholder {
          width: 100%;
          height: 100%;
          border-radius: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
          font-family: var(--font-display);
          font-size: var(--fs-14);
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: background 0.4s ease;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: rgba(255, 255, 255, 0.7);
        }

        .store-card.selected .store-card-image-placeholder {
          background: linear-gradient(135deg, rgba(var(--accent-color-rgb), 0.15) 0%, #0f172a 100%);
          color: #fff;
        }

        .store-card:hover .store-card-image {
          transform: scale(1.06);
        }

        .store-card-hover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
          z-index: 4;
          border-radius: inherit;
        }

        .store-card:hover .store-card-hover {
          opacity: 1;
        }

        .store-card-info {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }

        .store-card-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: var(--fs-13);
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
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
          font-size: var(--fs-9);
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

        .store-card:hover .quick-play-button {
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

      `}} />
    </div>
  );
}

