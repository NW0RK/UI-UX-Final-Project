import React, { useRef } from 'react';
import { BadgePercent, Check, Flame, Search, ShoppingCart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { getSteamReviewScore } from '../utils/steamReviews';
import { getProtonDbSummary } from '../utils/protondb';

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
  igdbSearchStatus = 'idle',
  igdbSearchError = null,
  onPrefetchItem = () => {},
  protonDbEnabled = false
}) {
  const pointerFocusItemIdRef = useRef(null);
  const normalizedQuery = searchQuery.toLowerCase();
  const hasSearch = normalizedQuery.trim().length > 0;
  const filtered = catalog.filter(g =>
    g.title?.toLowerCase().includes(normalizedQuery) ||
    g.developer?.toLowerCase().includes(normalizedQuery) ||
    g.genre?.toLowerCase().includes(normalizedQuery)
  );

  const ownedIds = new Set(ownedGames.map(g => g.id));
  const ownedIgdbIds = new Set(ownedGames.map(g => g.igdbId).filter(Boolean));
  const ownedRawgIds = new Set(ownedGames.map(g => g.rawgId).filter(Boolean));
  const ownedItadIds = new Set(ownedGames.map(g => g.itadId).filter(Boolean));
  const ownedCheapSharkIds = new Set(ownedGames.map(g => g.cheapsharkGameId).filter(Boolean));
  const ownedSteamAppIds = new Set(ownedGames.map(g => String(g.steamAppId || '')).filter(Boolean));
  const isSearchingIgdb = igdbSearchStatus === 'loading' && searchQuery.trim().length >= 3;
  const visiblePopularGames = dealGames.length > 0
    ? popularGames.slice(0, dealGames.length)
    : popularGames;

  const handleItemClick = (item) => {
    audioEngine.playClickPulse();
    onSelectItem(item);
  };


  const handleItemPreview = (item) => {
    audioEngine.playHoverTick();
    onPrefetchItem(item);
  };

  const getItemPointerKey = (item) => `${item.source || 'store'}-${item.id}`;

  const handleItemPointerDown = (item) => {
    pointerFocusItemIdRef.current = getItemPointerKey(item);
  };

  const handleItemFocus = (item) => {
    const pointerKey = getItemPointerKey(item);
    if (pointerFocusItemIdRef.current === pointerKey) {
      pointerFocusItemIdRef.current = null;
      return;
    }

    handleItemPreview(item);
  };

  const isOwned = (item) => (
    ownedIds.has(item.id) ||
    (item.igdbId && ownedIgdbIds.has(item.igdbId)) ||
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
      <div className="store-card-image-vignette" aria-hidden="true" />
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
    const protonSummary = protonDbEnabled ? getProtonDbSummary(item.protonDbSummary) : null;
    const renderProtonBadge = () => protonDbEnabled && protonSummary ? (
      <div className="store-protondb-meta">
        <span>Linux</span>
        <strong className={`protondb-tier ${protonSummary.className}`}>{protonSummary.label}</strong>
      </div>
    ) : null;

    if (deal) {
      return (
        <div className="store-deal-meta">
          <span className="store-meta-label">Best price</span>
          <div className="store-price-row">
            <strong>{deal.price}</strong>
            {deal.regular && <span>{deal.regular}</span>}
            {Number(deal.cut) > 0 && <em>-{deal.cut}%</em>}
          </div>
          {renderProtonBadge()}
        </div>
      );
    }

    const reviewScore = item.steamReviewScore ? getSteamReviewScore(item.steamReviewScore) : null;
    return (
      <div className="store-rating-meta">
        <span className="store-meta-label">Steam Reviews</span>
        <strong className={`steam-review-score ${reviewScore?.className || 'unavailable'}`}>
          {reviewScore?.label || (item.steamAppId ? 'Loading Steam Reviews' : 'Steam Match Pending')}
        </strong>
        {reviewScore?.source === 'steam' && reviewScore.totalReviews > 0 && (
          <small>{reviewScore.positivePercent}% of {reviewScore.totalReviews.toLocaleString()} reviews</small>
        )}
        {renderProtonBadge()}
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
      onPointerDown={() => handleItemPointerDown(item)}
      onClick={() => handleItemClick(item)}
      onMouseEnter={() => handleItemPreview(item)}
      onFocus={() => handleItemFocus(item)}
    >
      {renderImage(item)}
      <div className="store-feed-card-info">
        <div className="store-card-topline">
          {item.source === 'cheapshark' && <span className="store-source-chip deal">CheapShark</span>}
          {item.source === 'itad' && <span className="store-source-chip deal">ITAD</span>}
          {item.source === 'igdb' && <span className="store-source-chip">IGDB</span>}
          {(item.itadDeal?.shop || item.cheapsharkDeal?.shop) && <span className="store-shop-chip">{item.itadDeal?.shop || item.cheapsharkDeal?.shop}</span>}
        </div>
        <div className="store-card-title">{item.title}</div>
        {item.source !== 'igdb' && item.source !== 'itad' && item.source !== 'cheapshark' && <div className="store-card-developer">{item.developer}</div>}
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
      onPointerDown={() => handleItemPointerDown(item)}
      onClick={() => handleItemClick(item)}
      onMouseEnter={() => handleItemPreview(item)}
      onFocus={() => handleItemFocus(item)}
    >
      {renderImage(item)}
      <div className="store-card-info">
        <div className="store-card-topline">
          {item.source === 'cheapshark' && <span className="store-source-chip deal">CheapShark</span>}
          {item.source === 'itad' && <span className="store-source-chip deal">ITAD</span>}
          {item.source === 'igdb' && <span className="store-source-chip">IGDB</span>}
          {(item.itadDeal?.shop || item.cheapsharkDeal?.shop) && <span className="store-shop-chip">{item.itadDeal?.shop || item.cheapsharkDeal?.shop}</span>}
        </div>
        <div className="store-card-title">{item.title}</div>
        {item.source !== 'igdb' && item.source !== 'itad' && item.source !== 'cheapshark' && <div className="store-card-developer">{item.developer}</div>}
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
            ? `${filtered.length} result${filtered.length === 1 ? '' : 's'}${isSearchingIgdb ? ' - searching IGDB' : ''}`
            : 'IGDB PopScore, ITAD, and CheapShark deals'}
        </span>
      </div>

      {igdbSearchError && hasSearch && (
        <div className="store-search-note">
          Discovery search unavailable: {igdbSearchError}
        </div>
      )}

      {hasSearch ? (
        <>
          {filtered.length === 0 && (
            <div className="store-empty">
              <Search size={18} />
              <span>{isSearchingIgdb ? 'Searching IGDB...' : 'No titles match your search.'}</span>
            </div>
          )}
          <div className="store-grid">
            {filtered.map(renderSearchCard)}
          </div>
        </>
      ) : (
        <div className="store-split-layout">
          <section className="store-feed-column" aria-label="Popular video games from IGDB">
            <div className="store-feed-heading">
              <div>
                <span className="store-feed-kicker">IGDB</span>
                <div className="store-feed-title-row">
                  <h2>Trending Video Games</h2>
                  <Flame size={18} />
                </div>
              </div>
            </div>
            <div className="store-feed-list">
              {visiblePopularGames.length > 0
                ? visiblePopularGames.map((item, index) => renderFeedCard(item, index, 'popular'))
                : renderStatus(popularStatus, popularError, 'IGDB PopScore games will appear here when the feed is available.', 'IGDB')}
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
          grid-template-columns: repeat(auto-fit, minmax(184px, 1fr));
          align-content: start;
          gap: 18px;
          min-height: 260px;
          padding-top: 8px;
        }

        .store-feed-card {
          position: relative;
          min-width: 0;
          min-height: 306px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.014)),
            var(--panel-bg);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 14px 34px rgba(0, 0, 0, 0.22);
          cursor: pointer;
          transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
        }

        .store-feed-card:hover,
        .store-feed-card:focus-visible,
        .store-card:hover,
        .store-card:focus-visible {
          z-index: 5;
          transform: translateY(-3px);
          border-color: rgba(var(--accent-color-rgb), 0.34);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 16px 38px rgba(0, 0, 0, 0.46), 0 0 24px rgba(var(--accent-color-rgb), 0.1);
          background:
            linear-gradient(180deg, rgba(var(--accent-color-rgb), 0.075), rgba(255, 255, 255, 0.018)),
            var(--panel-bg);
        }

        .store-feed-card.owned,
        .store-card.owned {
          border-color: rgba(var(--accent-color-rgb), 0.2);
        }

        .store-feed-card.deal-card {
          background:
            linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.09), rgba(255, 255, 255, 0.018) 54%, rgba(0, 0, 0, 0.12)),
            var(--panel-bg);
        }

        .store-card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.055);
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.28);
        }

        .store-feed-card .store-card-image-wrapper {
          aspect-ratio: 16 / 10;
          border-radius: 8px 8px 0 0;
          border-width: 0 0 1px;
        }

        .store-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease, filter 0.35s ease;
        }

        .store-card-image-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0) 36%, rgba(0, 0, 0, 0.4) 100%),
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.12), transparent 48%);
          opacity: 0.82;
          transition: opacity var(--transition-fast);
        }

        .store-card-image-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          background:
            radial-gradient(circle at 50% 18%, rgba(var(--accent-color-rgb), 0.22), transparent 42%),
            linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.12), rgba(7, 7, 10, 0.94));
          color: rgba(255, 255, 255, 0.72);
          font-family: var(--font-display);
          font-size: var(--fs-10);
          font-weight: 900;
          letter-spacing: 0.8px;
          text-align: center;
          text-transform: uppercase;
        }

        .store-feed-card:hover .store-card-image,
        .store-feed-card:focus-visible .store-card-image,
        .store-card:hover .store-card-image,
        .store-card:focus-visible .store-card-image {
          transform: scale(1.05);
          filter: brightness(1.08) saturate(1.08);
        }

        .store-feed-card:hover .store-card-image-vignette,
        .store-feed-card:focus-visible .store-card-image-vignette,
        .store-card:hover .store-card-image-vignette,
        .store-card:focus-visible .store-card-image-vignette {
          opacity: 0.58;
        }

        .store-owned-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(var(--accent-color-rgb), 0.92);
          color: #07070a;
          padding: 4px 7px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: var(--fs-9);
          font-weight: 800;
          font-family: var(--font-display);
          letter-spacing: 0.5px;
          z-index: 5;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.32), 0 0 14px rgba(var(--accent-color-rgb), 0.18);
        }

        .store-feed-card-info,
        .store-card-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .store-feed-card-info {
          flex: 1;
          padding: 13px;
        }

        .store-card-topline {
          min-height: 22px;
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          overflow: hidden;
        }

        .store-source-chip,
        .store-shop-chip {
          min-width: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          max-width: 100%;
          min-height: 20px;
          padding: 3px 7px;
          border-radius: 8px;
          border: 1px solid rgba(var(--accent-color-rgb), 0.2);
          color: rgba(255, 255, 255, 0.76);
          background: rgba(7, 7, 10, 0.64);
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
          background: rgba(var(--accent-color-rgb), 0.08);
        }

        .store-shop-chip {
          flex: 0 1 auto;
          color: rgba(255, 255, 255, 0.44);
          text-transform: none;
        }

        .store-card-title {
          font-family: var(--font-sans);
          font-weight: 850;
          font-size: var(--fs-13);
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
          letter-spacing: 0;
        }

        .store-feed-card .store-card-title {
          display: -webkit-box;
          white-space: normal;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: var(--fs-14);
          line-height: 1.22;
          min-height: calc(var(--fs-14) * 1.22);
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
          gap: 4px;
          margin-top: auto;
          min-width: 0;
          width: 100%;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.055);
        }

        .store-meta-label {
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

        .store-protondb-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          max-width: 100%;
          min-width: 0;
          color: rgba(255, 255, 255, 0.42);
          font-size: var(--fs-9);
          font-weight: 800;
          text-transform: uppercase;
        }

        .store-protondb-meta span {
          color: rgba(255, 255, 255, 0.34);
        }

        .store-deal-meta {
          gap: 5px;
        }

        .store-price-row {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 7px;
          min-width: 0;
          max-width: 100%;
        }

        .store-price-row strong {
          color: #fff;
          font-size: var(--fs-17);
          font-weight: 900;
          line-height: 1;
        }

        .store-price-row span {
          color: rgba(255, 255, 255, 0.34);
          font-size: var(--fs-11);
          font-weight: 700;
          text-decoration: line-through;
        }

        .store-price-row em {
          display: inline-flex;
          align-items: center;
          min-height: 19px;
          padding: 2px 6px;
          border-radius: 7px;
          background: rgba(var(--accent-color-rgb), 0.1);
          border: 1px solid rgba(var(--accent-color-rgb), 0.18);
          color: var(--accent-color);
          font-family: var(--font-display);
          font-size: var(--fs-11);
          font-style: normal;
          font-weight: 900;
          line-height: 1;
        }

        .steam-review-score {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: var(--fs-10);
          font-weight: 800;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          line-height: 1.25;
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

        .protondb-tier {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        .protondb-tier.platinum { color: #a8f3ff; }
        .protondb-tier.gold { color: #ffd166; }
        .protondb-tier.silver { color: #d9e2ec; }
        .protondb-tier.bronze { color: #d39b62; }
        .protondb-tier.borked { color: #ef4444; }
        .protondb-tier.unavailable { color: rgba(255, 255, 255, 0.42); }

        .store-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 18px;
          padding-top: 8px;
        }

        .store-card {
          position: relative;
          min-width: 0;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.012)),
            var(--panel-bg);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 14px 34px rgba(0, 0, 0, 0.2);
          transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
          display: flex;
          flex-direction: column;
        }

        .store-card-info {
          padding: 13px;
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
