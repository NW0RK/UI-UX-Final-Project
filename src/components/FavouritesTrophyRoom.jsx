import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Flame,
  Gauge,
  Pencil,
  Play,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trophy
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

const SORT_OPTIONS = [
  { id: 'recent', label: 'Recent' },
  { id: 'played', label: 'Most Played' },
  { id: 'title', label: 'Title' },
  { id: 'progress', label: 'Progress' }
];

function formatPlaytime(seconds = 0) {
  const totalSeconds = Number(seconds) || 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);

  if (hours <= 0 && minutes <= 0) return 'Unplayed';
  if (hours <= 0) return `${minutes}m`;
  if (minutes <= 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

function getReleaseYear(game) {
  if (!game?.releaseDate) return 'Unknown year';
  return String(game.releaseDate).slice(0, 4);
}

function getLastPlayedRank(game) {
  if (!game?.lastPlayed || game.lastPlayed === 'Never') return 0;
  const parsed = Date.parse(game.lastPlayed);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function sortGames(games, sortMode) {
  const sorted = [...games];

  if (sortMode === 'played') {
    return sorted.sort((a, b) => (Number(b.playtime) || 0) - (Number(a.playtime) || 0));
  }

  if (sortMode === 'title') {
    return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  }

  if (sortMode === 'progress') {
    return sorted.sort((a, b) => (Number(b.progress) || 0) - (Number(a.progress) || 0));
  }

  return sorted.sort((a, b) => getLastPlayedRank(b) - getLastPlayedRank(a));
}

export default function FavouritesTrophyRoom({
  games,
  selectedGame,
  onSelectGame,
  onLaunchGame,
  onToggleFavorite,
  onEditMetadata,
  onReturnToLibrary,
  runningGameId
}) {
  const [sortMode, setSortMode] = useState('recent');
  const pointerFocusGameIdRef = useRef(null);

  const visibleGames = useMemo(() => sortGames(games, sortMode), [games, sortMode]);
  const spotlightGame = visibleGames.find(game => game.id === selectedGame?.id) || visibleGames[0] || null;
  const mostPlayedGame = useMemo(
    () => [...games].sort((a, b) => (Number(b.playtime) || 0) - (Number(a.playtime) || 0))[0],
    [games]
  );
  const totalPlaytime = useMemo(
    () => games.reduce((total, game) => total + (Number(game.playtime) || 0), 0),
    [games]
  );
  const averageProgress = useMemo(() => {
    if (!games.length) return 0;
    return Math.round(games.reduce((total, game) => total + (Number(game.progress) || 0), 0) / games.length);
  }, [games]);

  useEffect(() => {
    if (spotlightGame && selectedGame?.id !== spotlightGame.id) {
      onSelectGame(spotlightGame);
    }
  }, [onSelectGame, selectedGame?.id, spotlightGame]);

  const handleSelect = (game) => {
    audioEngine.playClickPulse();
    onSelectGame(game);
  };

  const handleCardPointerDown = (game) => {
    pointerFocusGameIdRef.current = game.id;
  };

  const handleFocus = (game) => {
    if (pointerFocusGameIdRef.current === game.id) {
      pointerFocusGameIdRef.current = null;
      return;
    }

    if (selectedGame?.id !== game.id) {
      audioEngine.playHoverTick();
      onSelectGame(game);
    }
  };

  const handleSortChange = (mode) => {
    audioEngine.playClickPulse();
    setSortMode(mode);
  };

  const handleLaunch = (event, game) => {
    event.stopPropagation();
    if (!game) return;
    audioEngine.playLaunchSwell();
    onLaunchGame(game);
  };

  const handleEdit = (event, game) => {
    event.stopPropagation();
    if (!game || !onEditMetadata) return;
    audioEngine.playClickPulse();
    onEditMetadata(game);
  };

  const handleRemoveFavorite = (event, game) => {
    event.stopPropagation();
    if (!game) return;

    const nextGame = visibleGames.find(candidate => candidate.id !== game.id) || null;
    audioEngine.playClickPulse();
    if (nextGame) onSelectGame(nextGame);
    onToggleFavorite(game.id);
  };

  if (games.length === 0) {
    return (
      <div className="favourites-room gallery-vault-empty">
        <div className="vault-empty-backdrop" />
        <section className="empty-vault-display">
          <div className="empty-trophy-ring">
            <Trophy size={40} />
          </div>
          <span className="vault-kicker">Gallery Vault</span>
          <h1>No Favourites Yet</h1>
          <p>Star a game from your Library to curate a private vault for the titles you keep coming back to.</p>
          <button
            type="button"
            className="glow-btn glow-btn-primary empty-return-btn"
            onClick={onReturnToLibrary}
            onMouseEnter={audioEngine.playHoverTick}
            data-controller-default="true"
          >
            <ArrowLeft size={16} />
            <span>Back to Library</span>
          </button>
        </section>
        <style dangerouslySetInnerHTML={{ __html: roomStyles }} />
      </div>
    );
  }

  const isRunning = runningGameId === spotlightGame?.id;
  const heroImage = spotlightGame?.bannerUrl || spotlightGame?.coverUrl;
  const heroTags = spotlightGame?.tags?.filter(Boolean).slice(0, 4) || [];
  const progressValue = Math.max(0, Math.min(100, Number(spotlightGame?.progress) || 0));
  const description = spotlightGame?.description || 'No description has been added yet. Open Metadata to tune this entry for your vault.';
  const releaseYear = getReleaseYear(spotlightGame);

  return (
    <div className="favourites-room gallery-vault">
      <div className="gallery-vault-backdrop" aria-hidden="true">
        {heroImage ? (
          <img src={heroImage} alt="" className="gallery-vault-backdrop-image" key={spotlightGame?.id} />
        ) : (
          <div className="gallery-vault-backdrop-fallback" />
        )}
        <div className="gallery-vault-shade" />
      </div>

      <div className="gallery-vault-layout">
        <section
          key={spotlightGame?.id}
          className="vault-hero-panel"
          aria-label="Selected favourite"
        >
          <div className="vault-hero-media">
            {heroImage ? (
              <img src={heroImage} alt={spotlightGame?.title} className="vault-hero-image" />
            ) : (
              <div className="vault-hero-placeholder">
                <Sparkles size={34} />
                <span>{spotlightGame?.title}</span>
              </div>
            )}
            <div className="vault-hero-vignette" />
            {isRunning && (
              <div className="vault-running-badge">
                <span className="vault-running-dot" />
                Running
              </div>
            )}
          </div>

          <div className="vault-hero-copy">
            <div className="vault-eyebrow-row">
              <span className="vault-kicker">Gallery Vault</span>
              <span className="vault-count-pill">{games.length} curated</span>
            </div>

            <h1>{spotlightGame?.title}</h1>
            <div className="vault-meta-line">
              <span>{spotlightGame?.developer || 'Unknown Developer'}</span>
              <span>{releaseYear}</span>
              <span>{formatPlaytime(spotlightGame?.playtime)}</span>
            </div>

            {heroTags.length > 0 && (
              <div className="vault-tag-row">
                {heroTags.map(tag => (
                  <span key={tag} className="vault-tag">{tag}</span>
                ))}
              </div>
            )}

            <p className="vault-description">{description}</p>

            <div className="vault-progress-block">
              <div className="vault-progress-topline">
                <span>Campaign Progress</span>
                <strong>{progressValue}%</strong>
              </div>
              <div className="vault-progress-track" aria-hidden="true">
                <span style={{ width: `${progressValue}%` }} />
              </div>
              <small>{spotlightGame?.nextAchievement || 'No next milestone tracked'}</small>
            </div>

            <div className="vault-action-row">
              <button
                type="button"
                className={`vault-primary-action ${isRunning ? 'is-running' : ''}`}
                onClick={(event) => handleLaunch(event, spotlightGame)}
                onMouseEnter={audioEngine.playHoverTick}
                data-controller-default="true"
                data-controller-confirm-label={isRunning ? `${spotlightGame?.title} is running` : `Play ${spotlightGame?.title}`}
              >
                <Play size={17} fill="currentColor" />
                <span>{isRunning ? 'Running' : 'Play'}</span>
              </button>
              <button
                type="button"
                className="vault-icon-action"
                onClick={(event) => handleRemoveFavorite(event, spotlightGame)}
                onMouseEnter={audioEngine.playHoverTick}
                title="Remove from Favourites"
                aria-label={`Remove ${spotlightGame?.title} from Favourites`}
              >
                <Star size={18} fill="currentColor" />
              </button>
              <button
                type="button"
                className="vault-icon-action"
                onClick={(event) => handleEdit(event, spotlightGame)}
                onMouseEnter={audioEngine.playHoverTick}
                title="Edit Metadata"
                aria-label={`Edit ${spotlightGame?.title} metadata`}
              >
                <Pencil size={17} />
              </button>
            </div>
          </div>
        </section>

        <aside className="vault-side-panel" aria-label="Favourite collection">
          <div className="vault-stats-grid">
            <div className="vault-stat-card">
              <Clock3 size={16} />
              <span>Total Playtime</span>
              <strong>{formatPlaytime(totalPlaytime)}</strong>
            </div>
            <div className="vault-stat-card">
              <Gauge size={16} />
              <span>Avg Progress</span>
              <strong>{averageProgress}%</strong>
            </div>
            <div className="vault-stat-card">
              <Flame size={16} />
              <span>Most Played</span>
              <strong>{mostPlayedGame?.title || 'None'}</strong>
            </div>
          </div>

          <div className="vault-collection-header">
            <div>
              <span className="vault-kicker">Curated Shelf</span>
              <h2>Favourites</h2>
            </div>
            <SlidersHorizontal size={18} />
          </div>

          <div className="vault-sort-row" role="group" aria-label="Sort favourites">
            {SORT_OPTIONS.map(option => (
              <button
                key={option.id}
                type="button"
                className={`vault-sort-chip ${sortMode === option.id ? 'active' : ''}`}
                onClick={() => handleSortChange(option.id)}
                onMouseEnter={audioEngine.playHoverTick}
                aria-pressed={sortMode === option.id}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="vault-card-grid">
            {visibleGames.map(game => {
              const selected = spotlightGame?.id === game.id;
              const cardRunning = runningGameId === game.id;
              const cardImage = game.coverUrl || game.bannerUrl;
              const cardProgress = Math.max(0, Math.min(100, Number(game.progress) || 0));

              return (
                <button
                  key={game.id}
                  type="button"
                  className={`fav-game-card vault-game-card ${selected ? 'selected' : ''} ${cardRunning ? 'running' : ''}`}
                  aria-selected={selected}
                  data-controller-item="true"
                  data-controller-selected={selected ? 'true' : undefined}
                  data-controller-confirm-label={`Select ${game.title}`}
                  onPointerDown={() => handleCardPointerDown(game)}
                  onClick={() => handleSelect(game)}
                  onFocus={() => handleFocus(game)}
                  onMouseEnter={audioEngine.playHoverTick}
                >
                  <span className="vault-card-art">
                    {cardImage ? (
                      <img src={cardImage} alt="" />
                    ) : (
                      <span className="vault-card-placeholder">{game.title}</span>
                    )}
                  </span>
                  <span className="vault-card-scrim" />
                  <span className="vault-card-topline">
                    {cardRunning && <span className="vault-running-dot" />}
                    {mostPlayedGame?.id === game.id && <Flame size={13} fill="currentColor" />}
                  </span>
                  <span className="vault-card-copy">
                    <strong>{game.title}</strong>
                    <span>
                      <CalendarDays size={12} />
                      {getReleaseYear(game)}
                    </span>
                  </span>
                  <span className="vault-card-progress" aria-hidden="true">
                    <span style={{ width: `${cardProgress}%` }} />
                  </span>
                </button>
              );
            })}
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: roomStyles }} />
    </div>
  );
}

const roomStyles = `
  .favourites-room {
    position: absolute;
    inset: 0;
    z-index: 10;
    color: #fff;
    overflow: hidden;
    isolation: isolate;
    background: #050b14;
  }

  .gallery-vault-backdrop,
  .vault-empty-backdrop {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .gallery-vault-backdrop-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.52;
    filter: brightness(0.32) saturate(1.12) contrast(1.08);
    transform: scale(1.015);
    animation: vault-backdrop-in 850ms var(--ease-interface) both;
  }

  .gallery-vault-backdrop-fallback,
  .vault-empty-backdrop {
    background:
      radial-gradient(circle at 18% 22%, rgba(var(--accent-color-rgb), 0.18), transparent 30%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.92), #050b14 58%);
  }

  .gallery-vault-shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(5, 11, 20, 0.98) 0%, rgba(5, 11, 20, 0.74) 42%, rgba(5, 11, 20, 0.5) 100%),
      linear-gradient(0deg, #050b14 0%, rgba(5, 11, 20, 0.34) 48%, rgba(5, 11, 20, 0.72) 100%);
  }

  @keyframes vault-backdrop-in {
    from { opacity: 0; transform: scale(1.055); }
    to { opacity: 0.52; transform: scale(1.015); }
  }

  .gallery-vault-layout {
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: calc(var(--header-height) + 22px) 42px 30px;
    display: grid;
    grid-template-columns: minmax(520px, 1.15fr) minmax(420px, 0.85fr);
    gap: 28px;
  }

  .vault-hero-panel,
  .vault-side-panel,
  .empty-vault-display {
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015)),
      var(--panel-bg);
    border: 1px solid rgba(255, 255, 255, 0.105);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
  }

  .vault-hero-panel {
    min-width: 0;
    display: grid;
    grid-template-columns: minmax(240px, 0.86fr) minmax(310px, 1fr);
    overflow: hidden;
    border-radius: 18px;
    animation: vault-hero-panel-switch 520ms var(--ease-interface) both;
    transform-origin: 52% 50%;
  }

  @keyframes vault-hero-panel-switch {
    0% {
      opacity: 0;
      transform: translateY(12px) scale(0.985);
      filter: saturate(0.82) brightness(0.78);
    }
    58% {
      opacity: 1;
      transform: translateY(-2px) scale(1.004);
      filter: saturate(1.04) brightness(1.03);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: saturate(1) brightness(1);
    }
  }

  .vault-hero-media {
    position: relative;
    min-width: 0;
    min-height: 100%;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.025);
  }

  .vault-hero-image,
  .vault-hero-placeholder {
    width: 100%;
    height: 100%;
    min-height: 520px;
    object-fit: cover;
    display: flex;
    animation: vault-hero-media-switch 680ms var(--ease-interface) both;
  }

  @keyframes vault-hero-media-switch {
    from {
      opacity: 0.55;
      transform: scale(1.045);
      filter: blur(3px) brightness(0.82);
    }
    to {
      opacity: 1;
      transform: scale(1);
      filter: blur(0) brightness(1);
    }
  }

  .vault-hero-placeholder {
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 14px;
    padding: 28px;
    text-align: center;
    color: rgba(255, 255, 255, 0.78);
    background:
      radial-gradient(circle at 50% 30%, rgba(var(--accent-color-rgb), 0.18), transparent 42%),
      linear-gradient(135deg, rgba(30, 41, 59, 0.92), rgba(5, 11, 20, 0.98));
  }

  .vault-hero-placeholder span {
    max-width: 80%;
    font-weight: 900;
    font-size: var(--fs-26);
    line-height: 1.1;
    text-transform: uppercase;
    overflow-wrap: anywhere;
  }

  .vault-hero-vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(90deg, rgba(5, 11, 20, 0) 40%, rgba(5, 11, 20, 0.54) 100%),
      linear-gradient(0deg, rgba(5, 11, 20, 0.72), transparent 44%);
  }

  .vault-running-badge {
    position: absolute;
    left: 18px;
    top: 18px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 30px;
    padding: 0 12px;
    border-radius: 999px;
    color: #fff;
    background: rgba(239, 68, 68, 0.18);
    border: 1px solid rgba(239, 68, 68, 0.36);
    font-size: var(--fs-11);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.7px;
  }

  .vault-running-dot {
    width: 8px;
    height: 8px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 0 12px rgba(239, 68, 68, 0.86);
    animation: vault-running-pulse 1.2s ease-in-out infinite;
  }

  @keyframes vault-running-pulse {
    0%, 100% { opacity: 0.62; transform: scale(0.86); }
    50% { opacity: 1; transform: scale(1.16); }
  }

  .vault-hero-copy {
    box-sizing: border-box;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 34px;
    gap: 16px;
    animation: vault-hero-copy-switch 560ms var(--ease-interface) 70ms both;
  }

  @keyframes vault-hero-copy-switch {
    from {
      opacity: 0;
      transform: translateX(18px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .vault-eyebrow-row,
  .vault-meta-line,
  .vault-progress-topline,
  .vault-action-row,
  .vault-collection-header,
  .vault-sort-row,
  .vault-card-topline,
  .vault-card-copy span {
    display: flex;
    align-items: center;
  }

  .vault-eyebrow-row {
    justify-content: space-between;
    gap: 12px;
  }

  .vault-kicker {
    color: var(--accent-color);
    font-size: var(--fs-11);
    font-weight: 900;
    letter-spacing: 1.6px;
    text-transform: uppercase;
  }

  .vault-count-pill {
    flex: 0 0 auto;
    padding: 5px 10px;
    border-radius: 999px;
    background: rgba(var(--accent-color-rgb), 0.1);
    border: 1px solid rgba(var(--accent-color-rgb), 0.22);
    color: rgba(255, 255, 255, 0.78);
    font-size: var(--fs-11);
    font-weight: 800;
    text-transform: uppercase;
  }

  .vault-hero-copy h1 {
    margin: 2px 0 0;
    font-size: var(--fs-48);
    line-height: 1.03;
    font-weight: 950;
    letter-spacing: 0;
    text-transform: uppercase;
    overflow-wrap: anywhere;
  }

  .vault-meta-line {
    flex-wrap: wrap;
    gap: 8px;
    color: rgba(255, 255, 255, 0.58);
    font-size: var(--fs-12);
    font-weight: 700;
  }

  .vault-meta-line span {
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .vault-meta-line span + span::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    margin: 0 8px 2px 0;
    border-radius: 50%;
    background: rgba(var(--accent-color-rgb), 0.72);
  }

  .vault-tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .vault-tag {
    min-height: 26px;
    display: inline-flex;
    align-items: center;
    padding: 0 11px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.055);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.72);
    font-size: var(--fs-10);
    font-weight: 800;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .vault-description {
    margin: 0;
    color: rgba(255, 255, 255, 0.66);
    font-size: var(--fs-14);
    line-height: 1.58;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .vault-progress-block {
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-top: auto;
    padding: 16px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.035);
    border: 1px solid rgba(255, 255, 255, 0.07);
  }

  .vault-progress-topline {
    justify-content: space-between;
    gap: 12px;
    color: rgba(255, 255, 255, 0.58);
    font-size: var(--fs-11);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.9px;
  }

  .vault-progress-topline strong {
    color: #fff;
    font-size: var(--fs-14);
  }

  .vault-progress-track,
  .vault-card-progress {
    position: relative;
    overflow: hidden;
    height: 5px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
  }

  .vault-progress-track span,
  .vault-card-progress span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--accent-color), rgba(255, 255, 255, 0.72));
    box-shadow: 0 0 14px rgba(var(--accent-color-rgb), 0.38);
  }

  .vault-progress-block small {
    color: rgba(255, 255, 255, 0.48);
    font-size: var(--fs-11);
    line-height: 1.35;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vault-action-row {
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 2px;
  }

  .vault-primary-action,
  .vault-icon-action,
  .vault-sort-chip {
    border: 0;
    cursor: pointer;
    font-family: var(--font-sans);
    transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast), box-shadow var(--transition-fast), color var(--transition-fast);
  }

  .vault-primary-action {
    min-width: 148px;
    min-height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
    border-radius: 999px;
    background: var(--accent-color);
    color: #000;
    font-size: var(--fs-13);
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    box-shadow: 0 0 22px rgba(var(--accent-color-rgb), 0.34);
  }

  .vault-primary-action.is-running {
    color: #fff;
    background: #ef4444;
    box-shadow: 0 0 22px rgba(239, 68, 68, 0.36);
  }

  .vault-icon-action {
    width: 50px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .vault-primary-action:hover,
  .vault-icon-action:hover,
  .vault-sort-chip:hover {
    transform: translateY(-2px);
    border-color: rgba(var(--accent-color-rgb), 0.34);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.26), 0 0 20px rgba(var(--accent-color-rgb), 0.1);
  }

  .vault-side-panel {
    min-width: 0;
    overflow: visible;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 18px;
  }

  .vault-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .vault-stat-card {
    min-width: 0;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    padding: 13px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.07);
  }

  .vault-stat-card svg {
    color: var(--accent-color);
  }

  .vault-stat-card span {
    color: rgba(255, 255, 255, 0.43);
    font-size: var(--fs-10);
    font-weight: 800;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .vault-stat-card strong {
    min-width: 0;
    color: #fff;
    font-size: var(--fs-13);
    font-weight: 900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vault-collection-header {
    justify-content: space-between;
    gap: 14px;
    padding-top: 2px;
  }

  .vault-collection-header h2 {
    margin: 4px 0 0;
    font-size: var(--fs-24);
    line-height: 1;
    font-weight: 950;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .vault-collection-header svg {
    color: rgba(255, 255, 255, 0.5);
    flex: 0 0 auto;
  }

  .vault-sort-row {
    flex-wrap: wrap;
    gap: 8px;
    position: relative;
    z-index: 2;
  }

  .vault-sort-chip {
    min-height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.58);
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(255, 255, 255, 0.075);
    font-size: var(--fs-11);
    font-weight: 850;
    text-transform: uppercase;
    letter-spacing: 0.7px;
  }

  .vault-sort-chip.active {
    color: #000;
    background: var(--accent-color);
    border-color: var(--accent-color);
  }

  .vault-card-grid {
    min-height: 0;
    flex: 1;
    position: relative;
    z-index: 3;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(138px, 1fr));
    align-content: start;
    gap: 12px;
    overflow-y: auto;
    padding: 20px 12px 22px;
    margin-top: -4px;
    scroll-padding: 20px 12px 22px;
  }

  .vault-card-grid::-webkit-scrollbar {
    width: 4px;
  }

  .vault-card-grid::-webkit-scrollbar-track {
    background: transparent;
  }

  .vault-card-grid::-webkit-scrollbar-thumb {
    background: rgba(var(--accent-color-rgb), 0.22);
    border-radius: 999px;
  }

  .vault-game-card {
    position: relative;
    min-width: 0;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    color: #fff;
    cursor: pointer;
    padding: 0;
    text-align: left;
    transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast), opacity var(--transition-fast);
  }

  .vault-game-card:hover,
  .vault-game-card:focus-visible,
  .vault-game-card.selected {
    transform: translateY(-6px) scale(1.018);
    z-index: 8;
    border-color: rgba(var(--accent-color-rgb), 0.42);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.36), 0 0 22px rgba(var(--accent-color-rgb), 0.12);
  }

  .vault-game-card.selected {
    border-color: var(--accent-color);
  }

  .vault-card-art,
  .vault-card-art img,
  .vault-card-scrim {
    position: absolute;
    inset: 0;
  }

  .vault-card-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.86) brightness(0.74);
    transition: transform 0.5s ease, filter 0.35s ease;
  }

  .vault-game-card:hover .vault-card-art img,
  .vault-game-card:focus-visible .vault-card-art img,
  .vault-game-card.selected .vault-card-art img {
    transform: scale(1.05);
    filter: saturate(1.08) brightness(0.9);
  }

  .vault-card-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    background: linear-gradient(135deg, rgba(var(--accent-color-rgb), 0.14), rgba(15, 23, 42, 0.98));
    color: rgba(255, 255, 255, 0.78);
    font-size: var(--fs-12);
    font-weight: 900;
    line-height: 1.2;
    text-align: center;
    text-transform: uppercase;
    overflow-wrap: anywhere;
  }

  .vault-card-scrim {
    background: linear-gradient(0deg, rgba(5, 11, 20, 0.96) 0%, rgba(5, 11, 20, 0.46) 47%, rgba(5, 11, 20, 0.12) 100%);
  }

  .vault-card-topline {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    justify-content: space-between;
    color: var(--accent-color);
    min-height: 16px;
  }

  .vault-card-copy {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 14px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .vault-card-copy strong {
    min-width: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #fff;
    font-size: var(--fs-13);
    line-height: 1.16;
    font-weight: 900;
    letter-spacing: 0;
  }

  .vault-card-copy span {
    gap: 5px;
    color: rgba(255, 255, 255, 0.52);
    font-size: var(--fs-10);
    font-weight: 800;
  }

  .vault-card-progress {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 8px;
    height: 3px;
  }

  .gallery-vault-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--header-height) + 28px) 28px 28px;
  }

  .empty-vault-display {
    position: relative;
    z-index: 2;
    width: min(540px, 92vw);
    box-sizing: border-box;
    text-align: center;
    padding: 48px 38px;
    border-radius: 18px;
  }

  .empty-trophy-ring {
    width: 92px;
    height: 92px;
    margin: 0 auto 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color);
    background: rgba(var(--accent-color-rgb), 0.1);
    border: 1px solid rgba(var(--accent-color-rgb), 0.3);
    box-shadow: 0 0 38px rgba(var(--accent-color-rgb), 0.16);
  }

  .empty-vault-display h1 {
    margin: 8px 0 0;
    font-size: var(--fs-34);
    line-height: 1.1;
    font-weight: 950;
    text-transform: uppercase;
  }

  .empty-vault-display p {
    max-width: 370px;
    margin: 14px auto 28px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    font-size: var(--fs-14);
  }

  .empty-return-btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
  }

  @media (max-width: 1120px) {
    .gallery-vault-layout {
      grid-template-columns: 1fr;
      overflow-y: auto;
    }

    .vault-hero-panel {
      min-height: 560px;
    }

    .vault-side-panel {
      min-height: 520px;
    }
  }

  @media (max-width: 760px) {
    .gallery-vault-layout {
      padding: calc(var(--header-height) + 16px) 18px 22px;
      gap: 18px;
    }

    .vault-hero-panel {
      grid-template-columns: 1fr;
    }

    .vault-hero-image,
    .vault-hero-placeholder {
      min-height: 260px;
      max-height: 320px;
    }

    .vault-hero-copy {
      padding: 24px;
    }

    .vault-hero-copy h1 {
      font-size: var(--fs-34);
    }

    .vault-stats-grid {
      grid-template-columns: 1fr;
    }
  }
`;
