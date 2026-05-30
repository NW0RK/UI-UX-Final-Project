import React, { useRef } from 'react';
import { Play, Flame, Star, Award, Trash2, Monitor, Gamepad2, Smartphone } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './HorizontalLibrary.css';

export default function HorizontalLibrary({ 
  games, 
  selectedGame, 
  onSelectGame, 
  onLaunchGame, 
  onRemoveGame, 
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
              onRemove={() => onRemoveGame(game.id)}
            />
          );
        })}
      </div>


    </div>
  );
}

const platformIcons = {
  'PC': Monitor,
  'PS5': Gamepad2,
  'PS4': Gamepad2,
  'Xbox Series X|S': Gamepad2,
  'Xbox One': Gamepad2,
  'Switch': Gamepad2,
  'Mobile': Smartphone
};

function PlatformIcon({ platform }) {
  const Icon = platformIcons[platform] || Gamepad2;
  const label = platform === 'PS5' || platform === 'PS4' ? 'PS' :
                platform.startsWith('Xbox') ? 'XB' :
                platform === 'Switch' ? 'NS' :
                platform === 'Mobile' ? 'Mob' :
                platform === 'PC' ? 'PC' : platform.slice(0, 2);
  return (
    <div className="platform-icon-badge" title={platform}>
      <Icon size={10} />
      <span>{label}</span>
    </div>
  );
}

function GameCard({ game, isSelected, isRunning, onClick, onLaunch, onRemove }) {
  const handleLaunchClick = (e) => {
    e.stopPropagation();
    onLaunch();
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemove();
  };

  const playtimeHours = Math.round((game.playtime / 3600) * 10) / 10;

  return (
    <div 
      className={`store-card ${isSelected ? 'selected' : ''} ${isRunning ? 'running' : ''}`}
      onClick={onClick}
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
          <button
            className="quick-remove-button"
            onClick={handleRemoveClick}
            title="Remove from Library"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="store-card-info">
        <div className="store-card-title">{game.title}</div>
        <div className="store-card-developer">{game.developer}</div>
        <div className="store-card-platforms">
          {game.platforms?.map(p => (
            <PlatformIcon key={p} platform={p} />
          ))}
        </div>
        <div className="store-card-rating">
          <Flame size={10} className="metric-icon" />
          <span>{playtimeHours}h</span>
          {game.progress > 0 && (
            <>
              <span className="rating-divider">·</span>
              <Award size={10} className="metric-icon" />
              <span>{game.progress}%</span>
            </>
          )}
        </div>
      </div>


    </div>
  );
}
