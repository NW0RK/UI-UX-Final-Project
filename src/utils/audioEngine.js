/**
 * Nexus Synth Audio Engine
 * Uses HTML5 Web Audio API to synthesize sleek, futuristic PS5-like haptic sound effects
 * and ambient soundscapes on the fly, requiring ZERO external audio assets.
 */

let audioCtx = null;
let ambientOscillators = [];
let ambientGainNode = null;
let isMuted = false;

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
    isMuted = muted;
    if (isMuted) {
      audioEngine.stopAmbience();
    }
  },
  
  getMuted: () => isMuted,

  /**
   * Quick metallic high-frequency UI tick on item hover
   */
  playHoverTick: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, ctx.currentTime);

      gain.gain.setValueAtTime(0.015, ctx.currentTime); // Soft volume
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Audio block bypass
    }
  },

  /**
   * Crisp premium electronic pulse on selection click
   */
  playClickPulse: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(380, ctx.currentTime); // Nice pitch
      osc1.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(760, ctx.currentTime); // Octave overtone
      osc2.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  },

  /**
   * Orchestral synth swell played on launch
   * Creates a deep bass impact followed by a major chord swell.
   */
  playLaunchSwell: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const mainGain = ctx.createGain();
      mainGain.connect(ctx.destination);
      mainGain.gain.setValueAtTime(0.18, now);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

      // 1. Deep Sub Bass Impact
      const sub = ctx.createOscillator();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(55, now); // A1
      sub.frequency.linearRampToValueAtTime(30, now + 1.2);
      
      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.4, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      
      sub.connect(subGain);
      subGain.connect(mainGain);
      sub.start(now);
      sub.stop(now + 1.5);

      // 2. Majestic Chord Pad (A minor -> A Major)
      // Notes: A2 (110Hz), E3 (164.81Hz), A3 (220Hz), C#4 (277.18Hz)
      const freqs = [110, 164.81, 220, 277.18];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();

        // Connect LFO for a dynamic chorus/vibrato feel
        lfoGain.gain.setValueAtTime(1.5, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        osc.connect(oscGain);
        oscGain.connect(mainGain);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        lfo.frequency.setValueAtTime(6 + idx, now);

        // Ambient filter
        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'lowpass';
        bandpass.frequency.setValueAtTime(120, now);
        bandpass.frequency.exponentialRampToValueAtTime(1600, now + 1.5);
        bandpass.Q.setValueAtTime(4, now);

        osc.disconnect(oscGain);
        osc.connect(bandpass);
        bandpass.connect(oscGain);

        // Volume envelope (Slow attack, long release)
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(0.12, now + 0.6 + idx * 0.1);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        lfo.start(now);
        osc.start(now);
        lfo.stop(now + 3.0);
        osc.stop(now + 3.0);
      });
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
      ambientGainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.0); // Soft fade-in

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
        ambientGainNode.gain.setValueAtTime(ambientGainNode.gain.value, getAudioContext().currentTime);
        ambientGainNode.gain.exponentialRampToValueAtTime(0.001, getAudioContext().currentTime + 0.4);
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
