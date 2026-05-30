import React, { useState } from 'react';
import { ArrowLeft, Monitor, Gamepad2, Smartphone, Check, Plus, Link, FolderOpen, Play, Star } from 'lucide-react';
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

export default function StoreItemPage({ item, ownedGames, onBack, onMarkOwned, onLinkExe, onLaunch }) {
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

      <style dangerouslySetInnerHTML={{__html: `
        .store-item-viewport {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px 0 40px 0;
          overflow-y: auto;
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
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all var(--transition-fast);
          margin-bottom: 24px;
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
          height: 320px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 30px;
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
          font-size: 12px;
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
          padding: 30px;
          z-index: 2;
        }

        .store-item-banner-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .store-item-tag {
          background: rgba(var(--accent-color-rgb), 0.12);
          border: 1px solid rgba(var(--accent-color-rgb), 0.25);
          color: var(--accent-color);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .store-item-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 36px;
          letter-spacing: 2px;
          color: #fff;
          text-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .store-item-meta {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          gap: 8px;
        }

        .store-item-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
        }

        .store-item-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 700;
          color: #e6af2e;
          margin-top: 8px;
        }

        .store-item-body {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 30px;
        }

        .store-item-section-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 14px;
        }

        .store-item-description {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 30px;
        }

        .store-item-platforms {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .store-item-platform-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .store-item-platform-badge svg {
          color: var(--accent-color);
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
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .exe-linked-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          font-family: monospace;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          padding: 8px 12px;
          word-break: break-all;
        }

        .exe-not-linked {
          font-size: 12px;
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
          font-size: 11px;
          padding: 10px 12px;
        }

        .exe-input-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .exe-input {
          font-family: monospace;
          font-size: 11px;
          width: 100%;
        }

        .exe-input-actions {
          display: flex;
          gap: 8px;
        }

        .exe-input-actions .glow-btn {
          flex: 1;
          font-size: 11px;
          padding: 8px 12px;
        }

        .not-owned-label {
          text-align: center;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          padding: 10px 0;
        }

        .mark-owned-btn {
          width: 100%;
          padding: 14px;
          font-size: 13px;
        }

        .owned-hint {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.25);
          text-align: center;
          line-height: 1.5;
        }
      `}} />
    </div>
  );
}
