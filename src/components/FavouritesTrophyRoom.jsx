import React, { useRef, useState, useEffect } from 'react';
import { Play, Star, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

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
  const shelfRef = useRef(null);

  // Default to the first favorited game if selectedGame is not in the favorites list
  const spotlightGame = games.find(game => game.id === selectedGame?.id) || games[0];

  // Sync selected game on load
  useEffect(() => {
    if (spotlightGame && selectedGame?.id !== spotlightGame.id) {
      onSelectGame(spotlightGame);
    }
  }, [games, spotlightGame]);

  const handleSelect = (game) => {
    audioEngine.playClickPulse();
    onSelectGame(game);
  };

  const handleFocus = (game) => {
    if (selectedGame?.id !== game.id) {
      audioEngine.playHoverTick();
      onSelectGame(game);
    }
  };

  const handleLaunch = (event, game) => {
    event.stopPropagation();
    audioEngine.playLaunchSwell();
    onLaunchGame(game);
  };

  const handleScrollLeft = (event) => {
    if (event) event.preventDefault();
    audioEngine.playClickPulse();
    if (shelfRef.current) {
      const scrollAmount = 240;
      shelfRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      
      // Dynamic fallback for sandboxed environments
      setTimeout(() => {
        if (shelfRef.current && shelfRef.current.scrollLeft === 0) {
          shelfRef.current.scrollLeft -= scrollAmount;
        }
      }, 50);
    }
  };

  const handleScrollRight = (event) => {
    if (event) event.preventDefault();
    audioEngine.playClickPulse();
    if (shelfRef.current) {
      const scrollAmount = 240;
      shelfRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Dynamic fallback for sandboxed environments
      setTimeout(() => {
        if (shelfRef.current && shelfRef.current.scrollLeft === 0) {
          shelfRef.current.scrollLeft += scrollAmount;
        }
      }, 50);
    }
  };

  if (games.length === 0) {
    return (
      <div className="favourites-room empty-room">
        <div className="vault-ambient-glow" />
        <div className="empty-vault-display">
          <div className="empty-trophy-ring">
            <Star size={42} fill="var(--accent-color)" color="var(--accent-color)" />
          </div>
          <span className="room-kicker">Private Collection</span>
          <h1>No Favourites Yet</h1>
          <p>Mark games with the star in Library and they will appear in this Favourites room.</p>
          <button
            className="glow-btn glow-btn-primary empty-return-btn"
            onClick={onReturnToLibrary}
            onMouseEnter={audioEngine.playHoverTick}
          >
            <span>Back to Library</span>
          </button>
        </div>
        <style dangerouslySetInnerHTML={{ __html: roomStyles }} />
      </div>
    );
  }

  // Find the game with the highest playtime to display "Most Played" tag
  const mostPlayedGame = [...games].sort((a, b) => b.playtime - a.playtime)[0];

  const playtimeHours = spotlightGame ? Math.round(spotlightGame.playtime / 3600) : 0;
  const releaseYear = spotlightGame?.releaseDate ? spotlightGame.releaseDate.split('-')[0] : '2024';

  return (
    <div className="favourites-room">
      {/* 1. Dynamic Space Backdrop */}
      <div className="dynamic-backdrop">
        <img 
          src={spotlightGame?.bannerUrl || "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop"} 
          alt="Space Background" 
          className="backdrop-image" 
          key={spotlightGame?.id}
        />
        <div className="ambient-blur-overlay" />
        <div className="gradient-fade-overlay" />
      </div>

      {/* 2. Content Layout */}
      <div className="favourites-content-layer">
        
        {/* Left Column: Glassmorphic Spotlight Sidebar */}
        <aside className="spotlight-sidebar-panel">
          {/* Subtle gold inner blur glow */}
          <div className="subtle-inner-glow" />

          {/* Tags Badges */}
          <div className="tags-badges-row">
            {spotlightGame?.tags?.slice(0, 3).map((tag, idx) => (
              <span key={idx} className={`tag-badge ${idx < 2 ? 'tag-badge-gold' : 'tag-badge-normal'}`}>
                {tag}
              </span>
            )) || (
              <>
                <span className="tag-badge tag-badge-gold">SCI-FI</span>
                <span className="tag-badge tag-badge-gold">RPG</span>
                <span className="tag-badge tag-badge-normal">SINGLEPLAYER</span>
              </>
            )}
          </div>

          {/* Game Title */}
          <h1 className="spotlight-game-title">
            {spotlightGame?.title}
          </h1>

          {/* Metadata Subtitle */}
          <div className="spotlight-metadata-subtitle">
            {spotlightGame?.developer?.toUpperCase() || 'NOVA STUDIOS'} • {releaseYear} • {playtimeHours} HOURS PLAYED
          </div>

          {/* Game Description */}
          <p className="spotlight-description">
            {spotlightGame?.description || 'Embark on a stunning adventure. Explore rich visuals and immersive storytelling tailored perfectly for the next-generation ecosystem.'}
          </p>

          {/* Action Row Buttons */}
          <div className="spotlight-actions-row">
            <button 
              className={`orange-play-btn ${runningGameId === spotlightGame?.id ? 'running-pulse' : ''}`}
              onClick={(e) => handleLaunch(e, spotlightGame)}
              onMouseEnter={audioEngine.playHoverTick}
            >
              <Play size={16} fill="currentColor" />
              <span>{runningGameId === spotlightGame?.id ? 'Running...' : 'Play Game'}</span>
            </button>

            <button 
              className="options-circle-btn"
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(spotlightGame?.id); }}
              onMouseEnter={audioEngine.playHoverTick}
              title="Remove from Favourites"
            >
              <Star size={18} fill="var(--accent-color)" color="var(--accent-color)" />
            </button>
          </div>
        </aside>

        {/* Right Column: Carousel Grid */}
        <section className="favorites-carousel-panel">
          <div className="carousel-header-row">
            <h2 className="favorites-heading">Favorites</h2>
            <div className="scroll-controls-container">
              <button 
                className="scroll-arrow-btn"
                onClick={handleScrollLeft}
                onMouseEnter={audioEngine.playHoverTick}
                title="Scroll Left"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="scroll-arrow-btn"
                onClick={handleScrollRight}
                onMouseEnter={audioEngine.playHoverTick}
                title="Scroll Right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Horizontal scroll shelf */}
          <div className="favorites-shelf-scroll" ref={shelfRef}>
            {games.map((game) => {
              const isSelected = spotlightGame?.id === game.id;
              const isRunning = runningGameId === game.id;
              const isMostPlayed = mostPlayedGame?.id === game.id;

              return (
                <div 
                  key={game.id}
                  className={`fav-game-card ${isSelected ? 'active-card' : 'inactive-card'}`}
                  role="button"
                  tabIndex={0}
                  aria-selected={isSelected}
                  data-controller-confirm-label={`Select ${game.title}`}
                  data-controller-selected={isSelected ? 'true' : undefined}
                  onClick={() => handleSelect(game)}
                  onFocus={() => handleFocus(game)}
                  onMouseEnter={audioEngine.playHoverTick}
                >
                  {/* Card Cover Art */}
                  {game.coverUrl ? (
                    <img 
                      src={game.coverUrl} 
                      alt={game.title} 
                      className="card-cover-image" 
                    />
                  ) : (
                    <div className="card-cover-placeholder">
                      <span>{game.title}</span>
                    </div>
                  )}

                  {/* Gradient bottom overlay */}
                  <div className="card-gradient-overlay" />

                  {/* Most Played Badge */}
                  {isMostPlayed && isSelected && (
                    <div className="most-played-badge">
                      <Flame size={12} fill="currentColor" />
                      <span>Most Played</span>
                    </div>
                  )}

                  {/* Dynamic Info */}
                  {isSelected ? (
                    <div className="active-card-info">
                      <h3 className="active-card-title">{game.title}</h3>
                      <div className="active-card-rating">
                        <Star size={10} fill="var(--accent-color)" color="var(--accent-color)" />
                        <Star size={10} fill="var(--accent-color)" color="var(--accent-color)" />
                        <Star size={10} fill="var(--accent-color)" color="var(--accent-color)" />
                        <Star size={10} fill="var(--accent-color)" color="var(--accent-color)" />
                        <Star size={10} fill={game.rating >= 4.7 ? "var(--accent-color)" : "transparent"} color="var(--accent-color)" />
                      </div>
                    </div>
                  ) : (
                    <h3 className="inactive-card-title">{game.title}</h3>
                  )}

                  {/* Running Indicator */}
                  {isRunning && (
                    <div className="card-running-dot" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>

      <style dangerouslySetInnerHTML={{ __html: roomStyles }} />
    </div>
  );
}

const roomStyles = `
  .favourites-room {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #050B14;
    overflow: hidden;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    isolation: isolate;
    z-index: 10;
  }

  /* 1. Dynamic Backdrop Styles */
  .dynamic-backdrop {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .backdrop-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.65;
    animation: zoom-fade-in 1.4s ease-in-out forwards;
    filter: brightness(0.25) contrast(1.1);
  }

  @keyframes zoom-fade-in {
    0% { transform: scale(1.06); opacity: 0; }
    100% { transform: scale(1.0); opacity: 0.65; }
  }

  .ambient-blur-overlay {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background: linear-gradient(90deg, #050B14 0%, rgba(5, 11, 20, 0.8) 50%, rgba(5, 11, 20, 0) 100%);
    z-index: 1;
  }

  .gradient-fade-overlay {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background: linear-gradient(0deg, #050B14 0%, rgba(5, 11, 20, 0.4) 50%, rgba(5, 11, 20, 0) 100%);
    z-index: 2;
  }

  /* 2. Content Layout */
  .favourites-content-layer {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 40px 60px;
    gap: 48px;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: auto;
  }

  /* 3. Left Panel Spotlight Sidebar */
  .spotlight-sidebar-panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 32px;
    isolation: isolate;
    position: relative;
    width: 464px;
    height: 100%;
    max-height: calc(100% - 20px);
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border-radius: 32px;
    z-index: 15;
    overflow-y: auto;
  }

  .subtle-inner-glow {
    position: absolute;
    width: 192px;
    height: 192px;
    left: -95px;
    top: -95px;
    background: rgba(var(--accent-color-rgb), 0.2);
    filter: blur(30px);
    border-radius: 33554400px;
    pointer-events: none;
    z-index: 0;
  }

  .tags-badges-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    margin-bottom: 24px;
    z-index: 2;
  }

  .tag-badge {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 6px 16px;
    border-radius: 33554400px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: var(--fs-12);
    line-height: 1.3;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

  .tag-badge-gold {
    background: rgba(var(--accent-color-rgb), 0.1);
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
  }

  .tag-badge-normal {
    background: rgba(255, 255, 255, 0.0203922);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #FFFFFF;
  }

  .spotlight-game-title {
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: var(--fs-48);
    line-height: 1.1;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #FFFFFF;
    margin-bottom: 12px;
    z-index: 2;
  }

  .spotlight-metadata-subtitle {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: var(--fs-14);
    line-height: 1.4;
    display: flex;
    align-items: center;
    letter-spacing: 0.35px;
    color: #94A3B8;
    margin-bottom: 24px;
    z-index: 2;
  }

  .spotlight-description {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: var(--fs-13);
    line-height: 1.5;
    color: #94A3B8;
    margin-bottom: 32px;
    z-index: 2;
    text-align: left;
    overflow-y: auto;
  }

  .spotlight-actions-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 16px;
    width: 100%;
    margin-top: auto;
    z-index: 2;
  }

  .orange-play-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    gap: 12px;
    flex: 1;
    min-height: 52px;
    background: var(--accent-color);
    box-shadow: 0px 0px 20px rgba(var(--accent-color-rgb), 0.4);
    border-radius: 33554400px;
    border: none;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: var(--fs-14);
    line-height: 1.4;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: #000000;
    transition: all var(--transition-fast);
  }

  .orange-play-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0px 0px 30px rgba(var(--accent-color-rgb), 0.6);
    filter: brightness(1.12);
  }

  .orange-play-btn.running-pulse {
    background: #EF4444;
    color: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(239, 68, 68, 0.5);
  }

  .orange-play-btn.running-pulse:hover {
    background: #F87171;
  }

  .options-circle-btn {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 56px;
    height: 56px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 33554400px;
    color: #FFFFFF;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .options-circle-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  /* 4. Right Content Panel Favorites List */
  .favorites-carousel-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px 0px 32px;
    height: 100%;
    flex: 1;
    min-width: 0;
  }

  .carousel-header-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0px 8px;
    width: 100%;
    margin-bottom: 24px;
  }

  .favorites-heading {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: var(--fs-24);
    line-height: 1.3;
    letter-spacing: 2.4px;
    text-transform: uppercase;
    color: #FFFFFF;
  }

  .scroll-controls-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
    position: relative;
    z-index: 200;
    pointer-events: auto;
  }

  .scroll-arrow-btn {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 48px;
    height: 48px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 33554400px;
    color: #FFFFFF;
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
    z-index: 210;
    pointer-events: auto;
  }

  .scroll-arrow-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  /* 5. Horizontal Shelf Scroll */
  .favorites-shelf-scroll {
    width: 100%;
    height: 360px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 24px;
    overflow-x: auto;
    padding: 10px 8px 24px;
    scroll-behavior: smooth;
  }

  .favorites-shelf-scroll::-webkit-scrollbar {
    height: 0px;
    display: none;
  }

  /* 6. Game Card Styles */
  .fav-game-card {
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s var(--ease-interface);
  }

  /* Active Card layout */
  .fav-game-card.active-card {
    box-sizing: border-box;
    width: 224px;
    height: 336px;
    background: rgba(255, 255, 255, 0.002);
    border: 2px solid var(--accent-color);
    box-shadow: 0px 0px 30px rgba(var(--accent-color-rgb), 0.2);
    border-radius: 32px;
  }

  /* Inactive Card layout */
  .fav-game-card.inactive-card {
    box-sizing: border-box;
    width: 192px;
    height: 288px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    opacity: 0.5;
  }

  .fav-game-card.inactive-card:hover {
    opacity: 0.85;
    transform: translateY(-4px);
  }

  .card-cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: inherit;
    transition: filter 0.4s ease;
  }

  .inactive-card .card-cover-image {
    filter: grayscale(100%) brightness(0.5) contrast(1.1);
  }

  .card-cover-placeholder {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    font-size: var(--fs-16);
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #FFFFFF;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  }

  .active-card .card-cover-placeholder {
    background: linear-gradient(135deg, rgba(var(--accent-color-rgb), 0.15) 0%, #0f172a 100%);
  }

  .card-gradient-overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(0deg, #050B14 0%, rgba(5, 11, 20, 0.2) 50%, rgba(5, 11, 20, 0) 100%);
    opacity: 0.8;
    z-index: 1;
    border-radius: inherit;
    pointer-events: none;
  }

  /* Most Played Badge */
  .most-played-badge {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 12px;
    gap: 4px;
    position: absolute;
    min-height: 24px;
    right: 18px;
    top: 18px;
    background: var(--accent-color);
    border-radius: 30px;
    z-index: 2;
    pointer-events: none;
  }

  .most-played-badge span {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: var(--fs-12);
    line-height: 1.3;
    color: #000000;
  }

  .most-played-badge svg {
    color: #000000;
  }

  /* Info elements */
  .active-card-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    position: absolute;
    min-height: 72px;
    left: 22px;
    right: 22px;
    bottom: 22px;
    z-index: 3;
    pointer-events: none;
  }

  .active-card-title {
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: var(--fs-20);
    line-height: 1.4;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #FFFFFF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .active-card-rating {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 100%;
    min-height: 12px;
  }

  .inactive-card-title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: var(--fs-14);
    line-height: 1.4;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    color: #FFFFFF;
    position: absolute;
    left: 17px;
    right: 17px;
    bottom: 17px;
    z-index: 3;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Running Dot Indicator */
  .card-running-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #EF4444;
    box-shadow: 0 0 10px #EF4444;
    top: 18px;
    left: 18px;
    z-index: 3;
    animation: card-running-glow 1.2s infinite ease-in-out;
  }

  @keyframes card-running-glow {
    0%, 100% { opacity: 0.5; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  /* Empty vault styles */
  .empty-room {
    min-height: calc(100vh - var(--header-height) - 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .empty-vault-display {
    width: min(520px, 92vw);
    text-align: center;
    padding: 48px 36px;
    border-radius: 32px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
  }

  .empty-trophy-ring {
    width: 94px;
    height: 94px;
    margin: 0 auto 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--accent-color-rgb), 0.1);
    border: 1px solid rgba(var(--accent-color-rgb), 0.3);
    box-shadow: 0 0 38px rgba(var(--accent-color-rgb), 0.16);
  }

  .empty-vault-display p {
    margin: 14px auto 26px;
    max-width: 360px;
    color: rgba(255,255,255,0.58);
    line-height: 1.6;
    font-size: var(--fs-14);
  }
`;

