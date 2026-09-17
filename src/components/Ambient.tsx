import { useEffect, useRef } from 'react';

// A single, quiet light source drifting behind the page — the restrained
// echo of Apple's keynote-stage lighting, not a scene. No color, no motion
// beyond a slow vertical drift tied to scroll, and it steps aside entirely
// under prefers-reduced-motion.
const Ambient = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY * 0.08;
        if (glowRef.current) glowRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        ref={glowRef}
        className="absolute left-1/2 top-[-20vh] w-[120vw] max-w-[1400px] aspect-square -translate-x-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 32%, transparent 65%)',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute right-[-10vw] bottom-[-15vh] w-[70vw] max-w-[900px] aspect-square"
        style={{
          background: 'radial-gradient(circle, rgba(41,151,255,0.05) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default Ambient;
