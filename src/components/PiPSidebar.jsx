import React from 'react';
import { X, Activity, BookOpen, Hourglass } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { formatHltbHours, hasHltbTimes } from '../utils/hltb';

export default function PiPSidebar({ 
  game, 
  onClose, 
  isRunning, 
  sessionTime,
  cpuUsage,
  ramUsage,
  systemStatusTracking = true
}) {
  if (!game) return null;

  const handleCloseClick = () => {
    audioEngine.playClickPulse();
    onClose();
  };

  const hltbRows = [
    ['Main Story', game.hltb?.mainStoryHours],
    ['Main + Extras', game.hltb?.mainExtraHours],
    ['Completionist', game.hltb?.completionistHours]
  ];
  const hasTimes = hasHltbTimes(game.hltb);

  // Time formatter for active session ticking
  const formatSessionTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(s)}`;
  };

  return (
    <div className="pip-sidebar-container glass-panel-heavy">
      {/* Header */}
      <div className="pip-header">
        <div className="pip-title-badge">
          <Activity size={14} className="pip-badge-icon" />
          <span>Activity Snapped</span>
        </div>
        <button 
          className="pip-close-btn" 
          onClick={handleCloseClick}
          onMouseEnter={audioEngine.playHoverTick}
        >
          <X size={14} />
        </button>
      </div>

      {/* Active Game Stats */}
      <div className="pip-game-hero">
        {game.coverUrl ? (
          <img src={game.coverUrl} alt={game.title} className="pip-game-cover" />
        ) : (
          <div className="pip-game-cover pip-game-cover-placeholder">{game.title?.slice(0, 2)}</div>
        )}
        <div className="pip-game-info">
          <div className="pip-game-title">{game.title}</div>
          <div className="pip-game-dev">{game.developer}</div>
        </div>
      </div>

      {/* Session Playtime Tracker Widget */}
      {isRunning ? (
        <div className="pip-widget active-session-widget">
          <div className="widget-header">
            <span className="session-dot" />
            <span className="session-label">Active Session Ticking</span>
          </div>
          <div className="session-timer-display">
            {formatSessionTime(sessionTime)}
          </div>
          {systemStatusTracking && (
            <div className="session-telemetry-metrics">
              <div className="session-metric">
                <span className="met-lbl">CPU Usage</span>
                <span className="met-val">{Math.round(cpuUsage * 1.2)}%</span>
              </div>
              <div className="session-metric">
                <span className="met-lbl">Mem Load</span>
                <span className="met-val">{Math.round(ramUsage * 1.05)}%</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="pip-widget session-idle-widget">
          <Hourglass size={18} className="idle-icon" />
          <span>Launcher Idle. Press Play to start tracking playtime.</span>
        </div>
      )}

      {/* HowLongToBeat Section */}
      <div className="pip-widget hltb-widget">
        <h4 className="widget-title">
          <BookOpen size={14} className="widget-title-icon" />
          <span>HowLongToBeat</span>
        </h4>

        <div className="hltb-time-grid">
          {hasTimes ? hltbRows.map(([label, hours]) => (
            <div key={label} className="hltb-time-row">
              <span className="hltb-time-label">{label}</span>
              <span className="hltb-time-value">{formatHltbHours(hours)}</span>
            </div>
          )) : (
            <div className="hltb-unavailable">HLTB unavailable</div>
          )}
          {game.hltb?.sourceUrl && (
            <div className="hltb-source-text">Source: howlongtobeat.com</div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .pip-sidebar-container {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 310px;
          height: calc(100vh - 40px);
          z-index: 999;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.7);
          pointer-events: auto;
          animation: slide-in-pip 0.5s var(--ease-interface) forwards;
        }

        @keyframes slide-in-pip {
          0% { transform: translateX(330px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        .pip-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .pip-title-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(var(--accent-color-rgb), 0.12);
          border: 1px solid rgba(var(--accent-color-rgb), 0.25);
          color: var(--accent-color);
          border-radius: 20px;
          padding: 4px 12px;
          font-family: var(--font-display);
          font-size: var(--fs-9);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .pip-badge-icon {
          animation: pulse-active 1.5s infinite ease-in-out;
        }

        .pip-close-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .pip-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .pip-game-hero {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 16px;
        }

        .pip-game-cover {
          width: 44px;
          height: 56px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .pip-game-cover-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, rgba(var(--accent-color-rgb), 0.2), rgba(7, 7, 10, 0.95));
          color: rgba(255, 255, 255, 0.72);
          font-family: var(--font-display);
          font-size: var(--fs-12);
          font-weight: 900;
          text-transform: uppercase;
        }

        .pip-game-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .pip-game-title {
          font-size: var(--fs-13);
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pip-game-dev {
          font-size: var(--fs-10);
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }

        .pip-widget {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 16px;
        }

        .active-session-widget {
          border-color: rgba(239, 68, 68, 0.25);
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.03) 0%, rgba(10, 10, 15, 0.2) 100%);
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.05);
        }

        .widget-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .session-dot {
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
          animation: running-pulse-glow 1.2s infinite ease-in-out;
        }

        .session-label {
          font-family: var(--font-display);
          font-size: var(--fs-9);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #ef4444;
        }

        .session-timer-display {
          font-family: var(--font-display);
          font-size: var(--fs-26);
          font-weight: 900;
          letter-spacing: 1.5px;
          color: #fff;
          margin: 10px 0;
          text-align: center;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .session-telemetry-metrics {
          display: flex;
          gap: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 8px;
        }

        .session-metric {
          flex: 1;
          display: flex;
          justify-content: space-between;
          font-size: var(--fs-10);
        }

        .met-lbl {
          color: rgba(255, 255, 255, 0.35);
        }

        .met-val {
          color: var(--accent-color);
          font-weight: 700;
        }

        .session-idle-widget {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.4);
          font-size: var(--fs-11);
          line-height: 1.4;
          background: rgba(255, 255, 255, 0.01);
        }

        .idle-icon {
          color: rgba(255, 255, 255, 0.25);
          flex-shrink: 0;
        }

        .hltb-widget {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .widget-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: var(--fs-10);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 12px;
        }

        .widget-title-icon {
          color: #e6af2e;
        }

        .hltb-time-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hltb-time-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .hltb-time-label {
          font-size: var(--fs-11);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hltb-time-value {
          font-size: var(--fs-13);
          font-weight: 700;
          color: #fff;
        }

        .hltb-unavailable,
        .hltb-source-text {
          font-size: var(--fs-10);
          color: rgba(255, 255, 255, 0.35);
          line-height: 1.4;
        }

        .hltb-source-text {
          margin-top: 2px;
          color: rgba(255, 255, 255, 0.25);
        }
      `}} />
    </div>
  );
}
