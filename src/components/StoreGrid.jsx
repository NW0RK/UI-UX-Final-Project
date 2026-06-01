import React from 'react';
import { ShoppingCart, Monitor, Gamepad2, Smartphone, Check, Star } from 'lucide-react';
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

export default function StoreGrid({ catalog, ownedGames, onSelectItem, searchQuery }) {
  const filtered = catalog.filter(g =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ownedIds = new Set(ownedGames.map(g => g.id));

  const handleItemClick = (item) => {
    audioEngine.playClickPulse();
    onSelectItem(item);
  };

  return (
    <div className="store-viewport">
      <div className="store-header">
        <div className="store-header-left">
          <ShoppingCart size={20} className="store-header-icon" />
          <h1 className="store-title">Nexus Store</h1>
        </div>
        <span className="store-count">{filtered.length} titles available</span>
      </div>

      {filtered.length === 0 && (
        <div className="store-empty">
          <span>No titles match your search.</span>
        </div>
      )}

      <div className="store-grid">
        {filtered.map((item, index) => {
          const isOwned = ownedIds.has(item.id);
          return (
            <div
              key={item.id}
              className={`store-card ${isOwned ? 'owned' : ''}`}
              role="button"
              tabIndex={0}
              data-controller-confirm-label={`View ${item.title}`}
              data-controller-default={index === 0 ? 'true' : undefined}
              onClick={() => handleItemClick(item)}
              onFocus={audioEngine.playHoverTick}
            >
              <div className="store-card-image-wrapper">
                {item.coverUrl ? (
                  <img src={item.coverUrl} alt={item.title} className="store-card-image" loading="lazy" />
                ) : (
                  <div className="store-card-image store-card-image-placeholder">
                    <span>{item.title}</span>
                  </div>
                )}
                {isOwned && (
                  <div className="store-owned-badge">
                    <Check size={12} />
                    <span>Owned</span>
                  </div>
                )}
                <div className="store-card-hover">
                  <span className="store-card-view-btn">View Game</span>
                </div>
              </div>
              <div className="store-card-info">
                <div className="store-card-title">{item.title}</div>
                <div className="store-card-developer">{item.developer}</div>
                <div className="store-card-platforms">
                  {item.platforms.map(p => (
                    <PlatformIcon key={p} platform={p} />
                  ))}
                </div>
                <div className="store-card-rating">
                  <Star size={10} fill="currentColor" />
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
          margin-bottom: 30px;
          padding-right: 10px;
        }

        .store-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .store-header-icon {
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

        .store-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          color: rgba(255, 255, 255, 0.3);
          font-size: var(--fs-14);
        }

        .store-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 24px;
        }

        .store-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
        }

        .store-card:hover {
          transform: translateY(-6px);
          border-color: rgba(var(--accent-color-rgb), 0.25);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-color-rgb), 0.08);
          background: rgba(var(--accent-color-rgb), 0.03);
        }

        .store-card.owned {
          border-color: rgba(var(--accent-color-rgb), 0.08);
        }

        .store-card.owned:hover {
          border-color: rgba(var(--accent-color-rgb), 0.3);
        }

        .store-card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
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
          padding: 20px;
          background: linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.14), rgba(7, 7, 10, 0.94));
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--font-display);
          font-size: var(--fs-14);
          font-weight: 900;
          letter-spacing: 1px;
          text-align: center;
          text-transform: uppercase;
        }

        .store-card:hover .store-card-image {
          transform: scale(1.08);
        }

        .store-owned-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(var(--accent-color-rgb), 0.85);
          color: #07070a;
          padding: 3px 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: var(--fs-9);
          font-weight: 700;
          font-family: var(--font-display);
          letter-spacing: 0.5px;
          box-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.4);
          z-index: 5;
        }

        .store-card-hover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
          z-index: 4;
        }

        .store-card:hover .store-card-hover {
          opacity: 1;
        }

        .store-card-view-btn {
          background: var(--accent-color);
          color: #07070a;
          padding: 8px 20px;
          border-radius: 20px;
          font-family: var(--font-display);
          font-size: var(--fs-11);
          font-weight: 700;
          letter-spacing: 1px;
          box-shadow: var(--accent-glow);
          transform: translateY(10px);
          transition: all var(--transition-fast);
        }

        .store-card:hover .store-card-view-btn {
          transform: translateY(0);
        }

        .store-card-info {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .store-card-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: var(--fs-13);
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        .store-card-developer {
          font-size: var(--fs-11);
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .store-card-platforms {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          margin-top: 2px;
        }

        .platform-icon-badge {
          display: flex;
          align-items: center;
          gap: 3px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          padding: 2px 5px;
          font-size: var(--fs-8);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.3px;
        }

        .store-card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: var(--fs-11);
          font-weight: 600;
          color: #e6af2e;
          margin-top: auto;
        }
      `}} />
    </div>
  );
}
