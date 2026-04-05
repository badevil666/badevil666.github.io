import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  size: number;
  color: string;
  alpha: number;
  pulseOffset: number;
}

const COLORS = ['#a855f7', '#7c3aed', '#6d28d9', '#10b981', '#059669'];
const COUNT  = 95;
const LINK_DIST  = 160;
const MOUSE_DIST = 140;

const hex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    let particles: Particle[] = [];
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const spawn = (): Particle => ({
      x:           Math.random() * W,
      y:           Math.random() * H,
      vx:          (Math.random() - 0.5) * 0.35,
      vy:          (Math.random() - 0.5) * 0.35,
      baseVx:      (Math.random() - 0.5) * 0.35,
      baseVy:      (Math.random() - 0.5) * 0.35,
      size:        Math.random() * 1.6 + 0.8,
      color:       COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha:       Math.random() * 0.45 + 0.2,
      pulseOffset: Math.random() * Math.PI * 2,
    });

    const init = () => { particles = Array.from({ length: COUNT }, spawn); };

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, W, H);

      // ── update + draw particles ──────────────────────────────────────
      for (const p of particles) {
        // Mouse repulsion
        const dx   = p.x - mouse.current.x;
        const dy   = p.y - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_DIST && dist > 0) {
          const force = ((MOUSE_DIST - dist) / MOUSE_DIST) * 0.02;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Drift back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.012;
        p.vy += (p.baseVy - p.vy) * 0.012;

        // Speed cap
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 2) { p.vx = (p.vx / spd) * 2; p.vy = (p.vy / spd) * 2; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Pulse size
        const pulse = 1 + Math.sin(t * 1.8 + p.pulseOffset) * 0.35;
        const r     = clamp(p.size * pulse, 0.5, 4);

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        grd.addColorStop(0, p.color + hex(p.alpha));
        grd.addColorStop(1, p.color + '00');
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + hex(p.alpha * 1.4);
        ctx.fill();
      }

      // ── connections ─────────────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i], pj = particles[j];
          const d  = Math.hypot(pi.x - pj.x, pi.y - pj.y);
          if (d >= LINK_DIST) continue;

          const strength = (1 - d / LINK_DIST);
          const alpha    = strength * 0.18;

          // Gradient line blending the two particle colors
          const lg = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
          lg.addColorStop(0, pi.color + hex(alpha));
          lg.addColorStop(1, pj.color + hex(alpha));

          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.strokeStyle = lg;
          ctx.lineWidth   = strength * 0.9;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = ()               => { mouse.current = { x: -9999, y: -9999 }; };
    const onResize = () => { resize(); };   // don't reinit — just let particles wrap naturally

    resize();
    init();
    draw();

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
