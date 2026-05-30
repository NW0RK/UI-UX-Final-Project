import React from 'react';
import { ArrowLeft, Award, Clock, Flame, Play, Star, Trophy } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function FavouritesTrophyRoom({
  games,
  selectedGame,
  onSelectGame,
  onLaunchGame,
  onToggleFavorite,
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

        <style dangerouslySetInnerHTML={{ __html: roomStyles }} />
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

      <style dangerouslySetInnerHTML={{ __html: roomStyles }} />
    </div>
  );
}

const roomStyles = `
  .favourites-room {
    position: relative;
    min-height: calc(100vh - var(--header-height) - 40px);
    padding: 28px 0 120px;
    overflow: hidden;
    color: #fff;
    isolation: isolate;
  }

  .favourites-room::before {
    content: '';
    position: absolute;
    inset: -90px -60px -160px;
    background:
      radial-gradient(ellipse at 50% 12%, rgba(232, 184, 91, 0.22), transparent 32%),
      radial-gradient(ellipse at 12% 38%, rgba(114, 9, 20, 0.32), transparent 34%),
      radial-gradient(ellipse at 86% 32%, rgba(174, 136, 72, 0.16), transparent 34%),
      linear-gradient(180deg, #11080a 0%, #080708 44%, #07070a 72%, #050505 100%);
    z-index: -4;
  }

  .vault-ambient-glow {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(212, 175, 55, 0.06), transparent 22%, transparent 78%, rgba(192, 192, 192, 0.06)),
      repeating-linear-gradient(90deg, rgba(255,255,255,0.026) 0 1px, transparent 1px 120px);
    opacity: 0.75;
    z-index: -3;
    pointer-events: none;
  }

  .room-ceiling-light {
    position: absolute;
    top: -80px;
    left: 50%;
    width: min(900px, 76vw);
    height: 430px;
    transform: translateX(-50%);
    background: radial-gradient(ellipse at center, rgba(255, 215, 150, 0.32), rgba(255, 183, 87, 0.08) 45%, transparent 72%);
    filter: blur(8px);
    z-index: -2;
    pointer-events: none;
  }

  .polished-floor-reflection {
    position: absolute;
    left: -60px;
    right: -60px;
    bottom: -120px;
    height: 320px;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(255, 208, 132, 0.17), transparent 58%),
      linear-gradient(180deg, rgba(255,255,255,0.045), transparent 38%);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    transform: perspective(600px) rotateX(58deg);
    transform-origin: top center;
    z-index: -1;
    pointer-events: none;
  }

  .trophy-room-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 18px;
    position: relative;
    z-index: 2;
  }

  .room-kicker {
    display: block;
    font-family: var(--font-display);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(235, 193, 104, 0.78);
    margin-bottom: 8px;
  }

  .trophy-room-header h1,
  .empty-vault-display h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 900;
    letter-spacing: 1px;
    color: #fff;
    text-shadow: 0 0 30px rgba(212, 175, 55, 0.18);
  }

  .room-count-plaque {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(232, 184, 91, 0.28);
    background: linear-gradient(135deg, rgba(55, 38, 18, 0.72), rgba(255, 255, 255, 0.04));
    color: rgba(255, 235, 195, 0.86);
    border-radius: 8px;
    padding: 11px 14px;
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: 700;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 12px 30px rgba(0,0,0,0.36);
  }

  .spotlight-pedestal {
    position: relative;
    display: grid;
    grid-template-columns: minmax(170px, 250px) minmax(0, 1fr);
    align-items: center;
    gap: 30px;
    min-height: 230px;
    margin: 4px auto 26px;
    max-width: 920px;
    cursor: pointer;
    z-index: 1;
  }

  .pedestal-light-cone {
    position: absolute;
    left: 70px;
    top: -70px;
    width: 330px;
    height: 420px;
    background: linear-gradient(180deg, rgba(255, 210, 135, 0.22), rgba(255, 210, 135, 0.02) 72%, transparent);
    clip-path: polygon(40% 0, 60% 0, 100% 100%, 0 100%);
    filter: blur(6px);
    pointer-events: none;
  }

  .cylindrical-base {
    position: absolute;
    left: 24px;
    bottom: 4px;
    width: 260px;
    height: 72px;
    border-radius: 50%;
    background:
      radial-gradient(ellipse at 50% 20%, rgba(255, 226, 163, 0.22), transparent 58%),
      linear-gradient(180deg, rgba(177, 137, 65, 0.42), rgba(29, 25, 25, 0.92));
    border: 1px solid rgba(232, 184, 91, 0.24);
    box-shadow: inset 0 12px 24px rgba(255,255,255,0.06), 0 32px 50px rgba(0,0,0,0.58);
  }

  .spotlight-cover-shell {
    position: relative;
    width: 185px;
    aspect-ratio: 2 / 3;
    justify-self: center;
    border-radius: 14px;
    padding: 8px;
    background: linear-gradient(135deg, rgba(245, 215, 142, 0.38), rgba(192, 192, 192, 0.13), rgba(42, 34, 24, 0.9));
    box-shadow: 0 26px 60px rgba(0,0,0,0.62), 0 0 70px rgba(232, 184, 91, 0.13);
    z-index: 1;
  }

  .spotlight-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 9px;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
  }

  .trophy-art-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    background: linear-gradient(145deg, rgba(232, 184, 91, 0.2), rgba(7, 7, 10, 0.95));
    color: rgba(255,255,255,0.72);
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 1px;
    line-height: 1.2;
    text-align: center;
    text-transform: uppercase;
  }

  .spotlight-plaque {
    position: relative;
    padding: 26px 28px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(16, 14, 13, 0.82), rgba(72, 44, 18, 0.34));
    border: 1px solid rgba(232, 184, 91, 0.2);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 48px rgba(0,0,0,0.46);
    overflow: hidden;
  }

  .spotlight-plaque::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 42%, transparent 58%);
    opacity: 0.5;
    pointer-events: none;
  }

  .plaque-label {
    font-family: var(--font-display);
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(232, 184, 91, 0.72);
  }

  .spotlight-plaque h2 {
    font-family: var(--font-display);
    font-size: clamp(24px, 3.6vw, 42px);
    line-height: 1.05;
    margin: 8px 0 14px;
    color: #fff;
  }

  .plaque-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    color: rgba(255,255,255,0.62);
    font-size: 12px;
    font-weight: 600;
  }

  .plaque-meta span {
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.035);
    border-radius: 999px;
    padding: 5px 9px;
  }

  .display-case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 28px;
    position: relative;
    z-index: 2;
  }

  .favourite-display-case {
    position: relative;
    min-height: 460px;
    padding: 22px 18px 18px;
    cursor: pointer;
    animation: case-rise 0.6s var(--ease-ps5) both;
    animation-delay: var(--case-delay);
  }

  @keyframes case-rise {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .case-spotlight {
    position: absolute;
    top: -38px;
    left: 50%;
    width: 190px;
    height: 300px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(255, 204, 126, 0.28), transparent 78%);
    clip-path: polygon(34% 0, 66% 0, 100% 100%, 0 100%);
    filter: blur(7px);
    pointer-events: none;
  }

  .case-glass-dome {
    position: relative;
    min-height: 280px;
    border-radius: 44% 44% 18px 18px / 18% 18% 18px 18px;
    padding: 34px 22px 22px;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.16), transparent 28%),
      linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.025) 18%, rgba(255,255,255,0.06) 72%, rgba(255,255,255,0.18)),
      rgba(18, 18, 20, 0.24);
    border: 1px solid rgba(225, 230, 235, 0.18);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -30px 38px rgba(255,255,255,0.035), 0 24px 45px rgba(0,0,0,0.42);
    overflow: hidden;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all var(--transition-normal);
  }

  .favourite-display-case:hover .case-glass-dome,
  .favourite-display-case.selected .case-glass-dome {
    border-color: rgba(232, 184, 91, 0.45);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.28), 0 26px 60px rgba(0,0,0,0.55), 0 0 28px rgba(232, 184, 91, 0.14);
  }

  .favourite-display-case.running .case-glass-dome {
    border-color: rgba(239, 68, 68, 0.62);
    box-shadow: 0 0 28px rgba(239, 68, 68, 0.32), 0 24px 45px rgba(0,0,0,0.42);
  }

  .case-metal-rim {
    position: absolute;
    left: 18px;
    right: 18px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(90deg, rgba(92, 76, 44, 0.2), rgba(232, 184, 91, 0.72), rgba(210, 215, 220, 0.5), rgba(92, 76, 44, 0.2));
    opacity: 0.75;
  }

  .top-rim { top: 14px; }
  .bottom-rim { bottom: 12px; }

  .case-art-frame {
    position: relative;
    width: min(155px, 72%);
    aspect-ratio: 2 / 3;
    margin: 0 auto;
    padding: 6px;
    border-radius: 10px;
    background: linear-gradient(145deg, rgba(232, 184, 91, 0.42), rgba(210, 215, 220, 0.18), rgba(0,0,0,0.52));
    box-shadow: 0 18px 35px rgba(0,0,0,0.5);
  }

  .case-cover-art {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7px;
    display: block;
  }

  .case-cover-art.trophy-art-placeholder {
    display: flex;
  }

  .case-glass-shine {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.14) 16%, transparent 31%),
      linear-gradient(70deg, transparent 52%, rgba(255,255,255,0.09) 66%, transparent 76%);
    pointer-events: none;
  }

  .case-running-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(239, 68, 68, 0.88);
    color: #fff;
    border-radius: 999px;
    padding: 5px 8px;
    font-family: var(--font-display);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .running-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    animation: trophy-running-pulse 1.2s infinite ease-in-out;
  }

  @keyframes trophy-running-pulse {
    0%, 100% { transform: scale(0.82); opacity: 0.55; }
    50% { transform: scale(1.35); opacity: 1; }
  }

  .engraved-plaque {
    position: relative;
    margin: -8px auto 0;
    padding: 16px;
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(62, 45, 22, 0.88), rgba(14, 13, 13, 0.92)),
      linear-gradient(90deg, rgba(255,255,255,0.06), transparent);
    border: 1px solid rgba(232, 184, 91, 0.26);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 28px rgba(0,0,0,0.38);
  }

  .plaque-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 13px;
  }

  .plaque-title-row h3 {
    font-size: 15px;
    line-height: 1.15;
    color: #fff5df;
    margin-bottom: 4px;
  }

  .plaque-title-row span {
    display: block;
    color: rgba(255,255,255,0.5);
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
  }

  .plaque-star-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(232, 184, 91, 0.35);
    background: rgba(232, 184, 91, 0.13);
    color: #e6af2e;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all var(--transition-fast);
  }

  .plaque-star-btn:hover {
    background: #e6af2e;
    color: #07070a;
    box-shadow: 0 0 16px rgba(230, 175, 46, 0.48);
  }

  .artifact-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 7px;
    margin-bottom: 13px;
  }

  .artifact-stat {
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
    padding: 7px 5px;
    color: rgba(255,255,255,0.65);
    font-size: 10px;
    font-weight: 700;
  }

  .artifact-stat svg {
    color: rgba(232, 184, 91, 0.84);
    flex-shrink: 0;
  }

  .artifact-stat span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vault-launch-btn {
    width: 100%;
    height: 38px;
    border: 1px solid rgba(232, 184, 91, 0.36);
    border-radius: 8px;
    background: linear-gradient(135deg, #e6af2e, #f7dc8c);
    color: #07070a;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .vault-launch-btn:hover {
    transform: translateY(-2px);
    background: #fff;
    box-shadow: 0 0 22px rgba(255, 239, 195, 0.48);
  }

  .vault-launch-btn.running {
    background: #ef4444;
    border-color: #ef4444;
    color: #fff;
    box-shadow: 0 0 18px rgba(239, 68, 68, 0.4);
  }

  .empty-room {
    min-height: calc(100vh - var(--header-height) - 40px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-vault-display {
    width: min(520px, 92vw);
    text-align: center;
    padding: 48px 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(18, 16, 16, 0.86), rgba(72, 44, 18, 0.28));
    border: 1px solid rgba(232, 184, 91, 0.24);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 70px rgba(0,0,0,0.52);
  }

  .empty-trophy-ring {
    width: 94px;
    height: 94px;
    margin: 0 auto 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e6af2e;
    background: radial-gradient(circle, rgba(232, 184, 91, 0.22), rgba(232, 184, 91, 0.04));
    border: 1px solid rgba(232, 184, 91, 0.3);
    box-shadow: 0 0 38px rgba(232, 184, 91, 0.16);
  }

  .empty-vault-display p {
    margin: 14px auto 26px;
    max-width: 360px;
    color: rgba(255,255,255,0.58);
    line-height: 1.6;
    font-size: 14px;
  }

  .empty-return-btn {
    min-width: 180px;
  }

  @media (max-width: 980px) {
    .spotlight-pedestal {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 14px;
    }

    .cylindrical-base,
    .pedestal-light-cone {
      left: 50%;
      transform: translateX(-50%);
    }

    .plaque-meta {
      justify-content: center;
    }
  }

  @media (max-width: 760px) {
    .favourites-room {
      padding-top: 18px;
    }

    .trophy-room-header {
      align-items: flex-start;
      flex-direction: column;
    }

    .display-case-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
`;
