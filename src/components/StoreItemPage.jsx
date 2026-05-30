import React, { useState } from 'react';
import { ArrowLeft, Monitor, Gamepad2, Smartphone, Check, Plus, Link, FolderOpen, Play, Star, Trash2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './StoreItemPage.css';

const platformIcons = {
  'PC': Monitor,
  'PS5': Gamepad2,
  'PS4': Gamepad2,
  'Xbox Series X|S': Gamepad2,
  'Xbox One': Gamepad2,
  'Switch': Gamepad2,
  'Mobile': Smartphone
};

export default function StoreItemPage({ item, ownedGames, onBack, onMarkOwned, onLinkExe, onLaunch, onRemoveGame }) {
  const [exeInput, setExeInput] = useState('');
  const [showExeInput, setShowExeInput] = useState(false);

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
        </div>
      </div>


    </div>
  );
}
