import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import tcIcon from '../assets/tc-icon.png';
import tcWordmarkText from '../assets/tc-wordmark-text.png';
import { pauseSmoothScroll, resumeSmoothScroll } from '../utils/smoothScroll';

// Hold time before the exit begins. Sized so the (now 2.2s) shine sweep on
// the icon finishes cleanly before the overlay starts fading out.
const HOLD_MS = 3000;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_POP = [0.34, 1.56, 0.64, 1] as const;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Splash = () => {
  // Reduced-motion visitors never see the splash at all — no flash-then-hide.
  const [show, setShow] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = 'hidden';
    pauseSmoothScroll();

    const timer = setTimeout(() => setShow(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
        resumeSmoothScroll();
      }}
    >
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center gap-10 px-8"
        >
          {/* Icon — pops in, then a chrome shine sweeps across its own shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_POP }}
            className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52"
          >
            <img src={tcIcon} alt="" className="w-full h-full object-contain" />
            <div
              className="absolute inset-0 splash-shine pointer-events-none"
              style={{
                WebkitMaskImage: `url(${tcIcon})`,
                maskImage: `url(${tcIcon})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />
          </motion.div>

          {/* Wordmark — the real stylized chrome lettering, icon cropped out */}
          <motion.img
            src={tcWordmarkText}
            alt="Tom Cherian — Build. Create. Evolve."
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT }}
            className="h-12 sm:h-16 md:h-20 w-auto max-w-[88vw] object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Splash;
