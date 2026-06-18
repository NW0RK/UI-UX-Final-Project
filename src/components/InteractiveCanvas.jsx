import React, { useEffect, useRef } from 'react';

const MAX_PARTICLES = 120;
const PARTICLE_AREA_DENSITY = 10000;
const CLICK_WAVE_MAX_RADIUS = 320;
const CLICK_WAVE_SPEED = 8;
const CLICK_WAVE_THICKNESS = 24;
const CLICK_WAVE_FORCE = 2.2;

export default function InteractiveCanvas({ theme, speedFactor = 1, density = 1 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const clickWaveRef = useRef({ x: 0, y: 0, radius: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Color selectors based on theme
    const getParticleColor = () => {
      if (theme === 'theme-cyber') {
        return ['#ffffff', '#ff007f', '#8a2be2', '#ff80bf'];
      }
      if (theme === 'theme-emerald') {
        return ['#ffffff', '#00ff66', '#00cc52', '#99ffe6'];
      }
      if (theme === 'theme-gold') {
        return ['#ffffff', '#e6af2e', '#f3d382', '#fff0d0'];
      }
      // Default: Aether
      return ['#ffffff', '#00e5ff', '#00aaff', '#b3f0ff'];
    };

    const cachedColors = getParticleColor();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Size between 0.5 and 2.5
        this.baseXSpeed = (Math.random() - 0.5) * 0.25 * speedFactor;
        this.baseYSpeed = -Math.random() * 0.4 * speedFactor - 0.1; // Gentle upward drift
        this.vx = this.baseXSpeed;
        this.vy = this.baseYSpeed;
        
        this.color = cachedColors[Math.floor(Math.random() * cachedColors.length)];
        this.alpha = Math.random() * 0.6 + 0.1;
        this.baseAlpha = this.alpha;
        this.decay = Math.random() * 0.005 + 0.002;
        this.flickerSpeed = Math.random() * 0.05 + 0.01;
        this.flickerDir = Math.random() > 0.5 ? 1 : -1;
      }

      update(mouse, clickWave) {
        // Slow float
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen boundaries
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;

        // Decelerate velocities back to ambient base speeds
        this.vx += (this.baseXSpeed - this.vx) * 0.08;
        this.vy += (this.baseYSpeed - this.vy) * 0.08;

        // 1. Mouse Kinetic Interaction (Repulsion)
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 120; // Radius of influence

        if (dist < radius) {
          const force = (radius - dist) / radius;
          // Push particles away from cursor
          const angle = Math.atan2(dy, dx);
          
          // Add velocity matching component (mouse speed increases repulsion speed)
          const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
          const push = force * (1.2 + mouseSpeed * 0.1);
          
          this.vx += Math.cos(angle) * push * 0.5;
          this.vy += Math.sin(angle) * push * 0.5;
          
          // Glow intensely near mouse
          this.alpha = Math.min(0.9, this.alpha + 0.05);
        } else {
          // Flicker stardust opacity
          this.alpha += this.flickerSpeed * this.flickerDir;
          if (this.alpha > this.baseAlpha * 1.4) this.flickerDir = -1;
          if (this.alpha < this.baseAlpha * 0.6) this.flickerDir = 1;
          this.alpha = Math.max(0.05, Math.min(0.8, this.alpha));
        }

        // 2. Shockwave Blast from Clicks
        if (clickWave.active) {
          const cDx = this.x - clickWave.x;
          const cDy = this.y - clickWave.y;
          const cDist = Math.sqrt(cDx * cDx + cDy * cDy);
          const waveRadius = clickWave.radius;

          if (cDist < waveRadius && cDist > waveRadius - CLICK_WAVE_THICKNESS) {
            const angle = Math.atan2(cDy, cDx);
            const falloff = Math.max(0, 1 - cDist / CLICK_WAVE_MAX_RADIUS);
            const push = CLICK_WAVE_FORCE * falloff; // Shock push decreases with distance
            this.vx += Math.cos(angle) * push;
            this.vy += Math.sin(angle) * push;
            this.alpha = 1; // Ignite stardust
          }
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(MAX_PARTICLES, Math.floor((canvas.width * canvas.height) / PARTICLE_AREA_DENSITY) * density);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse events tracking
    const handleMouseMove = (e) => {
      const mouse = mouseRef.current;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Calculate velocity
      mouse.vx = mouse.x - mouse.lastX;
      mouse.vy = mouse.y - mouse.lastY;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      // Decelerate mouse velocity calculations on idle
      clearTimeout(mouse.velocityTimeout);
      mouse.velocityTimeout = setTimeout(() => {
        mouse.vx = 0;
        mouse.vy = 0;
      }, 50);
    };

    const handleMouseLeave = () => {
      const mouse = mouseRef.current;
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    const handleMouseClick = (e) => {
      clickWaveRef.current = {
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        active: true
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleMouseClick);

    // Animation Loop
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Handle shockwave progression
      const wave = clickWaveRef.current;
      if (wave.active) {
        wave.radius += CLICK_WAVE_SPEED; // Expands outward
        if (wave.radius > CLICK_WAVE_MAX_RADIUS) {
          wave.active = false;
        }
      }

      // Draw and update stardust particles
      particles.forEach((p) => {
        p.update(mouseRef.current, wave);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, speedFactor, density]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 11
      }}
    />
  );
}
