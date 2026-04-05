
import { useEffect, useRef } from 'react';

// ── types ─────────────────────────────────────────────────────────────────────
interface Star { x: number; y: number; r: number; phase: number; speed: number }
interface Band {
  color: [number, number, number]; // rgb
  centerY: number;   // 0-1 fraction of H
  waveAmp: number;   // fraction of H — vertical displacement
  heightAmp: number; // fraction of H — band thickness variation
  baseHeight: number;// fraction of H — minimum band thickness
  freq: number;      // spatial wave frequency
  freq2: number;     // second harmonic
  speed: number;     // time speed
  speed2: number;
  phase: number;
  phase2: number;
  alpha: number;     // peak opacity
  pulseSpeed: number;// brightness pulse speed
  pulsePhase: number;
}

// ── helpers ───────────────────────────────────────────────────────────────────
const rgba = ([r, g, b]: [number, number, number], a: number) =>
  `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${Math.max(0, a).toFixed(3)})`;

// ── aurora band definitions ───────────────────────────────────────────────────
const BANDS: Band[] = [
  // Primary green curtain — widest, most prominent
  {
    color: [0, 230, 120], centerY: 0.38, waveAmp: 0.06, heightAmp: 0.08,
    baseHeight: 0.14, freq: 0.0045, freq2: 0.009, speed: 0.18, speed2: 0.11,
    phase: 0, phase2: 1.3, alpha: 0.72, pulseSpeed: 0.4, pulsePhase: 0,
  },
  // Cyan overlay — slightly higher
  {
    color: [0, 200, 210], centerY: 0.32, waveAmp: 0.055, heightAmp: 0.06,
    baseHeight: 0.09, freq: 0.0055, freq2: 0.011, speed: 0.22, speed2: 0.14,
    phase: 2.1, phase2: 3.7, alpha: 0.50, pulseSpeed: 0.55, pulsePhase: 1.2,
  },
  // Purple/violet — upper, narrower
  {
    color: [130, 60, 255], centerY: 0.27, waveAmp: 0.05, heightAmp: 0.05,
    baseHeight: 0.07, freq: 0.007, freq2: 0.013, speed: 0.28, speed2: 0.17,
    phase: 4.5, phase2: 0.9, alpha: 0.42, pulseSpeed: 0.7, pulsePhase: 2.4,
  },
  // Faint pink crown — topmost
  {
    color: [220, 80, 180], centerY: 0.21, waveAmp: 0.04, heightAmp: 0.03,
    baseHeight: 0.045, freq: 0.009, freq2: 0.018, speed: 0.35, speed2: 0.21,
    phase: 1.6, phase2: 5.1, alpha: 0.28, pulseSpeed: 0.9, pulsePhase: 4.0,
  },
  // Second green layer — deep, wide glow at horizon
  {
    color: [20, 255, 140], centerY: 0.44, waveAmp: 0.04, heightAmp: 0.05,
    baseHeight: 0.10, freq: 0.003, freq2: 0.007, speed: 0.12, speed2: 0.08,
    phase: 3.3, phase2: 2.2, alpha: 0.38, pulseSpeed: 0.3, pulsePhase: 0.7,
  },
];

const SLICE_W = 8;   // px per vertical slice — wider = fewer gradient fills
const FPS_CAP = 30;  // aurora doesn't need 60fps
const FRAME_MS = 1000 / FPS_CAP;
const SCALE = 0.5;   // render at 50% resolution for huge performance boost

// ── component ─────────────────────────────────────────────────────────────────
const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let W = 0, H = 0, t = 0, lastFrame = 0;
    let stars: Star[] = [];
    let terrain: number[] = [];
    let treeLine: { x: number; h: number; layers: number }[] = [];
    let skyCache: HTMLCanvasElement | null = null;
    let terrainCache: HTMLCanvasElement | null = null;

    // ── draw sky gradient (cached) ────────────────────────────────────────────
    const drawSky = (targetCtx: CanvasRenderingContext2D) => {
      const grd = targetCtx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0.00, '#000e07');
      grd.addColorStop(0.35, '#010f09');
      grd.addColorStop(0.70, '#011208');
      grd.addColorStop(0.80, '#021a0c');
      grd.addColorStop(1.00, '#010e07');
      targetCtx.fillStyle = grd;
      targetCtx.fillRect(0, 0, W, H);
    };

    // ── horizon glow (cached) ─────────────────────────────────────────────────
    const drawHorizonGlow = (targetCtx: CanvasRenderingContext2D) => {
      const hy = H * 0.80;
      const grd = targetCtx.createLinearGradient(0, hy - H * 0.10, 0, hy + H * 0.05);
      grd.addColorStop(0, 'rgba(0,180,80,0.00)');
      grd.addColorStop(0.5, 'rgba(0,180,80,0.08)');
      grd.addColorStop(1, 'rgba(0,180,80,0.00)');
      targetCtx.fillStyle = grd;
      targetCtx.fillRect(0, hy - H * 0.10, W, H * 0.15);
    };

    // ── terrain + trees silhouette (cached) ───────────────────────────────────
    const drawTerrain = (targetCtx: CanvasRenderingContext2D) => {
      // Mountain fill
      targetCtx.fillStyle = '#010d05';
      targetCtx.beginPath();
      targetCtx.moveTo(0, H);
      for (let x = 0; x <= W; x++) targetCtx.lineTo(x, terrain[x] ?? H * 0.80);
      targetCtx.lineTo(W, H);
      targetCtx.closePath();
      targetCtx.fill();

      // Snow highlights on ridges
      targetCtx.strokeStyle = 'rgba(200,240,220,0.06)';
      targetCtx.lineWidth = 1;
      targetCtx.beginPath();
      targetCtx.moveTo(0, terrain[0]);
      for (let x = 1; x <= W; x++) targetCtx.lineTo(x, terrain[x] ?? H * 0.80);
      targetCtx.stroke();

      // Pine trees
      targetCtx.fillStyle = '#010d05';
      for (const tree of treeLine) {
        const baseY = terrain[Math.min(Math.round(tree.x), W - 1)] ?? H * 0.80;
        const lh = tree.h / tree.layers;
        for (let l = 0; l < tree.layers; l++) {
          const ly = baseY - l * lh * 0.65;
          const hw = (tree.layers - l) * (tree.h * 0.22);
          targetCtx.beginPath();
          targetCtx.moveTo(tree.x, ly - tree.h * 0.55 - l * lh * 0.3);
          targetCtx.lineTo(tree.x - hw, ly);
          targetCtx.lineTo(tree.x + hw, ly);
          targetCtx.closePath();
          targetCtx.fill();
        }
      }

      // Snow/frost on ground — reflection of aurora
      const snowGrd = targetCtx.createLinearGradient(0, H * 0.80, 0, H);
      snowGrd.addColorStop(0, 'rgba(0,220,120,0.04)');
      snowGrd.addColorStop(1, 'rgba(0,0,0,0)');
      targetCtx.fillStyle = snowGrd;
      targetCtx.fillRect(0, H * 0.80, W, H * 0.20);
    };

    // ── resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      W = canvas.width = Math.floor(window.innerWidth * SCALE);
      H = canvas.height = Math.floor(window.innerHeight * SCALE);
      
      buildStars();
      buildTerrain();
      
      // Build caches
      skyCache = document.createElement('canvas');
      skyCache.width = W; skyCache.height = H;
      drawSky(skyCache.getContext('2d')!);
      
      terrainCache = document.createElement('canvas');
      terrainCache.width = W; terrainCache.height = H;
      drawHorizonGlow(terrainCache.getContext('2d')!);
      drawTerrain(terrainCache.getContext('2d')!);
    };

    // ── stars ─────────────────────────────────────────────────────────────────
    const buildStars = () => {
      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.72,
        r: Math.random() * 1.1 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005,
      }));
    };

    const drawStars = () => {
      for (const s of stars) {
        s.phase += s.speed;
        const alpha = 0.25 + 0.65 * (0.5 + 0.5 * Math.sin(s.phase));
        if (s.r > 0.9) {
          ctx.strokeStyle = `rgba(200,230,255,${alpha * 0.35})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(s.x - s.r * 3, s.y); ctx.lineTo(s.x + s.r * 3, s.y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(s.x, s.y - s.r * 3); ctx.lineTo(s.x, s.y + s.r * 3); ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,235,255,${alpha})`;
        ctx.fill();
      }
    };

    // ── terrain generation ────────────────────────────────────────────────────
    const buildTerrain = () => {
      const horizonY = H * 0.80;
      terrain = [];
      for (let x = 0; x <= W; x++) {
        const y =
          horizonY
          - Math.sin(x * 0.0028 + 0.5) * H * 0.055
          - Math.sin(x * 0.0071 + 2.1) * H * 0.030
          - Math.sin(x * 0.0155 + 1.0) * H * 0.015
          - Math.abs(Math.sin(x * 0.0042 + 3.3)) * H * 0.025;
        terrain.push(y);
      }

      treeLine = [];
      let tx = 20 + Math.random() * 60;
      while (tx < W - 20) {
        treeLine.push({ x: tx, h: 28 + Math.random() * 30, layers: 2 + Math.floor(Math.random() * 2) });
        tx += 30 + Math.random() * 80;
      }
    };

    // ── draw one aurora band ──────────────────────────────────────────────────
    const drawBand = (b: Band) => {
      const pulse = 0.75 + 0.25 * Math.sin(t * b.pulseSpeed + b.pulsePhase);
      const slices = Math.ceil(W / SLICE_W);

      for (let i = 0; i < slices; i++) {
        const x = i * SLICE_W;
        const cx = x + SLICE_W / 2;

        const wave =
          Math.sin(cx * b.freq + t * b.speed + b.phase) * b.waveAmp * H +
          Math.sin(cx * b.freq2 + t * b.speed2 + b.phase2) * b.waveAmp * 0.45 * H;

        const centreY = b.centerY * H + wave;

        const heightMod =
          b.baseHeight * H
          + Math.abs(Math.sin(cx * b.freq * 3.1 + t * b.speed * 1.6 + b.phase)) * b.heightAmp * H;

        const top = centreY - heightMod * 0.55;
        const bottom = centreY + heightMod * 0.45;

        const ray = 0.6 + 0.4 * Math.abs(Math.sin(cx * b.freq * 7 + t * 1.2 + b.phase));
        const a = b.alpha * pulse * ray;

        const grd = ctx.createLinearGradient(0, top - heightMod * 0.3, 0, bottom + heightMod * 0.2);
        grd.addColorStop(0.00, rgba(b.color, 0));
        grd.addColorStop(0.20, rgba(b.color, a * 0.25));
        grd.addColorStop(0.45, rgba(b.color, a));
        grd.addColorStop(0.62, rgba(b.color, a * 0.7));
        grd.addColorStop(0.80, rgba(b.color, a * 0.25));
        grd.addColorStop(1.00, rgba(b.color, 0));

        ctx.fillStyle = grd;
        ctx.fillRect(x, top - heightMod * 0.3, SLICE_W + 1, (bottom + heightMod * 0.2) - (top - heightMod * 0.3));
      }
    };

    // ── main loop ─────────────────────────────────────────────────────────────
    const tick = (time: number) => {
      rafRef.current = requestAnimationFrame(tick);
      
      const elapsed = time - lastFrame;
      if (elapsed < FRAME_MS) return;
      lastFrame = time - (elapsed % FRAME_MS);

      t += 0.007;

      if (skyCache) ctx.drawImage(skyCache, 0, 0);
      else ctx.clearRect(0, 0, W, H);

      drawStars();

      ctx.globalCompositeOperation = 'screen';
      for (const b of BANDS) drawBand(b);
      ctx.globalCompositeOperation = 'source-over';

      if (terrainCache) ctx.drawImage(terrainCache, 0, 0);
    };

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    resize();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none w-full h-full object-cover"
      style={{ zIndex: 0 }}
    />
  );
};

export default AuroraBackground;
