import React from 'react';
import { Check, Search } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { getSteamReviewScore } from '../utils/steamReviews';

export default function SearchResultsPage({
  query,
  results,
  ownedGames,
  rawgSearchStatus = 'idle',
  rawgSearchError = null,
  onSelectItem,
  onSelectLibraryGame,
  onLaunchGame
}) {
  const ownedIds = new Set(ownedGames.map(game => game.id));
  const ownedRawgIds = new Set(ownedGames.map(game => game.rawgId).filter(Boolean));
  const isSearching = rawgSearchStatus === 'loading' && query.trim().length >= 3;

  const isOwned = (item) => (
    ownedIds.has(item.id) || (item.rawgId && ownedRawgIds.has(item.rawgId))
  );

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

  const renderSourceBadge = (item) => {
    if (item.resultType === 'library') return <span className="search-source-chip owned">Library</span>;
    if (item.source === 'rawg') {
      return <span className="search-source-chip">Discovery</span>;
    }
    return <span className="search-source-chip">Store</span>;
  };

  return (
    <div className="search-results-viewport">
      <div className="search-results-header">
        <div>
          <span className="search-results-kicker">Search</span>
          <h1>{query.trim() ? `Results for "${query.trim()}"` : 'Search Games'}</h1>
        </div>
        <span className="search-results-count">
          {isSearching ? 'Searching discovery...' : `${results.length} result${results.length === 1 ? '' : 's'}`}
        </span>
      </div>

      {rawgSearchError && (
        <div className="search-results-note">Discovery search unavailable: {rawgSearchError}</div>
      )}

      {results.length === 0 ? (
        <div className="search-results-empty">
          <Search size={22} />
          <span>{isSearching ? 'Searching discovery...' : 'No games matched your search.'}</span>
        </div>
      ) : (
        <div className="search-results-grid">
          {results.map((item, index) => {
            const reviewScore = getSteamReviewScore(item.steamReviewScore || item.rating);
            const owned = isOwned(item);
            return (
              <div
                key={`${item.resultType || item.source || 'item'}-${item.id}`}
                className={`search-result-card ${owned ? 'owned' : ''}`}
                role="button"
                tabIndex={0}
                data-controller-confirm-label={`View ${item.title}`}
                data-controller-default={index === 0 ? 'true' : undefined}
                onClick={() => handleResultClick(item)}
                onFocus={audioEngine.playHoverTick}
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
                </div>
                <div className="search-result-body">
                  <div className="search-card-topline">{renderSourceBadge(item)}</div>
                  <h2>{item.title}</h2>
                  <p>{item.developer || 'Unknown Developer'}</p>
                  <div className="search-result-meta">
                    <span>{item.genre || 'Game'}</span>
                    <span>{item.releaseDate || 'TBA'}</span>
                    {item.ageRating && <span>{item.ageRating}</span>}
                  </div>
                  <div className="search-result-rating">
                    <span>{item.source === 'rawg' ? 'Community Rating' : 'Rating'}</span>
                    <strong className={`steam-review-score ${reviewScore.className}`}>{reviewScore.label}</strong>
                  </div>
                  {item.resultType === 'library' && (
                    <button
                      type="button"
                      className="search-launch-btn"
                      onClick={(event) => handleLaunchClick(event, item)}
                    >
                      Play
                    </button>
                  )}
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
          padding: 30px 0 40px;
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
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 18px;
        }

        .search-result-card {
          min-width: 0;
          display: grid;
          grid-template-columns: 92px minmax(0, 1fr);
          gap: 14px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.025);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .search-result-card:hover,
        .search-result-card:focus-visible {
          transform: translateY(-3px);
          border-color: rgba(var(--accent-color-rgb), 0.28);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.42), 0 0 20px rgba(var(--accent-color-rgb), 0.08);
          background: rgba(var(--accent-color-rgb), 0.035);
          outline: none;
        }

        .search-result-card.owned {
          border-color: rgba(var(--accent-color-rgb), 0.12);
        }

        .search-result-art {
          position: relative;
          height: 128px;
          overflow: hidden;
          border-radius: 6px;
          background: linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.14), rgba(7, 7, 10, 0.94));
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.68);
          font-family: var(--font-display);
          font-size: var(--fs-10);
          font-weight: 900;
          letter-spacing: 0.8px;
          text-align: center;
          text-transform: uppercase;
        }

        .search-result-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .search-owned-badge {
          position: absolute;
          top: 7px;
          right: 7px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 7px;
          border-radius: 8px;
          background: rgba(var(--accent-color-rgb), 0.9);
          color: #07070a;
          font-family: var(--font-display);
          font-size: var(--fs-9);
          font-weight: 900;
        }

        .search-result-body {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .search-card-topline,
        .search-result-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          min-width: 0;
        }

        .search-source-chip,
        .search-result-meta span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          max-width: 100%;
          padding: 3px 7px;
          border-radius: 8px;
          border: 1px solid rgba(var(--accent-color-rgb), 0.2);
          color: rgba(255, 255, 255, 0.7);
          background: rgba(7, 7, 10, 0.48);
          font-family: var(--font-display);
          font-size: var(--fs-8);
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }

        .search-source-chip.owned {
          color: var(--accent-color);
        }

        .search-result-body h2 {
          margin: 0;
          color: #fff;
          font-size: var(--fs-15);
          font-weight: 850;
          letter-spacing: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .search-result-body p {
          margin: 0;
          color: rgba(255, 255, 255, 0.42);
          font-size: var(--fs-11);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .search-result-rating {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
          margin-top: auto;
        }

        .search-result-rating span {
          color: rgba(255, 255, 255, 0.32);
          font-family: var(--font-display);
          font-size: var(--fs-8);
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .steam-review-score {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: var(--fs-11);
          font-weight: 800;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

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

        .search-launch-btn {
          width: fit-content;
          margin-top: 4px;
          border: 1px solid rgba(var(--accent-color-rgb), 0.28);
          border-radius: 8px;
          background: rgba(var(--accent-color-rgb), 0.12);
          color: var(--accent-color);
          padding: 5px 12px;
          font-size: var(--fs-10);
          font-weight: 800;
          cursor: pointer;
        }

        .search-results-empty {
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.045);
          background: rgba(255, 255, 255, 0.018);
          color: rgba(255, 255, 255, 0.36);
          font-size: var(--fs-13);
          font-weight: 700;
        }

        @media (max-width: 620px) {
          .search-results-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .search-result-card {
            grid-template-columns: 78px minmax(0, 1fr);
            gap: 10px;
          }

          .search-result-art {
            height: 112px;
          }
        }
      `}} />
    </div>
  );
}
