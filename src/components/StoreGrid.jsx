import React from 'react';
import { BadgePercent, Check, Flame, Search, ShoppingCart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { getSteamReviewScore } from '../utils/steamReviews';

export default function StoreGrid({
  catalog,
  popularGames = [],
  dealGames = [],
  ownedGames,
  onSelectItem,
  searchQuery,
  popularStatus = 'idle',
  popularError = null,
  dealsStatus = 'idle',
  dealsError = null,
  rawgSearchStatus = 'idle',
  rawgSearchError = null,
  onPrefetchItem = () => {}
}) {
  const normalizedQuery = searchQuery.toLowerCase();
  const hasSearch = normalizedQuery.trim().length > 0;
  const filtered = catalog.filter(g =>
    g.title?.toLowerCase().includes(normalizedQuery) ||
    g.developer?.toLowerCase().includes(normalizedQuery) ||
    g.genre?.toLowerCase().includes(normalizedQuery)
  );

  const ownedIds = new Set(ownedGames.map(g => g.id));
  const ownedRawgIds = new Set(ownedGames.map(g => g.rawgId).filter(Boolean));
  const ownedItadIds = new Set(ownedGames.map(g => g.itadId).filter(Boolean));
  const ownedCheapSharkIds = new Set(ownedGames.map(g => g.cheapsharkGameId).filter(Boolean));
  const ownedSteamAppIds = new Set(ownedGames.map(g => String(g.steamAppId || '')).filter(Boolean));
  const isSearchingRawg = rawgSearchStatus === 'loading' && searchQuery.trim().length >= 3;

  const handleItemClick = (item) => {
    audioEngine.playClickPulse();
    onSelectItem(item);
  };

  const handleItemPreview = (item) => {
    audioEngine.playHoverTick();
    onPrefetchItem(item);
  };

  const isOwned = (item) => (
    ownedIds.has(item.id) ||
    (item.rawgId && ownedRawgIds.has(item.rawgId)) ||
    (item.itadId && ownedItadIds.has(item.itadId)) ||
    (item.cheapsharkGameId && ownedCheapSharkIds.has(item.cheapsharkGameId)) ||
    (item.steamAppId && ownedSteamAppIds.has(String(item.steamAppId)))
  );

  const renderImage = (item) => (
    <div className="store-card-image-wrapper">
      {item.coverUrl ? (
        <img src={item.coverUrl} alt={item.title} className="store-card-image" loading="lazy" />
      ) : (
        <div className="store-card-image store-card-image-placeholder">
          <span>{item.title}</span>
        </div>
      )}
      {isOwned(item) && (
        <div className="store-owned-badge">
          <Check size={12} />
          <span>Owned</span>
        </div>
      )}
    </div>
  );

  const renderMeta = (item) => {
    const deal = item.itadDeal || item.cheapsharkDeal;
    if (deal) {
      return (
        <div className="store-deal-meta">
          <strong>{deal.price}</strong>
          {deal.regular && <span>{deal.regular}</span>}
          {Number(deal.cut) > 0 && <em>-{deal.cut}%</em>}
        </div>
      );
    }

    const reviewScore = item.steamReviewScore ? getSteamReviewScore(item.steamReviewScore) : null;
    return (
      <div className="store-rating-meta">
        <span>Steam Reviews</span>
        <strong className={`steam-review-score ${reviewScore?.className || 'unavailable'}`}>
          {reviewScore?.label || (item.steamAppId ? 'Loading Steam Reviews' : 'Steam Match Pending')}
        </strong>
        {reviewScore?.source === 'steam' && reviewScore.totalReviews > 0 && (
          <small>{reviewScore.positivePercent}% of {reviewScore.totalReviews.toLocaleString()} reviews</small>
        )}
      </div>
    );
  };

  const renderFeedCard = (item, index, section) => (
    <div
      key={`${section}-${item.id}`}
      className={`store-feed-card ${isOwned(item) ? 'owned' : ''} ${item.itadDeal || item.cheapsharkDeal ? 'deal-card' : ''}`}
      role="button"
      tabIndex={0}
      data-controller-item="true"
      data-controller-confirm-label={`View ${item.title}`}
      data-controller-default={section === 'popular' && index === 0 ? 'true' : undefined}
      onClick={() => handleItemClick(item)}
      onMouseEnter={() => handleItemPreview(item)}
      onFocus={() => handleItemPreview(item)}
    >
      {renderImage(item)}
      <div className="store-feed-card-info">
        <div className="store-card-topline">
          {item.source === 'cheapshark' && <span className="store-source-chip deal">CheapShark</span>}
          {item.source === 'itad' && <span className="store-source-chip deal">ITAD</span>}
          {(item.itadDeal?.shop || item.cheapsharkDeal?.shop) && <span className="store-shop-chip">{item.itadDeal?.shop || item.cheapsharkDeal?.shop}</span>}
        </div>
        <div className="store-card-title">{item.title}</div>
        {item.source !== 'rawg' && <div className="store-card-developer">{item.developer}</div>}
        {renderMeta(item)}
      </div>
    </div>
  );

  const renderSearchCard = (item, index) => (
    <div
      key={item.id}
      className={`store-card ${isOwned(item) ? 'owned' : ''} ${item.source ? 'external-source' : ''}`}
      role="button"
      tabIndex={0}
      data-controller-item="true"
      data-controller-confirm-label={`View ${item.title}`}
      data-controller-default={index === 0 ? 'true' : undefined}
      onClick={() => handleItemClick(item)}
      onMouseEnter={() => handleItemPreview(item)}
      onFocus={() => handleItemPreview(item)}
    >
      {renderImage(item)}
      <div className="store-card-info">
        <div className="store-card-topline">
          {item.source === 'cheapshark' && <span className="store-source-chip deal">CheapShark</span>}
          {item.source === 'itad' && <span className="store-source-chip deal">ITAD</span>}
          {(item.itadDeal?.shop || item.cheapsharkDeal?.shop) && <span className="store-shop-chip">{item.itadDeal?.shop || item.cheapsharkDeal?.shop}</span>}
        </div>
        <div className="store-card-title">{item.title}</div>
        {item.source !== 'rawg' && <div className="store-card-developer">{item.developer}</div>}
        {renderMeta(item)}
      </div>
    </div>
  );

  const renderStatus = (status, error, emptyText, source) => {
    if (status === 'loading') {
      return <div className="store-feed-status">Loading {source}...</div>;
    }

    if (status === 'missing-key') {
      return <div className="store-feed-status">Add a price API key from a store item page to load live deals.</div>;
    }

    if (status === 'error') {
      return <div className="store-feed-status error">{source} unavailable: {error}</div>;
    }

    return <div className="store-feed-status">{emptyText}</div>;
  };

  return (
    <div className="store-viewport">
      <div className="store-header">
        <div className="store-header-left">
          <ShoppingCart size={20} className="store-header-icon" />
          <h1 className="store-title">Nexus Store</h1>
        </div>
        <span className="store-count">
          {hasSearch
            ? `${filtered.length} result${filtered.length === 1 ? '' : 's'}${isSearchingRawg ? ' - searching discovery' : ''}`
            : 'RAWG popularity, ITAD, and CheapShark deals'}
        </span>
      </div>

      {rawgSearchError && hasSearch && (
        <div className="store-search-note">
          Discovery search unavailable: {rawgSearchError}
        </div>
      )}

      {hasSearch ? (
        <>
          {filtered.length === 0 && (
            <div className="store-empty">
              <Search size={18} />
              <span>{isSearchingRawg ? 'Searching discovery...' : 'No titles match your search.'}</span>
            </div>
          )}
          <div className="store-grid">
            {filtered.map(renderSearchCard)}
          </div>
        </>
      ) : (
        <div className="store-split-layout">
          <section className="store-feed-column" aria-label="Popular video games from RAWG">
            <div className="store-feed-heading">
              <div>
                <span className="store-feed-kicker">RAWG</span>
                <div className="store-feed-title-row">
                  <h2>Popular Video Games</h2>
                  <Flame size={18} />
                </div>
              </div>
            </div>
            <div className="store-feed-list">
              {popularGames.length > 0
                ? popularGames.map((item, index) => renderFeedCard(item, index, 'popular'))
                : renderStatus(popularStatus, popularError, 'RAWG popular games will appear here when the feed is available.', 'RAWG')}
            </div>
          </section>

          <section className="store-feed-column" aria-label="Best deals from IsThereAnyDeal and CheapShark">
            <div className="store-feed-heading">
              <div>
                <span className="store-feed-kicker">IsThereAnyDeal & CheapShark</span>
                <div className="store-feed-title-row">
                  <h2>Best Deals</h2>
                  <BadgePercent size={18} />
                </div>
              </div>
            </div>
            <div className="store-feed-list">
              {dealGames.length > 0
                ? dealGames.map((item, index) => renderFeedCard(item, index, 'deals'))
                : renderStatus(dealsStatus, dealsError, 'Live deals will appear here when price services respond.', 'Deal feeds')}
            </div>
          </section>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .store-viewport {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 30px 0 40px 0;
          overflow-y: auto;
          height: 100%;
        }

        .store-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-right: 10px;
        }

        .store-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .store-header-icon,
        .store-feed-heading svg {
          color: var(--accent-color);
        }

        .store-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: var(--fs-22);
          letter-spacing: 3px;
          color: #fff;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .store-count {
          font-size: var(--fs-12);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.5px;
        }

        .store-split-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 24px;
          min-height: 0;
        }

        .store-feed-column {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .store-feed-column + .store-feed-column {
          padding-left: 24px;
          border-left: 3px solid rgba(var(--accent-color-rgb), 0.24);
        }

        .store-feed-heading {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          gap: 14px;
          padding: 0 4px 4px;
        }

        .store-feed-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .store-feed-kicker {
          display: block;
          margin-bottom: 5px;
          color: rgba(var(--accent-color-rgb), 0.82);
          font-family: var(--font-display);
          font-size: var(--fs-9);
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .store-feed-heading h2 {
          margin: 0;
          color: #fff;
          font-size: var(--fs-16);
          font-weight: 800;
          letter-spacing: 0;
        }

        .store-feed-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(176px, 1fr));
          align-content: start;
          gap: 16px;
          min-height: 260px;
        }

        .store-feed-card {
          min-height: 310px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.025);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .store-feed-card:hover,
        .store-card:hover {
          transform: translateY(-3px);
          border-color: rgba(var(--accent-color-rgb), 0.28);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.42), 0 0 20px rgba(var(--accent-color-rgb), 0.08);
          background: rgba(var(--accent-color-rgb), 0.035);
        }

        .store-feed-card.owned,
        .store-card.owned {
          border-color: rgba(var(--accent-color-rgb), 0.12);
        }

        .store-feed-card.deal-card {
          background: linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.05), rgba(255, 255, 255, 0.018));
        }

        .store-card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.2);
        }

        .store-feed-card .store-card-image-wrapper {
          aspect-ratio: 16 / 10;
          border-radius: 8px 8px 0 0;
        }

        .store-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .store-card-image-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          background: linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.14), rgba(7, 7, 10, 0.94));
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--font-display);
          font-size: var(--fs-10);
          font-weight: 900;
          letter-spacing: 0.8px;
          text-align: center;
          text-transform: uppercase;
        }

        .store-feed-card:hover .store-card-image,
        .store-card:hover .store-card-image {
          transform: scale(1.05);
        }

        .store-owned-badge {
          position: absolute;
          top: 7px;
          right: 7px;
          background: rgba(var(--accent-color-rgb), 0.9);
          color: #07070a;
          padding: 3px 7px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: var(--fs-9);
          font-weight: 800;
          font-family: var(--font-display);
          letter-spacing: 0.5px;
          z-index: 5;
        }

        .store-feed-card-info,
        .store-card-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .store-feed-card-info {
          flex: 1;
          padding: 12px;
        }

        .store-card-topline {
          min-height: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }

        .store-source-chip,
        .store-shop-chip {
          min-width: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          max-width: 100%;
          padding: 3px 7px;
          border-radius: 8px;
          border: 1px solid rgba(var(--accent-color-rgb), 0.22);
          color: rgba(255, 255, 255, 0.78);
          background: rgba(7, 7, 10, 0.55);
          font-family: var(--font-display);
          font-size: var(--fs-8);
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .store-source-chip.deal {
          color: var(--accent-color);
        }

        .store-shop-chip {
          color: rgba(255, 255, 255, 0.44);
          text-transform: none;
        }

        .store-card-title {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: var(--fs-13);
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        .store-feed-card .store-card-title {
          display: -webkit-box;
          white-space: normal;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: var(--fs-14);
          line-height: 1.2;
        }

        .store-card-developer {
          font-size: var(--fs-11);
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .store-rating-meta,
        .store-deal-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
          margin-top: auto;
          min-width: 0;
        }

        .store-rating-meta span {
          color: rgba(255, 255, 255, 0.32);
          font-family: var(--font-display);
          font-size: var(--fs-8);
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .store-rating-meta small {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgba(255, 255, 255, 0.36);
          font-size: var(--fs-9);
          font-weight: 600;
        }

        .store-deal-meta {
          flex-direction: row;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 7px;
        }

        .store-deal-meta strong {
          color: #fff;
          font-size: var(--fs-16);
          font-weight: 900;
        }

        .store-deal-meta span {
          color: rgba(255, 255, 255, 0.34);
          font-size: var(--fs-11);
          font-weight: 700;
          text-decoration: line-through;
        }

        .store-deal-meta em {
          color: var(--accent-color);
          font-family: var(--font-display);
          font-size: var(--fs-12);
          font-style: normal;
          font-weight: 900;
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

        .steam-review-score.unavailable {
          color: rgba(255, 255, 255, 0.42);
        }

        .store-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 20px;
        }

        .store-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
        }

        .store-card-info {
          padding: 12px;
          flex: 1;
        }

        .store-empty,
        .store-feed-status {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          gap: 8px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.045);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.36);
          background: rgba(255, 255, 255, 0.018);
          font-size: var(--fs-13);
          font-weight: 600;
          text-align: center;
        }

        .store-feed-status.error {
          color: rgba(255, 255, 255, 0.48);
          border-color: rgba(239, 68, 68, 0.25);
        }

        .store-search-note {
          margin: -12px 0 18px;
          color: rgba(255, 255, 255, 0.42);
          font-size: var(--fs-11);
          font-weight: 600;
        }

        @media (max-width: 980px) {
          .store-split-layout {
            grid-template-columns: 1fr;
          }

          .store-feed-column + .store-feed-column {
            padding-top: 22px;
            padding-left: 0;
            border-top: 3px solid rgba(var(--accent-color-rgb), 0.24);
            border-left: 0;
          }

          .store-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }
        }

        @media (max-width: 560px) {
          .store-feed-list {
            grid-template-columns: 1fr;
          }

          .store-feed-card {
            min-height: 0;
          }

          .store-feed-card .store-card-image-wrapper {
            aspect-ratio: 16 / 9;
          }

          .store-deal-meta strong {
            font-size: var(--fs-14);
          }
        }
      `}} />
    </div>
  );
}
