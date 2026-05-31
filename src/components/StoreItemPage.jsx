import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Monitor, Gamepad2, Smartphone, Check, Plus, Link, FolderOpen, Play, Star, Trash2, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

const platformIcons = {
  'PC': Monitor,
  'PS5': Gamepad2,
  'PS4': Gamepad2,
  'Xbox Series X|S': Gamepad2,
  'Xbox One': Gamepad2,
  'Switch': Gamepad2,
  'Mobile': Smartphone
};

const MOCK_MEDIA_DATABASE = {
  cyberpunk: {
    screenshots: [
      { id: 0, path_full: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200' },
      { id: 1, path_full: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200' },
      { id: 2, path_full: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?q=80&w=1200' },
      { id: 3, path_full: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200' },
      { id: 4, path_full: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200' }
    ],
    movies: [
      {
        id: 0,
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400',
        mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-43959-large.mp4' }
      }
    ]
  },
  eldenring: {
    screenshots: [
      { id: 0, path_full: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200' },
      { id: 1, path_full: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200' },
      { id: 2, path_full: 'https://images.unsplash.com/photo-1519074069444-1ba4e6663104?q=80&w=1200' },
      { id: 3, path_full: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200' },
      { id: 4, path_full: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200' }
    ],
    movies: [
      {
        id: 0,
        thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400',
        mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-spooky-dark-forest-with-fog-and-trees-43285-large.mp4' }
      }
    ]
  },
  hades: {
    screenshots: [
      { id: 0, path_full: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?q=80&w=1200' },
      { id: 1, path_full: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200' },
      { id: 2, path_full: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200' },
      { id: 3, path_full: 'https://images.unsplash.com/photo-1519074069444-1ba4e6663104?q=80&w=1200' },
      { id: 4, path_full: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200' }
    ],
    movies: [
      {
        id: 0,
        thumbnail: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?q=80&w=400',
        mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-fire-sparks-rising-in-the-dark-42296-large.mp4' }
      }
    ]
  }
};

function getCuratedMockMedia(gameId, title) {
  const cleanId = (gameId || '').toLowerCase();
  
  if (MOCK_MEDIA_DATABASE[cleanId]) {
    return MOCK_MEDIA_DATABASE[cleanId];
  }

  if (cleanId.includes('starfield') || cleanId.includes('halo') || cleanId.includes('space') || cleanId.includes('horizon')) {
    return {
      screenshots: [
        { id: 0, path_full: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200' },
        { id: 1, path_full: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200' },
        { id: 2, path_full: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200' },
        { id: 3, path_full: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200' },
        { id: 4, path_full: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1200' }
      ],
      movies: [
        {
          id: 0,
          thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400',
          mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-realistic-cosmic-nebula-explosion-42845-large.mp4' }
        }
      ]
    };
  }

  if (cleanId.includes('spider') || cleanId.includes('hero') || cleanId.includes('man')) {
    return {
      screenshots: [
        { id: 0, path_full: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1200' },
        { id: 1, path_full: 'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=1200' },
        { id: 2, path_full: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200' },
        { id: 3, path_full: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200' },
        { id: 4, path_full: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200' }
      ],
      movies: [
        {
          id: 0,
          thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400',
          mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-gamer-playing-a-console-game-41865-large.mp4' }
        }
      ]
    };
  }

  if (cleanId.includes('zelda') || cleanId.includes('witcher') || cleanId.includes('fantasy') || cleanId.includes('ring') || cleanId.includes('lies') || cleanId.includes('baldurs')) {
    return {
      screenshots: [
        { id: 0, path_full: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200' },
        { id: 1, path_full: 'https://images.unsplash.com/photo-1519074069444-1ba4e6663104?q=80&w=1200' },
        { id: 2, path_full: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200' },
        { id: 3, path_full: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200' },
        { id: 4, path_full: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200' }
      ],
      movies: [
        {
          id: 0,
          thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400',
          mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-epic-foggy-mountain-peaks-at-sunset-42171-large.mp4' }
        }
      ]
    };
  }

  return {
    screenshots: [
      { id: 0, path_full: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200' },
      { id: 1, path_full: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200' },
      { id: 2, path_full: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200' },
      { id: 3, path_full: 'https://images.unsplash.com/photo-1519074069444-1ba4e6663104?q=80&w=1200' },
      { id: 4, path_full: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200' }
    ],
    movies: [
      {
        id: 0,
        thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400',
        mp4: { max: 'https://assets.mixkit.co/videos/preview/mixkit-gamer-playing-first-person-shooter-video-game-41864-large.mp4' }
      }
    ]
  };
}

export default function StoreItemPage({ item, ownedGames, onBack, onMarkOwned, onLinkExe, onLaunch, onRemoveGame }) {
  const [exeInput, setExeInput] = useState('');
  const [showExeInput, setShowExeInput] = useState(false);
  const [media, setMedia] = useState({ screenshots: [], movies: [] });
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    if (!item) return;
    let active = true;

    async function loadMedia() {
      setLoadingMedia(true);
      let fetchedData = null;

      if (item.steamAppId) {
        if (window.electronAPI?.fetchSteamDetails) {
          try {
            fetchedData = await window.electronAPI.fetchSteamDetails(item.steamAppId);
          } catch (e) {
            console.error("Failed to fetch steam details via IPC:", e);
          }
        } else {
          try {
            const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${item.steamAppId}`);
            const json = await res.json();
            if (json && json[item.steamAppId]?.success) {
              fetchedData = json[item.steamAppId].data;
            }
          } catch (e) {
            console.error("CORS or network error fetching steam details in browser sandbox:", e);
          }
        }
      }

      if (!active) return;

      if (fetchedData && (fetchedData.screenshots?.length || fetchedData.movies?.length)) {
        const screenshots = fetchedData.screenshots || [];
        const movies = fetchedData.movies || [];
        setMedia({ screenshots, movies });
        if (movies.length > 0) {
          setSelectedMedia({
            type: 'video',
            url: movies[0].mp4?.max || movies[0].mp4?.['480'] || movies[0].webm?.max,
            thumbnail: movies[0].thumbnail
          });
        } else if (screenshots.length > 0) {
          setSelectedMedia({ type: 'image', url: screenshots[0].path_full });
        } else {
          setSelectedMedia(null);
        }
      } else {
        const fallback = getCuratedMockMedia(item.id, item.title);
        setMedia(fallback);
        if (fallback.movies?.length > 0) {
          setSelectedMedia({ type: 'video', url: fallback.movies[0].mp4?.max || fallback.movies[0].url, thumbnail: fallback.movies[0].thumbnail });
        } else if (fallback.screenshots?.length > 0) {
          setSelectedMedia({ type: 'image', url: fallback.screenshots[0].path_full || fallback.screenshots[0].url });
        } else {
          setSelectedMedia(null);
        }
      }
      setLoadingMedia(false);
    }

    loadMedia();
    return () => { active = false; };
  }, [item]);

  useEffect(() => {
    if (lightboxIndex === -1) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(-1);
      else if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % media.screenshots.length);
      else if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + media.screenshots.length) % media.screenshots.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, media.screenshots]);

  if (!item) return null;

  const ownedGame = ownedGames.find(g => g.id === item.id);
  const isOwned = !!ownedGame;
  const hasExe = isOwned && ownedGame.exePath;

  const handleMarkOwnedClick = () => {
    audioEngine.playClickPulse();
    onMarkOwned(item);
  };

  const handleBrowseExe = () => {
    audioEngine.playClickPulse();
    if (window.electronAPI) {
      window.electronAPI.selectExecutable().then(path => {
        if (path) {
          setExeInput(path);
          onLinkExe(item.id, path);
          setShowExeInput(false);
        }
      });
    } else {
      const path = prompt('Enter the full path to the .exe file:', 'C:\\Games\\' + item.title + '\\game.exe');
      if (path) {
        setExeInput(path);
        onLinkExe(item.id, path);
        setShowExeInput(false);
      }
    }
  };

  const handleLinkExeClick = () => {
    audioEngine.playClickPulse();
    if (exeInput) {
      onLinkExe(item.id, exeInput);
      setShowExeInput(false);
    }
  };

  const handleLaunchClick = () => {
    audioEngine.playClickPulse();
    if (ownedGame) {
      onLaunch(ownedGame);
    }
  };

  return (
    <div className="store-item-viewport">
      {/* Back button */}
      <button className="store-item-back-btn" onClick={onBack}>
        <ArrowLeft size={16} />
        <span>Back to Store</span>
      </button>

      {/* Banner Section */}
      <div className="store-item-banner">
        {item.bannerUrl ? (
          <img src={item.bannerUrl} alt={item.title} className="store-item-banner-img" />
        ) : (
          <div className="store-item-banner-img store-item-banner-placeholder">
            <span>SteamGridDB artwork pending</span>
          </div>
        )}
        <div className="store-item-banner-overlay" />
        <div className="store-item-banner-content">
          <div className="store-item-banner-tags">
            {item.tags?.map((tag, idx) => (
              <span key={idx} className="store-item-tag">{tag}</span>
            ))}
          </div>
          <h1 className="store-item-title">{item.title}</h1>
          <div className="store-item-meta">
            <span>{item.developer}</span>
            <span className="store-item-dot" />
            <span>{item.publisher}</span>
            <span className="store-item-dot" />
            <span>{item.releaseDate}</span>
          </div>
          <div className="store-item-rating">
            <Star size={14} fill="currentColor" />
            <span>{item.rating}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="store-item-body">
        <div className="store-item-left">
          <h3 className="store-item-section-title">About This Game</h3>
          <p className="store-item-description">{item.description}</p>
          <h3 className="store-item-section-title">Platforms</h3>
          <div className="store-item-platforms">
            {item.platforms.map(p => {
              const Icon = platformIcons[p] || Gamepad2;
              return (
                <div key={p} className="store-item-platform-badge">
                  <Icon size={16} />
                  <span>{p}</span>
                </div>
              );
            })}
          </div>

          {/* Screenshots Section */}
          <h3 className="store-item-section-title" style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ImageIcon size={16} />
            <span>Screenshots & Gallery</span>
          </h3>

          {(() => {
            const combinedMedia = [];
            if (media.screenshots) {
              media.screenshots.forEach((s, idx) => {
                combinedMedia.push({
                  type: 'image',
                  id: `screenshot-${s.id || idx}`,
                  url: s.path_full || s.url,
                  thumbnail: s.path_thumbnail || s.path_full || s.url
                });
              });
            }

            return loadingMedia ? (
              <div className="store-item-media-loading">
                <div className="media-spinner" />
                <span>Fetching visual logs from Steam...</span>
              </div>
            ) : combinedMedia.length > 0 ? (
              <div className="store-item-media-grid">
                {combinedMedia.slice(0, 4).map((med, index) => {
                  const isLastSlot = index === 3 && combinedMedia.length >= 4;
                  const remainingCount = combinedMedia.length - 3;

                  if (isLastSlot) {
                    return (
                      <div
                        key="more-card"
                        className="media-grid-card more-card"
                        onClick={() => {
                          const screenshotIdx = media.screenshots.findIndex(s => (s.path_full || s.url) === med.url);
                          setLightboxIndex(screenshotIdx !== -1 ? screenshotIdx : 0);
                        }}
                      >
                        <img src={med.thumbnail} alt="More media" className="grid-card-img" />
                        <div className="more-card-overlay">
                          <span>+ {remainingCount} {remainingCount === 1 ? 'PHOTO' : 'PHOTOS'}</span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={med.id}
                      className="media-grid-card"
                      onClick={() => {
                        const screenshotIdx = media.screenshots.findIndex(s => (s.path_full || s.url) === med.url);
                        if (screenshotIdx !== -1) {
                          setLightboxIndex(screenshotIdx);
                        } else if (media.screenshots.length > 0) {
                          setLightboxIndex(0);
                        }
                      }}
                    >
                      <img src={med.thumbnail} alt={`Gameplay ${index + 1}`} className="grid-card-img" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="store-item-media-empty">
                <span>No gameplay media available.</span>
              </div>
            );
          })()}

          {/* Fullscreen Lightbox Modal */}
          {lightboxIndex !== -1 && media.screenshots && media.screenshots[lightboxIndex] && (
            <div className="media-lightbox-overlay" onClick={() => setLightboxIndex(-1)}>
              <button className="lightbox-close-btn" onClick={() => setLightboxIndex(-1)}>
                <X size={24} />
              </button>
              
              <button
                className="lightbox-nav-btn prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => (prev - 1 + media.screenshots.length) % media.screenshots.length);
                }}
              >
                <ChevronLeft size={36} />
              </button>

              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img
                  src={media.screenshots[lightboxIndex].path_full || media.screenshots[lightboxIndex].url}
                  alt={`Screenshot Fullscreen ${lightboxIndex + 1}`}
                  className="lightbox-image"
                />
                <div className="lightbox-counter">
                  {lightboxIndex + 1} / {media.screenshots.length}
                </div>
              </div>

              <button
                className="lightbox-nav-btn next"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => (prev + 1) % media.screenshots.length);
                }}
              >
                <ChevronRight size={36} />
              </button>
            </div>
          )}
        </div>

        <div className="store-item-right">
          {/* Ownership Card */}
          <div className="store-item-ownership-card">
            {isOwned ? (
              <>
                <div className="owned-check">
                  <Check size={20} />
                  <span>In Your Library</span>
                </div>

                {hasExe ? (
                  <div className="exe-linked-info">
                    <Link size={14} />
                    <span className="exe-path-label">{ownedGame.exePath}</span>
                  </div>
                ) : (
                  <div className="exe-not-linked">
                    <span>No executable linked yet</span>
                  </div>
                )}

                {/* Link Executable Section */}
                {!showExeInput ? (
                  <div className="store-item-actions">
                    {hasExe && (
                      <button className="glow-btn glow-btn-primary" onClick={handleLaunchClick}>
                        <Play size={14} />
                        <span>Play Now</span>
                      </button>
                    )}
                    <button className="glow-btn" onClick={() => setShowExeInput(true)}>
                      <FolderOpen size={14} />
                      <span>{hasExe ? 'Change EXE' : 'Link EXE'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="exe-input-row">
                    <input
                      type="text"
                      className="glass-input exe-input"
                      placeholder="C:\\Path\\To\\Game.exe"
                      value={exeInput}
                      onChange={(e) => setExeInput(e.target.value)}
                    />
                    <div className="exe-input-actions">
                      <button className="glow-btn" onClick={handleBrowseExe}>
                        <FolderOpen size={14} />
                        <span>Browse</span>
                      </button>
                      <button
                        className="glow-btn glow-btn-primary"
                        onClick={handleLinkExeClick}
                        disabled={!exeInput}
                      >
                        <Link size={14} />
                        <span>Link</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="store-item-divider" />

                <button
                  className="glow-btn remove-owned-btn"
                  onClick={() => onRemoveGame(item.id)}
                >
                  <Trash2 size={14} />
                  <span>Remove from Library</span>
                </button>
              </>
            ) : (
              <>
                <div className="not-owned-label">
                  <span>You don't own this game yet</span>
                </div>
                <button className="glow-btn glow-btn-primary mark-owned-btn" onClick={handleMarkOwnedClick}>
                  <Plus size={16} />
                  <span>Mark as Owned</span>
                </button>
                <div className="owned-hint">
                  Mark a game as owned to add it to your library, then link your .exe file to play.
                </div>
              </>
            )}
          </div>

          {/* Platforms section moved to right column */}
          <div className="store-item-platforms-container" style={{ marginTop: '20px' }}>
            <h3 className="store-item-section-title">Platforms</h3>
            <div className="store-item-platforms">
              {item.platforms.map(p => {
                const Icon = platformIcons[p] || Gamepad2;
                return (
                  <div key={p} className="store-item-platform-badge">
                    <Icon size={16} />
                    <span>{p}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .store-item-viewport {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 10px 0 20px 0;
          overflow: hidden;
          height: 100%;
        }

        .store-item-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 8px 16px;
          color: rgba(255, 255, 255, 0.6);
          font-family: var(--font-display);
          font-size: var(--fs-11);
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all var(--transition-fast);
          margin-bottom: 12px;
          align-self: flex-start;
        }

        .store-item-back-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .store-item-banner {
          position: relative;
          width: 100%;
          height: 280px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .store-item-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .store-item-banner-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 35%, rgba(var(--accent-color-rgb), 0.2), rgba(7, 7, 10, 0.96) 68%);
          color: rgba(255, 255, 255, 0.42);
          font-family: var(--font-display);
          font-size: var(--fs-12);
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .store-item-banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, rgba(7, 7, 10, 0.95) 0%, rgba(7, 7, 10, 0.3) 50%, rgba(7, 7, 10, 0.5) 100%);
          z-index: 1;
        }

        .store-item-banner-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 20px;
          z-index: 2;
        }

        .store-item-banner-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .store-item-tag {
          background: rgba(var(--accent-color-rgb), 0.16);
          border: 1px solid rgba(var(--accent-color-rgb), 0.35);
          color: var(--accent-color);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: var(--fs-10);
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.3);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .store-item-title {
          font-family: var(--font-display);
          font-weight: 950;
          font-size: var(--fs-38);
          letter-spacing: 2px;
          color: #fff;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(var(--accent-color-rgb), 0.25);
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .store-item-meta {
          display: flex;
          align-items: center;
          font-size: var(--fs-13-5);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          gap: 8px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .store-item-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
        }

        .store-item-rating {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: var(--fs-14-5);
          font-weight: 800;
          color: #ffc83b;
          margin-top: 8px;
          background: rgba(0, 0, 0, 0.4);
          padding: 4px 10px;
          border-radius: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .store-item-rating svg {
          filter: drop-shadow(0 0 6px rgba(255, 200, 59, 0.6));
        }

        .store-item-body {
          display: grid;
          grid-template-columns: 1fr minmax(280px, 320px);
          gap: 24px;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        .store-item-left {
          display: flex;
          flex-direction: column;
          min-height: 0;
          overflow: hidden;
        }

        .store-item-section-title {
          font-family: var(--font-display);
          font-size: var(--fs-14-5);
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .store-item-description {
          font-size: var(--fs-17);
          line-height: 1.8;
          color: #a2b8cc;
          font-weight: 400;
          margin-bottom: 20px;
          letter-spacing: 0.3px;
          white-space: pre-line;
          overflow-y: auto;
          max-height: 8em;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) rgba(0, 0, 0, 0);
        }

        .store-item-description::-webkit-scrollbar {
          width: 4px;
        }

        .store-item-description::-webkit-scrollbar-track {
          background: transparent;
        }

        .store-item-description::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .store-item-platforms {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .store-item-platform-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: var(--fs-11);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          transition: all var(--transition-fast);
        }

        .store-item-platform-badge:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .store-item-platform-badge svg {
          color: var(--accent-color);
          filter: drop-shadow(0 0 5px rgba(var(--accent-color-rgb), 0.4));
        }

        /* --- Media Grid Section --- */
        .store-item-media-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 220px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          gap: 16px;
          color: rgba(255, 255, 255, 0.5);
          font-size: var(--fs-13);
        }

        .media-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(var(--accent-color-rgb), 0.1);
          border-top-color: var(--accent-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          filter: drop-shadow(0 0 8px var(--accent-color));
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .store-item-media-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 16px;
          max-width: 480px;
        }

        .media-grid-card {
          width: 100%;
          aspect-ratio: 4 / 3;
          max-height: 150px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: #000;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .media-grid-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(var(--accent-color-rgb), 0.3);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-color-rgb), 0.15);
        }

        .grid-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.3s ease;
        }

        .media-grid-card:hover .grid-card-img {
          opacity: 0.85;
        }

        .grid-video-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .grid-card-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .grid-video-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ef4444;
          color: #fff;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: var(--fs-9);
          padding: 3px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          z-index: 2;
        }

        /* --- More Card Overlay Styled to be Translucent --- */
        .more-card {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }

        .more-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.68); /* Sleek glassmorphic translucent dark slate */
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .more-card:hover .more-card-overlay {
          background: rgba(15, 23, 42, 0.45); /* Reveals more of the 4th picture on hover */
          backdrop-filter: blur(1.5px);
          -webkit-backdrop-filter: blur(1.5px);
        }

        .more-card-overlay span {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: var(--fs-15);
          letter-spacing: 2px;
          color: #ffffff; /* White text for great readability over dark/translucent imagery */
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8), 0 0 12px rgba(var(--accent-color-rgb), 0.4);
          text-transform: uppercase;
        }

        .store-item-media-empty {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          color: rgba(255, 255, 255, 0.3);
          font-size: var(--fs-13);
        }

        /* --- Fullscreen Lightbox Modal --- */
        .media-lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 5, 8, 0.92);
          backdrop-filter: blur(25px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.25s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lightbox-close-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
          transform: rotate(90deg);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10005;
        }

        .lightbox-nav-btn:hover {
          background: rgba(var(--accent-color-rgb), 0.15);
          border-color: var(--accent-color);
          color: #fff;
          box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.3);
        }

        .lightbox-nav-btn.prev {
          left: 30px;
        }

        .lightbox-nav-btn.next {
          right: 30px;
        }

        .lightbox-content {
          max-width: 82%;
          max-height: 82%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        }

        .lightbox-counter {
          color: rgba(255, 255, 255, 0.4);
          font-family: var(--font-display);
          font-size: var(--fs-13);
          font-weight: 700;
          margin-top: 16px;
          letter-spacing: 1.5px;
        }

        .store-item-right {
          display: flex;
          flex-direction: column;
        }

        .store-item-ownership-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .owned-check {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--accent-color);
          font-family: var(--font-display);
          font-size: var(--fs-13);
          font-weight: 700;
          letter-spacing: 1px;
        }

        .exe-linked-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: var(--fs-11);
          color: rgba(255, 255, 255, 0.5);
          font-family: monospace;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          padding: 8px 12px;
          word-break: break-all;
        }

        .exe-not-linked {
          font-size: var(--fs-12);
          color: rgba(255, 175, 46, 0.7);
          font-weight: 500;
          text-align: center;
          padding: 8px;
          background: rgba(255, 175, 46, 0.04);
          border: 1px dashed rgba(255, 175, 46, 0.15);
          border-radius: 8px;
        }

        .store-item-actions {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .store-item-actions .glow-btn {
          flex: 1;
          font-size: var(--fs-11);
          padding: 10px 12px;
        }

        .exe-input-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .exe-input {
          font-family: monospace;
          font-size: var(--fs-11);
          width: 100%;
        }

        .exe-input-actions {
          display: flex;
          gap: 8px;
        }

        .exe-input-actions .glow-btn {
          flex: 1;
          font-size: var(--fs-11);
          padding: 8px 12px;
        }

        .store-item-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin: 4px 0;
        }

        .remove-owned-btn {
          width: 100%;
          padding: 10px;
          font-size: var(--fs-11);
          color: rgba(255, 255, 255, 0.4) !important;
          border-color: rgba(255, 255, 255, 0.06) !important;
        }

        .remove-owned-btn:hover {
          color: #ef4444 !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
          background: rgba(239, 68, 68, 0.08) !important;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.15) !important;
        }

        .not-owned-label {
          text-align: center;
          font-size: var(--fs-13);
          color: rgba(255, 255, 255, 0.4);
          padding: 10px 0;
        }

        .mark-owned-btn {
          width: 100%;
          padding: 14px;
          font-size: var(--fs-13);
        }

        .owned-hint {
          font-size: var(--fs-11);
          color: rgba(255, 255, 255, 0.25);
          text-align: center;
          line-height: 1.5;
        }
      `}} />
    </div>
  );
}
