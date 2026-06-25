import React, { useCallback, useMemo, useRef } from 'react';
import { Check, Search } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { getSteamReviewScore } from '../utils/steamReviews';
import { getProtonDbSummary } from '../utils/protondb';

export default function SearchResultsPage({
  query,
  results,
  ownedGames,
  igdbSearchStatus = 'idle',
  igdbSearchError = null,
  onSelectItem,
  onPrefetchItem = () => {},
  onSelectLibraryGame,
  onLaunchGame,
  protonDbEnabled = false
}) {
  const pointerFocusResultIdRef = useRef(null);
  const ownedLookups = useMemo(() => ({
    ids: new Set(ownedGames.map(game => game.id)),
    igdbIds: new Set(ownedGames.map(game => game.igdbId).filter(Boolean)),
    rawgIds: new Set(ownedGames.map(game => game.rawgId).filter(Boolean))
  }), [ownedGames]);
  const isSearching = igdbSearchStatus === 'loading' && query.trim().length >= 3;

  const isOwned = useCallback((item) => (
    ownedLookups.ids.has(item.id) ||
    (item.igdbId && ownedLookups.igdbIds.has(item.igdbId)) ||
    (item.rawgId && ownedLookups.rawgIds.has(item.rawgId))
  ), [ownedLookups]);

  const handleResultClick = (item) => {
    audioEngine.playClickPulse();
    if (item.resultType === 'library') {
      onSelectLibraryGame(item);
      return;
    }
    onSelectItem(item);
  };

  const handleLaunchClick = (event, item) => {
    event.stopPropagation();
    audioEngine.playClickPulse();
    onLaunchGame(item);
  };

  const handleResultPreview = (item) => {
    audioEngine.playHoverTick();
    if (item.resultType !== 'library') {
      onPrefetchItem(item);
    }
  };

  const getResultPointerKey = (item) => `${item.resultType || item.source || 'item'}-${item.id}`;

  const handleResultPointerDown = (item) => {
    pointerFocusResultIdRef.current = getResultPointerKey(item);
  };

  const handleResultFocus = (item) => {
    const pointerKey = getResultPointerKey(item);
    if (pointerFocusResultIdRef.current === pointerKey) {
      pointerFocusResultIdRef.current = null;
      return;
    }

    handleResultPreview(item);
  };

  return (
    <div className="search-results-viewport">
      <div className="search-results-header">
        <div>
          <span className="search-results-kicker">Search</span>
          <h1>{query.trim() ? `Results for "${query.trim()}"` : 'Search Games'}</h1>
        </div>
        <span className="search-results-count">
          {isSearching ? 'Searching IGDB...' : `${results.length} result${results.length === 1 ? '' : 's'}`}
        </span>
      </div>

      {igdbSearchError && (
        <div className="search-results-note">Discovery search unavailable: {igdbSearchError}</div>
      )}

      {results.length === 0 ? (
        <div className="search-results-empty">
          <Search size={22} />
          <span>{isSearching ? 'Searching IGDB...' : 'No games matched your search.'}</span>
        </div>
      ) : (
        <div className="search-results-grid">
          {results.map((item, index) => {
            const reviewScore = getSteamReviewScore(item.steamReviewScore || item.rating);
            const protonSummary = protonDbEnabled ? getProtonDbSummary(item.protonDbSummary) : null;
            const owned = isOwned(item);
            return (
              <div
                key={`${item.resultType || item.source || 'item'}-${item.id}`}
                className={`search-result-card ${owned ? 'owned' : ''}`}
                role="button"
                tabIndex={0}
                data-controller-item="true"
                data-controller-confirm-label={`View ${item.title}`}
                data-controller-default={index === 0 ? 'true' : undefined}
                onPointerDown={() => handleResultPointerDown(item)}
                onClick={() => handleResultClick(item)}
                onMouseEnter={() => handleResultPreview(item)}
                onFocus={() => handleResultFocus(item)}
              >
                <div className="search-result-art">
                  {item.coverUrl ? (
                    <img src={item.coverUrl} alt={item.title} loading="lazy" />
                  ) : (
                    <span>{item.title}</span>
                  )}
                  {owned && (
                    <div className="search-owned-badge">
                      <Check size={12} />
                      Owned
                    </div>
                  )}
                  {item.resultType === 'library' && (
                    <button
                      type="button"
                      className="search-launch-btn-overlay"
                      onClick={(event) => handleLaunchClick(event, item)}
                      data-controller-nested="true"
                      data-controller-confirm-label={`Play ${item.title}`}
                    >
                      Play Now
                    </button>
                  )}
                </div>
                <div className="search-result-body">
                  <h2>{item.title}</h2>
                  <p>{item.developer || 'Unknown Developer'}</p>
                  <p className="search-result-release">{item.releaseDate ? item.releaseDate.split('-')[0] : 'TBA'}</p>
                  <div className="search-result-meta">
                    {item.genre ? (
                      item.genre.split(',').map((g, i) => (
                        <span key={`genre-${i}`}>{g.trim()}</span>
                      ))
                    ) : (
                      <span>Game</span>
                    )}
                    {item.ageRating && <span>{item.ageRating}</span>}
                  </div>
                  <div className="search-result-rating">
                    <strong className={`steam-review-score ${reviewScore.className}`}>{reviewScore.label}</strong>
                    {protonSummary && (
                      <span className="search-protondb-badge">
                        Linux <strong className={`protondb-tier ${protonSummary.className}`}>{protonSummary.label}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .search-results-viewport {
          flex: 1;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 30px 8px 40px;
        }

        .search-results-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
          padding-right: 10px;
        }

        .search-results-kicker {
          display: block;
          margin-bottom: 6px;
          color: rgba(var(--accent-color-rgb), 0.82);
          font-family: var(--font-display);
          font-size: var(--fs-10);
          font-weight: 900;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .search-results-header h1 {
          margin: 0;
          color: #fff;
          font-family: var(--font-display);
          font-size: var(--fs-22);
          font-weight: 900;
          letter-spacing: 1px;
        }

        .search-results-count,
        .search-results-note {
          color: rgba(255, 255, 255, 0.42);
          font-size: var(--fs-12);
          font-weight: 700;
        }

        .search-results-note {
          margin: -12px 0 18px;
        }

        .search-results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
          padding: 10px 8px 16px;
        }

        .search-result-card {
          display: flex;
          flex-direction: column;
          position: relative;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .search-result-card:hover,
        .search-result-card:focus-visible,
        body.controller-navigation-active .search-result-card:focus {
          z-index: 5;
          transform: translateY(-6px);
          border-color: rgba(var(--accent-color-rgb), 0.4);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-color-rgb), 0.15);
          outline: none;
        }

        .search-result-card.owned {
          border-color: rgba(var(--accent-color-rgb), 0.2);
        }

        .search-result-art {
          position: relative;
          aspect-ratio: 3 / 4;
          width: 100%;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.4);
          font-family: var(--font-display);
          font-size: var(--fs-12);
          font-weight: 800;
          text-align: center;
          padding: 20px;
          overflow: hidden;
        }

        .search-result-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .search-result-card:hover .search-result-art img,
        body.controller-navigation-active .search-result-card:focus .search-result-art img {
          transform: scale(1.05);
        }

        .search-owned-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          background: var(--accent-color);
          color: #000;
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          z-index: 2;
        }
        
        .search-launch-btn-overlay {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          opacity: 0;
          border: none;
          border-radius: 20px;
          background: var(--accent-color);
          color: #000;
          padding: 8px 16px;
          font-family: var(--font-display);
          font-size: var(--fs-11);
          font-weight: 900;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }

        .search-result-card:hover .search-launch-btn-overlay,
        .search-result-card:focus-within .search-launch-btn-overlay,
        body.controller-navigation-active .search-result-card:focus .search-launch-btn-overlay {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        
        .search-launch-btn-overlay:hover {
          background: #fff;
        }

        .search-result-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          background: linear-gradient(to top, rgba(10,10,15,0.95), rgba(10,10,15,0.8));
        }

        .search-result-body h2 {
          margin: 0;
          color: #fff;
          font-size: var(--fs-15);
          font-weight: 850;
          letter-spacing: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .search-result-body p {
          margin: 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: var(--fs-11);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .search-result-body p.search-result-release {
          color: var(--accent-color);
          font-weight: 800;
          font-family: var(--font-display);
          font-size: var(--fs-10);
          margin-top: 2px;
          text-transform: uppercase;
        }

        .search-result-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }

        .search-result-meta span {
          display: inline-flex;
          align-items: center;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(var(--accent-color-rgb), 0.15);
          color: var(--accent-color);
          font-family: var(--font-display);
          font-size: var(--fs-9);
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .search-result-rating {
          margin-top: auto;
          padding-top: 12px;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
          gap: 7px;
        }

        .steam-review-score {
          font-size: var(--fs-11);
          font-weight: 900;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .search-protondb-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: rgba(255, 255, 255, 0.42);
          font-size: var(--fs-9);
          font-weight: 850;
          text-transform: uppercase;
        }

        .protondb-tier {
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        .protondb-tier.platinum { color: #a8f3ff; }
        .protondb-tier.gold { color: #ffd166; }
        .protondb-tier.silver { color: #d9e2ec; }
        .protondb-tier.bronze { color: #d39b62; }
        .protondb-tier.borked { color: #ef4444; }
        .protondb-tier.unavailable { color: rgba(255, 255, 255, 0.42); }

        .steam-review-score.overwhelmingly-positive,
        .steam-review-score.very-positive,
        .steam-review-score.mostly-positive {
          color: #66c0f4;
        }

        .steam-review-score.mixed {
          color: #b8b22a;
        }

        .steam-review-score.mostly-negative,
        .steam-review-score.very-negative,
        .steam-review-score.overwhelmingly-negative {
          color: #ef4444;
        }

        .search-results-empty {
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 12px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.018);
          color: rgba(255, 255, 255, 0.36);
          font-size: var(--fs-13);
          font-weight: 700;
        }

        @media (max-width: 620px) {
          .search-results-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 16px;
          }
          
          .search-result-body h2 {
            font-size: var(--fs-13);
          }
        }
      `}} />
    </div>
  );
}
