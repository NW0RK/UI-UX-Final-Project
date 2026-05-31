import React from 'react';
import { X, Award, Activity, ShieldCheck, Trophy, CheckCircle, Hourglass } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

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

  // Mock Achievements Checklist tailored to selected games
  const getAchievements = (gameId) => {
    const list = {
      cyberpunk: [
        { id: 1, title: 'The Star', desc: 'Complete Cyberpunk main storyline.', progress: 80, completed: false },
        { id: 2, title: 'Breathtaking', desc: 'Collect all items once belonging to Johnny Silverhand.', progress: 100, completed: true },
        { id: 3, title: 'Ten out of Ten', desc: 'Reach the max level in any skill tree.', progress: 40, completed: false }
      ],
      eldenring: [
        { id: 1, title: 'Elden Lord', desc: 'Achieve the Elden Lord ending in Lands Between.', progress: 90, completed: false },
        { id: 2, title: 'Shardbearer Godrick', desc: 'Defeat Shardbearer Godrick in Stormveil.', progress: 100, completed: true },
        { id: 3, title: 'Legendary Armaments', desc: 'Acquire all nine legendary weapons.', progress: 75, completed: false }
      ],
      hades: [
        { id: 1, title: 'Family Reunion', desc: 'Welcome all Olympic gods to the House of Hades.', progress: 50, completed: false },
        { id: 2, title: 'Champion of Elysium', desc: 'Clear Elysium chamber with extreme measures.', progress: 100, completed: true },
        { id: 3, title: 'Skelly\'s Last Lament', desc: 'Unlock Skelly\'s final reward skeleton statue.', progress: 10, completed: false }
      ],
      portal2: [
        { id: 1, title: 'Lunacy', desc: 'Place a portal on the moon.', progress: 100, completed: true },
        { id: 2, title: 'Professor Portal', desc: 'Complete calibration course in co-op mode.', progress: 100, completed: true },
        { id: 3, title: 'GHOSTRUST', desc: 'Complete Chamber 04 in under 2 minutes.', progress: 30, completed: false }
      ],
      witcher3: [
        { id: 1, title: 'Gwent Master', desc: 'Defeat Tybalt and win the Passiflora tournament.', progress: 30, completed: false },
        { id: 2, title: 'Lilac and Gooseberries', desc: 'Find Yennefer of Vengerberg in White Orchard.', progress: 100, completed: true },
        { id: 3, title: 'Passed the Trial', desc: 'Complete game on Death March difficulty.', progress: 15, completed: false }
      ]
    };

    return list[gameId] || [
      { id: 1, title: 'First Venture', desc: 'Launch and run the game for the first time.', progress: 100, completed: true },
      { id: 2, title: 'Enthusiast', desc: 'Track over 5 hours of total session gameplay.', progress: 0, completed: false },
      { id: 3, title: 'Completionist', desc: 'Unlock all sub-system achievements.', progress: 0, completed: false }
    ];
  };

  const achievements = getAchievements(game.id);

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

      {/* Achievements Checklist Section */}
      <div className="pip-widget achievements-checklist-widget">
        <h4 className="widget-title">
          <Trophy size={14} className="widget-title-icon" />
          <span>Trophy Milestones</span>
        </h4>

        <div className="achievements-checklist-grid">
          {achievements.map((ach) => (
            <div key={ach.id} className={`achievement-check-row ${ach.completed ? 'completed' : ''}`}>
              <div className="check-box-icon-wrapper">
                {ach.completed ? (
                  <CheckCircle size={16} className="checked-icon" />
                ) : (
                  <div className="unchecked-circle" />
                )}
              </div>
              <div className="achievement-check-details">
                <div className="ach-check-title">{ach.title}</div>
                <div className="ach-check-desc">{ach.desc}</div>
                
                {/* Progress bar for locked achievements */}
                {!ach.completed && ach.progress > 0 && (
                  <div className="ach-mini-progress-bar">
                    <div className="ach-mini-progress-track">
                      <div className="ach-mini-progress-fill" style={{ width: `${ach.progress}%` }} />
                    </div>
                    <span className="ach-mini-progress-text">{ach.progress}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
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
          animation: slide-in-pip 0.5s var(--ease-ps5) forwards;
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

        .achievements-checklist-widget {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0; /* Containment scroll */
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

        .achievements-checklist-grid {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .achievement-check-row {
          display: flex;
          gap: 12px;
          padding: 8px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          transition: all var(--transition-fast);
        }

        .achievement-check-row.completed {
          background: rgba(230, 175, 46, 0.02);
          border-color: rgba(230, 175, 46, 0.1);
        }

        .check-box-icon-wrapper {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checked-icon {
          color: #e6af2e;
        }

        .unchecked-circle {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
        }

        .achievement-check-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .ach-check-title {
          font-size: var(--fs-11);
          font-weight: 700;
          color: #fff;
        }

        .completed .ach-check-title {
          color: #e6af2e;
          text-decoration: line-through;
          opacity: 0.8;
        }

        .ach-check-desc {
          font-size: var(--fs-9);
          color: rgba(255, 255, 255, 0.35);
          margin-top: 2px;
          line-height: 1.3;
        }

        .ach-mini-progress-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        .ach-mini-progress-track {
          flex: 1;
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }

        .ach-mini-progress-fill {
          height: 100%;
          background: var(--accent-color);
          border-radius: 2px;
        }

        .ach-mini-progress-text {
          font-size: var(--fs-8);
          font-weight: 700;
          color: var(--accent-color);
        }
      `}} />
    </div>
  );
}
