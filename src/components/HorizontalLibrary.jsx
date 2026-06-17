import React, { useRef, useState, useEffect } from 'react';
import { Play, Star } from 'lucide-react';
import { FixedSizeList as List } from 'react-window';
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemData = {
    games,
    selectedGame,
    runningGameId,
    handleCardClick,
    handleCardFocus,
    onLaunchGame
  };

  const VirtualCard = ({ index, style, data }) => {
    const { games, selectedGame, runningGameId, handleCardClick, handleCardFocus, onLaunchGame } = data;
    const game = games[index];
    const isSelected = selectedGame?.id === game.id;
    const isRunning = runningGameId === game.id;

    return (
      <div style={{
        ...style,
        paddingLeft: index === 0 ? 20 : 0,
        display: 'flex',
        alignItems: 'flex-start'
      }}>
        <GameCard 
          game={game} 
          isSelected={isSelected}
          isRunning={isRunning}
          onClick={() => handleCardClick(game)}
          onFocus={() => handleCardFocus(game)}
          onLaunch={() => onLaunchGame(game)}
        />
      </div>
    );
  };

  return (
    <div className="horizontal-library-shelf" ref={shelfRef}>
      <div className="shelf-title-row">
        <h2 className="shelf-title">My Library</h2>
        <span className="library-count">{games.length} games available</span>
      </div>

      <div className="library-grid-horizontal-virtual-wrapper">
        <List
          className="library-grid-horizontal-virtual"
          layout="horizontal"
          itemCount={games.length}
          itemSize={236}
          width={windowWidth}
          height={420}
          itemData={itemData}
        >
          {VirtualCard}
        </List>
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

        .library-grid-horizontal-virtual-wrapper {
          padding: 15px 0 20px 0;
        }

        .library-grid-horizontal-virtual {
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
        }

        /* Hide Scrollbar but allow scrolling */
        .library-grid-horizontal-virtual::-webkit-scrollbar {
          height: 4px;
        }
        .library-grid-horizontal-virtual::-webkit-scrollbar-track {
          background: transparent;
        }
        .library-grid-horizontal-virtual::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .library-grid-horizontal-virtual:hover::-webkit-scrollbar-thumb {
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
      className={`library-card ${isSelected ? 'selected' : ''} ${isRunning ? 'running' : ''}`}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      data-controller-item="true"
      data-controller-confirm-label={`Select ${game.title}`}
      data-controller-selected={isSelected ? 'true' : undefined}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={audioEngine.playHoverTick}
    >
      <div className="library-card-image-wrapper">
        {game.coverUrl ? (
          <img src={game.coverUrl} alt={game.title} className="library-card-image" loading="lazy" />
        ) : (
          <div className="library-card-image library-card-image-placeholder">
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

        <div className="library-card-hover">
          <button
            className={`quick-play-button ${isRunning ? 'running-btn' : ''}`}
            onClick={handleLaunchClick}
            title={isRunning ? "Game Running" : "Launch Game"}
          >
            <Play fill={isRunning ? "transparent" : "currentColor"} size={16} />
          </button>
        </div>
      </div>

      <div className="library-card-info">
        <div className="library-card-title">{game.title}</div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .library-card {
          flex: 0 0 210px;
          width: 210px;
          min-width: 210px;
          max-width: 210px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .library-card-image-wrapper {
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
        .library-card:not(.selected):hover .library-card-image-wrapper {
          opacity: 0.85;
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Active Selected Card styling matching Favourites page */
        .library-card.selected .library-card-image-wrapper {
          border: 2px solid var(--accent-color);
          box-shadow: 0px 0px 25px rgba(var(--accent-color-rgb), 0.25);
          border-radius: 32px;
          opacity: 1;
        }

        .library-card.selected:hover .library-card-image-wrapper {
          transform: translateY(-4px);
        }

        .library-card.running .library-card-image-wrapper {
          border-color: rgba(239, 68, 68, 0.6);
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
        }

        .library-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease, filter 0.4s ease;
          display: block;
        }

        /* Grayscale for inactive cover images matching Favourites page */
        .library-card:not(.selected) .library-card-image {
          filter: grayscale(100%) brightness(0.5) contrast(1.1);
        }

        .library-card:not(.selected):hover .library-card-image {
          filter: grayscale(40%) brightness(0.7) contrast(1.05);
        }

        .library-card.selected .library-card-image {
          filter: none;
        }

        .library-card-image-placeholder {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
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

        .library-card-image-placeholder span {
          display: -webkit-box;
          max-width: 100%;
          max-height: 7.6em;
          overflow: hidden;
          overflow-wrap: anywhere;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }

        .library-card.selected .library-card-image-placeholder {
          background: linear-gradient(135deg, rgba(var(--accent-color-rgb), 0.15) 0%, #0f172a 100%);
          color: #fff;
        }

        .library-card:hover .library-card-image {
          transform: scale(1.06);
        }

        .library-card-hover {
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

        .library-card:hover .library-card-hover,
        .library-card:focus .library-card-hover,
        .library-card:focus-within .library-card-hover {
          opacity: 1;
        }

        .library-card-info {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }

        .library-card-title {
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

        .library-card:hover .quick-play-button,
        .library-card:focus .quick-play-button,
        .library-card:focus-within .quick-play-button {
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

