import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Cpu, FolderOpen, ShieldCheck, Mail, GitBranch } from 'lucide-react';
import projects from '../data/projects';
import { scrollToId } from '../utils/smoothScroll';

const NAV_ITEMS = [
  { id: 'hero',     label: 'Home',     icon: Home        },
  { id: 'about',    label: 'About',    icon: User        },
  { id: 'skills',   label: 'Skills',   icon: Cpu         },
  { id: 'projects', label: 'Projects', icon: FolderOpen  },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'contact',  label: 'Contact',  icon: Mail        },
];

const Navbar = () => {
  const [active, setActive]               = useState('hero');
  const [activeProject, setActiveProject] = useState(0);
  const [hovered, setHovered]             = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;

      // Active section
      let current = NAV_ITEMS[0].id;
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) current = id;
      });
      setActive(current);

      // Active project within the Projects section
      if (current === 'projects') {
        let currentProject = 0;
        projects.forEach((_, i) => {
          const el = document.getElementById(`project-${i}`);
          if (el && el.offsetTop <= mid) currentProject = i;
        });
        setActiveProject(currentProject);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo        = (id: string) => scrollToId(id);
  const scrollToProject = (i: number)  => scrollToId(`project-${i}`);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0.5 glass px-2 py-3 rounded-2xl border border-white/10"
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <div key={id} className="flex flex-col items-center w-full">
          {/* Main nav button */}
          <div className="relative flex items-center w-full justify-center">
            <button
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl"
            >
              <motion.span
                animate={{
                  opacity: active === id ? 1 : 0,
                  scale:   active === id ? 1 : 0.85,
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute inset-0 rounded-xl bg-white/10"
                style={{ boxShadow: '0 0 14px rgba(168,85,247,0.2)' }}
              />
              <motion.div
                animate={{ color: active === id ? '#ffffff' : '#475569' }}
                transition={{ duration: 0.22 }}
                className="relative z-10"
              >
                <Icon className="w-5 h-5" />
              </motion.div>
            </button>

            {/* Tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.div
                  initial={{ opacity: 0, x: -6, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -6, scale: 0.92 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute left-[calc(100%+10px)] px-3 py-1.5 rounded-lg bg-obsidian border border-white/10 text-xs font-medium text-slate-200 whitespace-nowrap pointer-events-none shadow-xl"
                >
                  {label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Project timeline — only under the Projects icon */}
          <AnimatePresence>
            {id === 'projects' && active === 'projects' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center overflow-hidden"
              >
                {/* Line from Projects icon to first dot */}
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
                    {/* Dot + tooltip */}
                    <div className="relative flex items-center justify-center">
                      <button
                        onClick={() => scrollToProject(i)}
                        onMouseEnter={() => setHovered(`project-${i}`)}
                        onMouseLeave={() => setHovered(null)}
                        className="w-8 h-8 flex items-center justify-center group"
                      >
                        <motion.div
                          animate={{
                            width:  activeProject === i ? 9 : 6,
                            height: activeProject === i ? 9 : 6,
                            backgroundColor: activeProject === i
                              ? '#a855f7'
                              : 'rgba(255,255,255,0.2)',
                            boxShadow: activeProject === i
                              ? '0 0 8px rgba(168,85,247,0.6)'
                              : 'none',
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                          className="rounded-full"
                        />
                      </button>

                      {/* Project tooltip */}
                      <AnimatePresence>
                        {hovered === `project-${i}` && (
                          <motion.div
                            initial={{ opacity: 0, x: -6, scale: 0.92 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -6, scale: 0.92 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute left-[calc(100%+10px)] px-3 py-1.5 rounded-lg bg-obsidian border border-white/10 text-xs font-medium text-slate-200 whitespace-nowrap pointer-events-none shadow-xl"
                          >
                            {project.title}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Connector line between dots */}
                    {i < projects.length - 1 && (
                      <div className="w-px h-4 bg-white/15" />
                    )}
                  </motion.div>
                ))}

                {/* Gap before next section icon */}
                <div className="h-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Divider */}
      <div className="my-1 w-6 border-t border-white/10" />

      {/* GitHub */}
      <div className="relative flex items-center justify-center">
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
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute left-[calc(100%+10px)] px-3 py-1.5 rounded-lg bg-obsidian border border-white/10 text-xs font-medium text-slate-200 whitespace-nowrap pointer-events-none shadow-xl"
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
