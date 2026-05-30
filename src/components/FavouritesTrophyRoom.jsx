import React from 'react';
import { ArrowLeft, Award, Clock, Flame, Play, Star, Trash2, Trophy } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './FavouritesTrophyRoom.css';

export default function FavouritesTrophyRoom({
  games,
  selectedGame,
  onSelectGame,
  onLaunchGame,
  onToggleFavorite,
  onRemoveGame,
  onReturnToLibrary,
  runningGameId
}) {
  const spotlightGame = games.find(game => game.id === selectedGame?.id) || games[0];

  const formatPlaytime = (seconds = 0) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs === 0) return `${mins}m`;
    if (mins === 0) return `${hrs}h`;
    return `${hrs}h ${mins}m`;
  };

  const handleSelect = (game) => {
    audioEngine.playClickPulse();
    onSelectGame(game);
  };

  const handleLaunch = (event, game) => {
    event.stopPropagation();
    audioEngine.playLaunchSwell();
    onLaunchGame(game);
  };

  const handleToggleFavorite = (event, game) => {
    event.stopPropagation();
    audioEngine.playClickPulse();
    onToggleFavorite(game.id);
  };

  const handleRemoveGame = (event, game) => {
    event.stopPropagation();
    audioEngine.playClickPulse();
    onRemoveGame(game.id);
  };

  if (games.length === 0) {
    return (
      <div className="favourites-room empty-room">
        <div className="vault-ambient-glow" />
        <div className="empty-vault-display">
          <div className="empty-trophy-ring">
            <Trophy size={42} />
          </div>
          <span className="room-kicker">Private Collection</span>
          <h1>No Favourites Yet</h1>
          <p>Mark games with the star in Library and they will appear in this trophy room.</p>
          <button
            className="glow-btn glow-btn-primary empty-return-btn"
            onClick={onReturnToLibrary}
            onMouseEnter={audioEngine.playHoverTick}
          >
            <ArrowLeft size={16} />
            <span>Back to Library</span>
          </button>
        </div>


      </div>
    );
  }

  return (
    <div className="favourites-room">
      <div className="vault-ambient-glow" />
      <div className="room-ceiling-light" />
      <div className="polished-floor-reflection" />

      <div className="trophy-room-header">
        <div>
          <span className="room-kicker">Curated Vault</span>
          <h1>Favourites Trophy Room</h1>
        </div>
        <div className="room-count-plaque">
          <Trophy size={16} />
          <span>{games.length} prized {games.length === 1 ? 'game' : 'games'}</span>
        </div>
      </div>

      {spotlightGame && (
        <section className="spotlight-pedestal" onClick={() => handleSelect(spotlightGame)}>
          <div className="pedestal-light-cone" />
          <div className="cylindrical-base" />
          <div className="spotlight-cover-shell">
            {spotlightGame.coverUrl ? (
              <img src={spotlightGame.coverUrl} alt={spotlightGame.title} className="spotlight-cover" />
            ) : (
              <div className="spotlight-cover trophy-art-placeholder">{spotlightGame.title}</div>
            )}
          </div>
          <div className="spotlight-plaque">
            <span className="plaque-label">Featured Favourite</span>
            <h2>{spotlightGame.title}</h2>
            <div className="plaque-meta">
              <span>{spotlightGame.developer}</span>
              <span>{spotlightGame.genre}</span>
              <span>{spotlightGame.rating} rating</span>
            </div>
          </div>
        </section>
      )}

      <div className="display-case-grid">
        {games.map((game, index) => {
          const isSelected = selectedGame?.id === game.id;
          const isRunning = runningGameId === game.id;

          return (
            <article
              key={game.id}
              className={`favourite-display-case ${isSelected ? 'selected' : ''} ${isRunning ? 'running' : ''}`}
              onClick={() => handleSelect(game)}
              onMouseEnter={audioEngine.playHoverTick}
              style={{ '--case-delay': `${index * 70}ms` }}
            >
              <div className="case-spotlight" />
              <div className="case-glass-dome">
                <div className="case-metal-rim top-rim" />
                <div className="case-art-frame">
                  {game.coverUrl ? (
                    <img src={game.coverUrl} alt={game.title} className="case-cover-art" loading="lazy" />
                  ) : (
                    <div className="case-cover-art trophy-art-placeholder">{game.title}</div>
                  )}
                  {isRunning && (
                    <div className="case-running-badge">
                      <span className="running-dot" />
                      <span>Running</span>
                    </div>
                  )}
                </div>
                <div className="case-glass-shine" />
                <div className="case-metal-rim bottom-rim" />
              </div>

              <div className="engraved-plaque">
                <div className="plaque-title-row">
                  <div>
                    <h3>{game.title}</h3>
                    <span>{game.developer}</span>
                  </div>
                  <button
                    className="plaque-star-btn active"
                    onClick={(event) => handleToggleFavorite(event, game)}
                    title="Remove from Favourites"
                  >
                    <Star size={15} fill="currentColor" />
                  </button>
                  <button
                    className="plaque-remove-btn"
                    onClick={(event) => handleRemoveGame(event, game)}
                    title="Remove from Library"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div className="artifact-stats">
                  <div className="artifact-stat" title="Playtime">
                    <Clock size={12} />
                    <span>{formatPlaytime(game.playtime)}</span>
                  </div>
                  <div className="artifact-stat" title="Progress">
                    <Award size={12} />
                    <span>{game.progress || 0}%</span>
                  </div>
                  <div className="artifact-stat" title="Last Played">
                    <Flame size={12} />
                    <span>{game.lastPlayed}</span>
                  </div>
                </div>

                <button
                  className={`vault-launch-btn ${isRunning ? 'running' : ''}`}
                  onClick={(event) => handleLaunch(event, game)}
                >
                  <Play size={15} fill={isRunning ? 'transparent' : 'currentColor'} />
                  <span>{isRunning ? 'Running' : 'Launch'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>


    </div>
  );
}


