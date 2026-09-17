import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Cpu, FolderOpen, Trophy, ShieldCheck, Mail, GitBranch } from 'lucide-react';
import projects from '../data/projects';
import { scrollToId } from '../utils/smoothScroll';

const NAV_ITEMS = [
  { id: 'hero',         label: 'Home',         icon: Home        },
  { id: 'skills',       label: 'Skills',       icon: Cpu         },
  { id: 'projects',     label: 'Projects',     icon: FolderOpen  },
  { id: 'achievements', label: 'Achievements', icon: Trophy      },
  { id: 'security',     label: 'Security',     icon: ShieldCheck },
  { id: 'contact',      label: 'Contact',      icon: Mail        },
];

const Navbar = () => {
  const [active, setActive]               = useState('hero');
  // null until a project card actually scrolls into view — prevents the
  // first dot from glowing while the user is still on the Projects intro.
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hovered, setHovered]             = useState<string | null>(null);
  const [isMobile, setIsMobile]           = useState(false);

  useEffect(() => {
    // Match the CSS lg: breakpoint (1024px). Below that we render the
    // bottom-bar layout so the nav never overlaps content on tablets
    // or large phones in landscape.
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    // Coalesce multiple scroll events into a single rAF — at most one
    // recompute per frame even if Lenis fires events faster than 60 Hz.
    // This was the biggest scroll-jank source (12+ getBoundingClientRect
    // calls firing on every wheel tick).
    let rafId = 0;
    let ticking = false;

    const compute = () => {
      ticking = false;
      const mid = window.scrollY + window.innerHeight / 2;
      let current = NAV_ITEMS[0].id;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= mid) {
          current = id;
        }
      }
      setActive(current);

      if (current === 'projects') {
        // Stay null until a project card top has crossed the mid line so
        // the first dot doesn't glow on the Projects intro section.
        let cur: number | null = null;
        for (let i = 0; i < projects.length; i++) {
          const el = document.getElementById(`project-${i}`);
          if (el && el.getBoundingClientRect().top + window.scrollY <= mid) {
            cur = i;
          }
        }
        setActiveProject(cur);
      } else {
        setActiveProject(null);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(compute);
      }
    };

    compute(); // initial state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo        = (id: string) => scrollToId(id);
  const scrollToProject = (i: number)  => scrollToId(`project-${i}`);

  return (
    <motion.aside
      initial={{ opacity: 0, ...(isMobile ? { y: 24 } : { x: -24 }) }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={[
        'fixed z-50 glass border border-white/10 rounded-2xl',
        // Mobile: horizontal bottom bar
        'bottom-4 left-1/2 -translate-x-1/2 flex flex-row items-center gap-0.5 px-2 py-2',
        // Desktop: vertical left bar
        'lg:bottom-auto lg:left-5 lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2 lg:flex-col lg:px-2 lg:py-3',
      ].join(' ')}
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <div key={id} className="flex flex-col items-center">
          {/* Nav button */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => scrollTo(id)}
              onMouseEnter={() => !isMobile && setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className="relative w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl"
            >
              <motion.span
                animate={{ opacity: active === id ? 1 : 0, scale: active === id ? 1 : 0.85 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute inset-0 rounded-xl bg-white/10"
              />
              <motion.div
                animate={{ color: active === id ? '#f5f5f7' : '#6e6e73' }}
                transition={{ duration: 0.22 }}
                className="relative z-10"
              >
                <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.div>
            </button>

            {/* Tooltip — desktop only */}
            <AnimatePresence>
              {!isMobile && hovered === id && (
                <motion.div
                  initial={{ opacity: 0, x: -6, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -6, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-[calc(100%+10px)] px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-xs font-medium text-ink whitespace-nowrap pointer-events-none shadow-xl"
                >
                  {label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Project timeline — desktop only */}
          <AnimatePresence>
            {!isMobile && id === 'projects' && active === 'projects' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex flex-col items-center overflow-hidden"
              >
                <div className="w-px h-2 bg-white/15" />
                {projects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ delay: i * 0.07, duration: 0.25 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative flex items-center justify-center">
                      <button
                        onClick={() => scrollToProject(i)}
                        onMouseEnter={() => setHovered(`project-${i}`)}
                        onMouseLeave={() => setHovered(null)}
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        <motion.div
                          animate={{
                            width:  activeProject === i ? 9 : 6,
                            height: activeProject === i ? 9 : 6,
                            backgroundColor: activeProject === i ? '#2997ff' : 'rgba(255,255,255,0.2)',
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                          className="rounded-full"
                        />
                      </button>
                      <AnimatePresence>
                        {hovered === `project-${i}` && (
                          <motion.div
                            initial={{ opacity: 0, x: -6, scale: 0.92 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -6, scale: 0.92 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-[calc(100%+10px)] px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-xs font-medium text-ink whitespace-nowrap pointer-events-none shadow-xl"
                          >
                            {project.title}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {i < projects.length - 1 && <div className="w-px h-4 bg-white/15" />}
                  </motion.div>
                ))}
                <div className="h-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Divider + GitHub — desktop only */}
      <div className="hidden lg:block my-1 w-6 border-t border-white/10" />
      <div className="hidden lg:flex relative items-center justify-center">
        <a
          href="https://github.com/badevil666"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered('github')}
          onMouseLeave={() => setHovered(null)}
          className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          <GitBranch className="w-5 h-5" />
        </a>
        <AnimatePresence>
          {hovered === 'github' && (
            <motion.div
              initial={{ opacity: 0, x: -6, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -6, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className="absolute left-[calc(100%+10px)] px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-xs font-medium text-ink whitespace-nowrap pointer-events-none shadow-xl"
            >
              GitHub
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default Navbar;
