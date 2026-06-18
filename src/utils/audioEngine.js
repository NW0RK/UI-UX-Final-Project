/**
 * Nexus Synth Audio Engine
 * Uses pre-rendered high-quality MP3 console sound assets located in the audio/ folder
 * for premium UI interactions, and procedural ambient drones using Web Audio API.
 */

import hoverTickSoundUrl from '../../audio/Switch Between.mp3';
import clickPulseSoundUrl from '../../audio/Select.mp3';
import launchSwellSoundUrl from '../../audio/Game Launch.mp3';
import menuMusicSoundUrl from '../../audio/Menu Music.mp3';

let audioCtx = null;
let ambientOscillators = [];
let ambientGainNode = null;
let isMuted = false;
let masterVolume = 1;
let menuMusicEnabled = false;
let menuMusicPendingUnlock = false;
const activeUiSounds = new Set();
const MENU_MUSIC_BASE_VOLUME = 0.336;

// Create preloaded Audio elements for polyphonic UI sound effects
const hoverAudio = new Audio(hoverTickSoundUrl);
const clickAudio = new Audio(clickPulseSoundUrl);
const launchAudio = new Audio(launchSwellSoundUrl);
const menuMusicAudio = new Audio(menuMusicSoundUrl);

hoverAudio.preload = 'auto';
clickAudio.preload = 'auto';
launchAudio.preload = 'auto';
menuMusicAudio.preload = 'auto';
menuMusicAudio.loop = true;
menuMusicAudio.volume = MENU_MUSIC_BASE_VOLUME;

const clampVolume = (value) => {
  const volume = Number(value);
  if (!Number.isFinite(volume)) return 1;
  return Math.min(1, Math.max(0, volume));
};

const applyMenuMusicVolume = () => {
  menuMusicAudio.volume = MENU_MUSIC_BASE_VOLUME * masterVolume;
};

const applyAmbienceVolume = () => {
  if (!ambientGainNode || !audioCtx) return;
  try {
    ambientGainNode.gain.setTargetAtTime(0.05 * masterVolume, audioCtx.currentTime, 0.05);
  } catch (e) {}
};

const removeMenuMusicUnlockListeners = () => {
  if (typeof window === 'undefined') return;
  window.removeEventListener('pointerdown', handleMenuMusicUnlock, true);
  window.removeEventListener('keydown', handleMenuMusicUnlock, true);
  window.removeEventListener('touchstart', handleMenuMusicUnlock, true);
};

function handleMenuMusicUnlock() {
  menuMusicPendingUnlock = false;
  removeMenuMusicUnlockListeners();
  audioEngine.startMenuMusic();
}

const queueMenuMusicUnlock = () => {
  if (typeof window === 'undefined' || menuMusicPendingUnlock) return;
  menuMusicPendingUnlock = true;
  window.addEventListener('pointerdown', handleMenuMusicUnlock, { once: true, capture: true });
  window.addEventListener('keydown', handleMenuMusicUnlock, { once: true, capture: true });
  window.addEventListener('touchstart', handleMenuMusicUnlock, { once: true, capture: true });
};

const playSound = (audioElement, volume = 1.0) => {
  if (isMuted) return;
  try {
    const playClone = audioElement.cloneNode();
    playClone.volume = clampVolume(volume * masterVolume);
    activeUiSounds.add(playClone);
    playClone.addEventListener('ended', () => activeUiSounds.delete(playClone), { once: true });
    playClone.addEventListener('error', () => activeUiSounds.delete(playClone), { once: true });
    playClone.play().catch(() => {});
  } catch (e) {}
};

const stopActiveUiSounds = () => {
  activeUiSounds.forEach(sound => {
    try {
      sound.pause();
      sound.currentTime = 0;
    } catch (e) {}
  });
  activeUiSounds.clear();
};

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const audioEngine = {
  setMuted: (muted) => {
    isMuted = Boolean(muted);
    if (isMuted) {
      stopActiveUiSounds();
      audioEngine.stopAmbience();
      audioEngine.stopMenuMusic();
    }
  },
  
  getMuted: () => isMuted,

  setMasterVolume: (volume) => {
    masterVolume = clampVolume(volume);
    applyMenuMusicVolume();
    applyAmbienceVolume();
  },

  getMasterVolume: () => masterVolume,

  /**
   * Quick premium UI tick on item hover
   */
  playHoverTick: () => {
    playSound(hoverAudio, 0.25);
  },

  /**
   * Crisp electronic pulse on selection click
   */
  playClickPulse: () => {
    playSound(clickAudio, 0.4);
  },

  /**
   * Orchestral sound swell played on launch
   */
  playLaunchSwell: () => {
    playSound(launchAudio, 0.5);
  },

  startMenuMusic: () => {
    menuMusicEnabled = true;
    if (isMuted) return;

    try {
      removeMenuMusicUnlockListeners();
      menuMusicPendingUnlock = false;
      applyMenuMusicVolume();

      if (!menuMusicAudio.paused) return;

      const playPromise = menuMusicAudio.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          if (menuMusicEnabled && !isMuted) {
            queueMenuMusicUnlock();
          }
        });
      }
    } catch (e) {
      queueMenuMusicUnlock();
    }
  },

  stopMenuMusic: () => {
    menuMusicEnabled = false;
    menuMusicPendingUnlock = false;
    removeMenuMusicUnlockListeners();
    try {
      menuMusicAudio.pause();
      menuMusicAudio.currentTime = 0;
    } catch (e) {}
  },

  /**
   * Plays soft, continuous ambient drones tailored to selected game's style.
   */
  startAmbience: (style) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      audioEngine.stopAmbience(); // Kill existing loops

      ambientGainNode = ctx.createGain();
      ambientGainNode.connect(ctx.destination);
      ambientGainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      ambientGainNode.gain.linearRampToValueAtTime(0.05 * masterVolume, ctx.currentTime + 1.0); // Soft fade-in

      const now = ctx.currentTime;

      if (style === 'synth') {
        // Cyberpunk vibe: Gritty, detuned low drone
        // Notes: F#1 (46.25Hz), C#2 (69.30Hz), F#2 (92.50Hz)
        const notes = [46.25, 69.30, 92.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.5, now);
          
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(110, now);
          
          // LFO sweep filter
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.type = 'sine';
          lfo.frequency.setValueAtTime(0.15 + idx * 0.05, now);
          lfoGain.gain.setValueAtTime(40, now);
          
          lfo.connect(lfoGain);
          lfoGain.connect(filter.frequency);
          
          osc.connect(filter);
          filter.connect(ambientGainNode);
          
          lfo.start(now);
          osc.start(now);
          ambientOscillators.push(osc, lfo);
        });
      } 
      else if (style === 'orchestra') {
        // Elden Ring: Majestic, dark low brass drone
        // Notes: D1 (36.71Hz), A1 (55.00Hz), D2 (73.42Hz), F2 (87.31Hz)
        const notes = [36.71, 55.00, 73.42, 87.31];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(160, now);
          
          osc.connect(filter);
          filter.connect(ambientGainNode);
          
          osc.start(now);
          ambientOscillators.push(osc);
        });
      }
      else if (style === 'guitar') {
        // Hades: Rich, warm mid chord
        // Notes: A2 (110Hz), E3 (164.81Hz), B3 (246.94Hz)
        const notes = [110, 164.81, 246.94];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          
          // LFO tremolo volume
          const tremolo = ctx.createGain();
          tremolo.gain.setValueAtTime(0.4, now);
          
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.type = 'sine';
          lfo.frequency.setValueAtTime(1 + idx * 0.5, now);
          lfoGain.gain.setValueAtTime(0.2, now);
          
          lfo.connect(lfoGain);
          lfoGain.connect(tremolo.gain);
          
          osc.connect(tremolo);
          tremolo.connect(ambientGainNode);
          
          lfo.start(now);
          osc.start(now);
          ambientOscillators.push(osc, lfo);
        });
      }
      else if (style === 'ambient') {
        // Portal 2: Pure sinusoids drifting like computer laboratory beeps
        // Notes: C3 (130.81Hz), G3 (196.00Hz), C4 (261.63Hz), E4 (329.63Hz)
        const notes = [130.81, 196.00, 261.63, 329.63];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          
          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(0.1, now);
          
          // Very slow volume sweep
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.type = 'sine';
          lfo.frequency.setValueAtTime(0.05 + idx * 0.02, now);
          lfoGain.gain.setValueAtTime(0.08, now);
          
          lfo.connect(lfoGain);
          lfoGain.connect(oscGain.gain);
          
          osc.connect(oscGain);
          oscGain.connect(ambientGainNode);
          
          lfo.start(now);
          osc.start(now);
          ambientOscillators.push(osc, lfo);
        });
      }
      else {
        // Witcher 3 / Folkish: Warm open fifths
        // Notes: G2 (98Hz), D3 (146.83Hz), G3 (196Hz)
        const notes = [98, 146.83, 196];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(300, now);
          
          osc.connect(filter);
          filter.connect(ambientGainNode);
          
          osc.start(now);
          ambientOscillators.push(osc);
        });
      }
    } catch (e) {}
  },

  stopAmbience: () => {
    try {
      if (ambientGainNode) {
        // Soft fade-out
        const ctx = getAudioContext();
        ambientGainNode.gain.cancelScheduledValues(ctx.currentTime);
        ambientGainNode.gain.setValueAtTime(ambientGainNode.gain.value, ctx.currentTime);
        ambientGainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      }
      
      setTimeout(() => {
        ambientOscillators.forEach(osc => {
          try { osc.stop(); } catch (e) {}
        });
        ambientOscillators = [];
        ambientGainNode = null;
      }, 500);
    } catch (e) {}
  }
};
