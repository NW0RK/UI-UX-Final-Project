import React, { useState } from 'react';
import { X, Edit3, Image, Check } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ProfileOverlay({
  isOpen,
  onClose,
  username,
  onUsernameChange,
  userAvatar,
  onAvatarChange
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(username);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(userAvatar);

  if (!isOpen) return null;

  // Curated premium preset avatars for easy selection
  const presetAvatars = [
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop', // Soldier
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop', // Gamer
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop', // Abstract Paint
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', // Beard portrait
    'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=150&auto=format&fit=crop', // Neon Cyber
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=150&auto=format&fit=crop'  // Ethereal art
  ];

  const handleSaveName = () => {
    audioEngine.playLaunchSwell();
    if (tempName.trim()) {
      onUsernameChange(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleSaveAvatar = (url) => {
    audioEngine.playLaunchSwell();
    onAvatarChange(url);
    setIsEditingAvatar(false);
  };

  const handleCustomAvatarSave = () => {
    if (tempAvatar.trim()) {
      handleSaveAvatar(tempAvatar.trim());
    }
  };

  return (
    <div className="profile-overlay-fullscreen">
      {/* Absolute Close button */}
      <button 
        className="profile-close-btn"
        onClick={() => { audioEngine.playClickPulse(); onClose(); }}
        onMouseEnter={audioEngine.playHoverTick}
      >
        <X size={20} />
      </button>

      {/* 1. Curvy Blurry Golden Glow Orbs (Visual depth with zero straight lines) */}
      <div className="curvy-glow-orb orb-gold-top" />
      <div className="curvy-glow-orb orb-bronze-bottom-left" />
      <div className="curvy-glow-orb orb-gold-bottom-right" />

      {/* 2. Fullscreen Golden Curvy Wave Flow (Organic Parallel Waves) */}
      <div className="wave-wrapper">
        <svg className="wave-svg" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          {/* Curvy background filled wave */}
          <path 
            d="M 0,550 C 300,450 500,700 800,600 C 1100,500 1300,750 1440,650 L 1440,900 L 0,900 Z" 
            fill="url(#wave-gold-grad)" 
            opacity="0.035"
            className="wave-curvy-path-fill"
          />
          {/* Curvy Wavy Parallel Lines */}
          <path 
            d="M 0,350 C 350,200 550,550 850,400 C 1150,250 1300,500 1440,350" 
            stroke="url(#line-gold-grad-1)" 
            strokeWidth="2" 
            opacity="0.4" 
            fill="none"
            className="wave-line-1"
          />
          <path 
            d="M 0,400 C 300,250 600,600 900,450 C 1200,300 1300,550 1440,400" 
            stroke="url(#line-gold-grad-2)" 
            strokeWidth="1.5" 
            opacity="0.25" 
            fill="none"
            className="wave-line-2"
          />
          <path 
            d="M 0,450 C 400,300 500,650 800,500 C 1100,350 1350,600 1440,450" 
            stroke="url(#line-gold-grad-3)" 
            strokeWidth="1" 
            opacity="0.15" 
            fill="none"
            className="wave-line-3"
          />
          
          <defs>
            <linearGradient id="wave-gold-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#07070a" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="line-gold-grad-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="30%" stopColor="var(--accent-color)" stopOpacity="0.8" />
              <stop offset="70%" stopColor="var(--accent-color)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-gold-grad-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="20%" stopColor="var(--accent-color)" stopOpacity="0.6" />
              <stop offset="80%" stopColor="var(--accent-color)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-gold-grad-3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="40%" stopColor="var(--accent-color)" stopOpacity="0.4" />
              <stop offset="60%" stopColor="var(--accent-color)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 3. Center Profile Card Container */}
      <div className="profile-center-card">
        
        {/* Profile Image Wrapper */}
        <div 
          className="profile-avatar-large-wrapper"
          onClick={() => { audioEngine.playClickPulse(); setIsEditingAvatar(!isEditingAvatar); }}
          onMouseEnter={audioEngine.playHoverTick}
          title="Click to Change Picture"
        >
          <img src={userAvatar} alt={username} className="profile-avatar-large" />
          <div className="profile-avatar-hover-overlay">
            <Image size={24} color="#FFB000" />
            <span>CHANGE</span>
          </div>
        </div>

        {/* Change Picture Interactive Drawer */}
        {isEditingAvatar && (
          <div className="avatar-picker-dialog glass-panel">
            <div className="picker-title-row">
              <h4>Choose Profile Picture</h4>
              <button onClick={() => setIsEditingAvatar(false)} className="picker-close"><X size={12} /></button>
            </div>
            
            {/* Presets List */}
            <div className="presets-grid">
              {presetAvatars.map((url, idx) => (
                <img 
                  key={idx} 
                  src={url} 
                  alt={`preset-${idx}`} 
                  className={`preset-option-img ${userAvatar === url ? 'preset-active' : ''}`}
                  onClick={() => handleSaveAvatar(url)}
                />
              ))}
            </div>

            {/* Custom URL Input */}
            <div className="custom-avatar-url-row">
              <input 
                type="text" 
                placeholder="Paste custom image URL..." 
                className="glass-input custom-avatar-input"
                value={tempAvatar}
                onChange={(e) => setTempAvatar(e.target.value)}
              />
              <button className="avatar-save-btn" onClick={handleCustomAvatarSave}>
                <Check size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Username Block */}
        <div className="username-block-container">
          {isEditingName ? (
            <div className="username-edit-wrapper">
              <input 
                type="text" 
                className="glass-input username-edit-input" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                maxLength={20}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName();
                  if (e.key === 'Escape') setIsEditingName(false);
                }}
              />
              <button className="username-save-btn" onClick={handleSaveName}>
                <Check size={16} />
              </button>
            </div>
          ) : (
            <h2 
              className="profile-username-display"
              onClick={() => { audioEngine.playClickPulse(); setTempName(username); setIsEditingName(true); }}
              onMouseEnter={audioEngine.playHoverTick}
              title="Click to Edit Name"
            >
              <span className="username-text-span">{username}</span>
              <Edit3 size={14} className="username-edit-icon" />
            </h2>
          )}
        </div>

      </div>

      {/* 4. Spaced NEXUS branding at bottom */}
      <footer className="profile-overlay-footer">
        N E X U S
      </footer>

      {/* Styles specifically tailored for gold mockup screen */}
      <style dangerouslySetInnerHTML={{ __html: `
        .profile-overlay-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, rgba(var(--accent-color-rgb), 0.08) 0%, #100f13 40%, #050508 100%);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fade-in-overlay 0.4s ease-out forwards;
        }

        @keyframes fade-in-overlay {
          0% { opacity: 0; backdrop-filter: blur(0px); }
          100% { opacity: 1; backdrop-filter: blur(20px); }
        }

        .profile-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10050;
          transition: all var(--transition-fast);
        }

        .profile-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-color);
          color: var(--accent-color);
          transform: rotate(90deg);
        }

        /* 1. Curved Glowing Ambient Orbs (Zero straight lines) */
        .curvy-glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 1;
        }

        .orb-gold-top {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--accent-color) 0%, rgba(var(--accent-color-rgb), 0) 70%);
          top: -10%;
          left: calc(50% - 250px);
          opacity: 0.15;
        }

        .orb-bronze-bottom-left {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(var(--accent-color-rgb), 0.6) 0%, rgba(var(--accent-color-rgb), 0) 70%);
          bottom: 5%;
          left: 10%;
          opacity: 0.12;
        }

        .orb-gold-bottom-right {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, var(--accent-color) 0%, rgba(var(--accent-color-rgb), 0) 70%);
          bottom: 5%;
          right: 10%;
          opacity: 0.12;
        }

        /* 2. Fullscreen Wavy SVG Flow */
        .wave-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .wave-svg {
          width: 100%;
          height: 100%;
        }

        /* Ambient Parallax Wave Floating Animations */
        .wave-line-1 {
          animation: wave-float-1 12s ease-in-out infinite alternate;
          transform-origin: center;
        }
        
        .wave-line-2 {
          animation: wave-float-2 18s ease-in-out infinite alternate;
          transform-origin: center;
        }

        .wave-line-3 {
          animation: wave-float-3 15s ease-in-out infinite alternate;
          transform-origin: center;
        }

        .wave-curvy-path-fill {
          animation: wave-float-1 20s ease-in-out infinite alternate;
          transform-origin: center;
        }

        @keyframes wave-float-1 {
          0% { transform: translateY(-10px) rotate(0.5deg); }
          100% { transform: translateY(15px) rotate(-0.5deg); }
        }

        @keyframes wave-float-2 {
          0% { transform: translateY(15px) rotate(-0.3deg); }
          100% { transform: translateY(-15px) rotate(0.3deg); }
        }

        @keyframes wave-float-3 {
          0% { transform: translateY(-5px) scaleY(0.98); }
          100% { transform: translateY(10px) scaleY(1.02); }
        }

        /* 3. Center Profile Card Styling */
        .profile-center-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          z-index: 10;
          position: relative;
        }

        .profile-avatar-large-wrapper {
          position: relative;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.5), 0px 0px 30px rgba(var(--accent-color-rgb), 0.25);
          transition: all 0.4s cubic-bezier(0.15, 0.85, 0.3, 1);
          box-sizing: border-box;
          border: 4px solid var(--accent-color);
          overflow: hidden;
        }

        .profile-avatar-large-wrapper:hover {
          transform: scale(1.06);
          border-color: #FFFFFF;
          box-shadow: 0px 15px 50px rgba(0, 0, 0, 0.6), 0px 0px 40px rgba(var(--accent-color-rgb), 0.3);
        }

        .profile-avatar-large {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .profile-avatar-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 50%;
        }

        .profile-avatar-large-wrapper:hover .profile-avatar-hover-overlay {
          opacity: 1;
        }

        .profile-avatar-hover-overlay span {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: var(--fs-11);
          letter-spacing: 1px;
          color: var(--accent-color);
          text-transform: uppercase;
        }

        /* Avatar Picker Drawer */
        .avatar-picker-dialog {
          position: absolute;
          top: 180px;
          width: 320px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.6);
          animation: slide-down-picker 0.3s cubic-bezier(0.15, 0.85, 0.3, 1) both;
          z-index: 1000;
        }

        @keyframes slide-down-picker {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .picker-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .picker-title-row h4 {
          font-family: 'Inter', sans-serif;
          font-size: var(--fs-13);
          font-weight: 700;
          color: #FFF;
          letter-spacing: 0.5px;
        }

        .picker-close {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
        }

        .picker-close:hover {
          color: #FFF;
        }

        .presets-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .preset-option-img {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all var(--transition-fast);
        }

        .preset-option-img:hover {
          border-color: rgba(var(--accent-color-rgb), 0.5);
          transform: scale(1.05);
        }

        .preset-option-img.preset-active {
          border-color: var(--accent-color);
          box-shadow: 0 0 10px rgba(var(--accent-color-rgb), 0.4);
        }

        .custom-avatar-url-row {
          display: flex;
          gap: 8px;
        }

        .custom-avatar-input {
          flex: 1;
          padding: 8px 12px;
          font-size: var(--fs-11);
        }

        .avatar-save-btn {
          width: 32px;
          height: 32px;
          background: var(--accent-color);
          border: none;
          border-radius: 8px;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .avatar-save-btn:hover {
          background: #FFF;
          transform: translateY(-1px);
        }

        /* Username block styling */
        .username-block-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          position: relative;
        }

        .profile-username-display {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: var(--fs-18);
          line-height: 1.3;
          color: #FFFFFF;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .profile-username-display:hover {
          color: var(--accent-color);
        }

        .username-text-span {
          text-align: center;
        }

        .username-edit-icon {
          position: absolute;
          left: calc(100% + 8px);
          opacity: 0;
          color: var(--accent-color);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .profile-username-display:hover .username-edit-icon {
          opacity: 1;
          transform: scale(1.1);
        }

        .username-edit-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .username-edit-input {
          padding: 8px 16px;
          font-size: var(--fs-16);
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          min-width: 220px;
          width: auto;
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: #FFF;
        }

        .username-save-btn {
          position: absolute;
          left: calc(100% + 10px);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--accent-color);
          color: #000;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .username-save-btn:hover {
          background: #FFF;
          transform: scale(1.05);
        }

        /* 4. Spaced NEXUS branding at bottom */
        .profile-overlay-footer {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 900;
          font-size: var(--fs-24);
          line-height: 1.3;
          letter-spacing: 12px;
          text-indent: 12px; /* Centers the letter-spaced text perfectly */
          text-align: center;
          color: #FFFFFF;
          opacity: 0.65;
          text-shadow: 0px 4px 15px rgba(var(--accent-color-rgb), 0.3);
          transition: all 0.3s ease;
          z-index: 10;
        }
      `}} />
    </div>
  );
}
