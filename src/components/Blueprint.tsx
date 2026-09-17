import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code, CheckCircle2, Zap, AlertTriangle, Lightbulb } from 'lucide-react';
import type { Project } from '../data/projects';
import { pauseSmoothScroll, resumeSmoothScroll } from '../utils/smoothScroll';

// ── Sections ──────────────────────────────────────────────────────────────────

const Meta = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap gap-4 text-sm">
    {[
      { label: 'Role',     value: project.role },
      { label: 'Duration', value: project.duration },
    ].map(({ label, value }) => (
      <div key={label} className="flex flex-col gap-1">
        <span className="text-[12px] text-muted">{label}</span>
        <span className="text-ink font-medium">{value}</span>
      </div>
    ))}
    <div className="flex flex-col gap-1">
      <span className="text-[12px] text-muted">Status</span>
      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-white/15 bg-black text-[#d2d2d7] w-fit">
        {project.status}
      </span>
    </div>
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] text-muted font-medium mb-5">{children}</p>
);

// ── Blueprint page ────────────────────────────────────────────────────────────

interface Props {
  project: Project | null;
  onClose: () => void;
  index: number;
  total: number;
}

const Blueprint = ({ project, onClose, index, total }: Props) => {
  // Lock scroll on body while open, and hand wheel/trackpad input over to the
  // modal's own native scroll — Lenis otherwise keeps hijacking it for the
  // (now-locked) page underneath.
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      pauseSmoothScroll();
    } else {
      document.body.style.overflow = '';
      resumeSmoothScroll();
    }
    return () => {
      document.body.style.overflow = '';
      resumeSmoothScroll();
    };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="blueprint"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-obsidian overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          data-lenis-prevent
        >
          {/* ── Sticky top bar ── */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-4 bg-obsidian/80 backdrop-blur-xl border-b border-white/10">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-muted hover:text-ink transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-xs text-muted font-medium hidden sm:block">
              {project.title}
            </span>
            <span className="text-xs text-muted">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* ── Hero image ── */}
          <div className="relative w-full h-[45vh] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover brightness-[0.35]"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} mix-blend-screen opacity-60`} />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />

            {/* Headline on image */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10">
              <span className="text-xs font-medium mb-3 block text-[#d2d2d7]">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-none mb-3">
                {project.title}
              </h1>
              <p className="text-[#d2d2d7] text-base md:text-lg max-w-2xl">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-16">

            {/* Metadata */}
            <Meta project={project} />

            {/* Overview */}
            <div>
              <SectionLabel>Overview</SectionLabel>
              <p className="text-[#d2d2d7] leading-[1.85] text-base max-w-3xl">
                {project.overview}
              </p>
            </div>

            {/* Features + Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <SectionLabel>Key features</SectionLabel>
                <ul className="flex flex-col gap-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#d2d2d7] leading-snug">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <SectionLabel>Architecture highlight</SectionLabel>
                <div className="rounded-2xl border border-white/10 bg-black p-6 flex gap-4 items-start h-fit">
                  <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent" />
                  <p className="text-sm text-[#d2d2d7] leading-relaxed">{project.highlight}</p>
                </div>
              </div>
            </div>

            {/* Challenges */}
            {project.challenges.length > 0 && (
              <div>
                <SectionLabel>Challenges &amp; solutions</SectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {project.challenges.map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-semibold text-ink">{c.title}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted leading-relaxed">{c.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div>
              <SectionLabel>Tech stack</SectionLabel>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <span
                    key={t.name}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-black text-[#d2d2d7]"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 pb-8">
              <a
                href={project.link}
                className="flex items-center gap-2 px-7 py-3 bg-white text-obsidian rounded-full font-semibold hover:bg-[#e8e8ed] transition-colors"
              >
                View Live <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={project.github}
                className="flex items-center gap-2 px-7 py-3 rounded-full font-medium hover:bg-white/5 transition-colors border border-white/15"
              >
                Source Code <Code className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Blueprint;
