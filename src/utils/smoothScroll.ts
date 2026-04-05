const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Smoothly animates window.scrollY to targetY over `duration` ms. */
export const smoothScrollTo = (targetY: number, duration = 860): Promise<void> =>
  new Promise(resolve => {
    const startY    = window.scrollY;
    const distance  = targetY - startY;
    if (Math.abs(distance) < 2) { resolve(); return; }

    let startTime: number | null = null;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
      else resolve();
    };

    requestAnimationFrame(step);
  });

/** Absolute Y from document top — avoids offsetParent ambiguity. */
const absTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

/** Scroll to a DOM element by id with smooth easing. */
export const scrollToId = (id: string, duration?: number) => {
  const el = document.getElementById(id);
  if (el) smoothScrollTo(absTop(el), duration);
};
