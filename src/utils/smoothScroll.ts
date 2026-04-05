import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const initSmoothScroll = () => {
  if (lenisInstance) return () => {};

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
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
