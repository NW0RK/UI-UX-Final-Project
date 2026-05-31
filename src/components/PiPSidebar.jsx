import React from 'react';
import { X, Award, Activity, ShieldCheck, Trophy, CheckCircle, Hourglass } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import './PiPSidebar.css';

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


    </div>
  );
}
