import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const initSmoothScroll = () => {
  if (lenisInstance) return () => {};

  lenisInstance = new Lenis({
    // lerp is frame-by-frame interpolation — feels much smoother than the
    // time-based "duration" approach for continuous wheel/touch scrolling.
    // 0.08–0.12 is the sweet spot used by Apple/Linear/Vercel-style sites.
    lerp: 0.09,
    // Premium quint-out easing for jump scrolls (scrollToId).
    easing: (t) => 1 - Math.pow(1 - t, 5),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    // Slightly damp the wheel — default 1 feels twitchy on trackpads.
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
    // Disable Lenis on touch (mobile) — native momentum scrolling is
    // smoother on phones than software lerp.
    syncTouch: false,
  });

  function raf(time: number) {
    if (lenisInstance) {
      lenisInstance.raf(time);
    }
    requestAnimationFrame(raf);
  }
  const rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }
  };
};

export const scrollToId = (id: string, duration?: number) => {
  const target = document.getElementById(id);
  if (!target) return;
  
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: duration || 1.2 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

export const smoothScrollTo = (targetY: number, duration?: number) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(targetY, { duration: duration || 1.2 });
  } else {
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
};
