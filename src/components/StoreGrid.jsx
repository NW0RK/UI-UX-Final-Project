import React from 'react';
import { ShoppingCart, Monitor, Gamepad2, Smartphone, Check, Star } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './StoreGrid.css';

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
        {filtered.map(item => {
          const isOwned = ownedIds.has(item.id);
          return (
            <div
              key={item.id}
              className={`store-card ${isOwned ? 'owned' : ''}`}
              onClick={() => handleItemClick(item)}
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


    </div>
  );
}
