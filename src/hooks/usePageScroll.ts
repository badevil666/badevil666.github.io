import { useEffect } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';
import projects from '../data/projects';

const DURATION = 860;
const COOLDOWN = 950;

/** Absolute Y from document top — avoids offsetParent ambiguity. */
const absTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

const getTargetIds = (): string[] => {
  const ids = ['hero', 'about', 'skills', 'projects'];
  projects.forEach((_, i) => ids.push(`project-${i}`));
  ids.push('security', 'contact');
  return ids;
};

const getCurrentIndex = (ids: string[]): number => {
  const mid = window.scrollY + window.innerHeight * 0.5;
  let idx = 0;
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && absTop(el) <= mid) idx = i;
  });
  return idx;
};

export const usePageScroll = () => {
  useEffect(() => {
    const ids   = getTargetIds();
    let lastNav = 0;
    let touchStartY = 0;

    const navigate = (dir: 1 | -1) => {
      const now = Date.now();
      if (now - lastNav < COOLDOWN) return;

      const cur  = getCurrentIndex(ids);
      const next = Math.max(0, Math.min(ids.length - 1, cur + dir));
      if (next === cur) return;

      const el = document.getElementById(ids[next]);
      if (!el) return;

      lastNav = now;
      smoothScrollTo(absTop(el), DURATION);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 20) return;
      navigate(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      navigate(diff > 0 ? 1 : -1);
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true  });

    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);
};
