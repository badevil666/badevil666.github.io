import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Code, CheckCircle2, Zap, ChevronDown } from 'lucide-react';
import projects, { type Project } from '../data/projects';

const panelAnim = (fromX: number, delay = 0) => ({
  initial: { opacity: 0, x: fromX, filter: 'blur(8px)' },
  whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const itemAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const ImagePanel = ({ project, flip }: { project: Project; flip: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <motion.div
      {...panelAnim(flip ? 60 : -60, 0)}
      ref={ref}
      className="relative w-full md:w-[48%] h-72 md:h-auto md:min-h-[540px] rounded-2xl overflow-hidden flex-shrink-0"
    >
      <motion.div style={{ y: imgY }} className="absolute inset-[-8%] w-[116%] h-[116%]">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover brightness-[0.4]" />
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} mix-blend-screen opacity-60`} />
      <div className="absolute top-5 left-5">
        <span className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-sm text-[#d2d2d7]">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
};

const DetailPanel = ({ project, onSelect, flip }: { project: Project; onSelect: () => void; flip: boolean }) => (
  <motion.div
    {...panelAnim(flip ? -60 : 60, 0.1)}
    className="flex flex-col justify-center gap-7 md:w-[48%]"
  >
    <motion.div {...itemAnim(0.18)}>
      <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ink mb-3">{project.title}</h3>
      <p className="text-muted leading-relaxed text-[15px]">{project.description}</p>
    </motion.div>

    <motion.div {...itemAnim(0.26)}>
      <p className="text-[13px] text-muted mb-3 font-medium">Key features</p>
      <ul className="flex flex-col gap-2.5">
        {project.features.map((f, i) => (
          <motion.li
            key={f}
            {...itemAnim(0.28 + i * 0.05)}
            className="flex items-start gap-2.5 text-sm text-[#d2d2d7] leading-snug"
          >
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted" />
            {f}
          </motion.li>
        ))}
      </ul>
    </motion.div>

    <motion.div
      {...itemAnim(0.42)}
      className="rounded-xl border border-white/10 bg-black p-4 flex gap-3 items-start"
    >
      <Zap className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
      <p className="text-xs text-muted leading-relaxed">{project.highlight}</p>
    </motion.div>

    <motion.div {...itemAnim(0.5)}>
      <p className="text-[13px] text-muted mb-3 font-medium">Tech stack</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t, i) => (
          <motion.span
            key={t.name}
            {...itemAnim(0.52 + i * 0.04)}
            className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-black text-[#d2d2d7]"
          >
            {t.name}
          </motion.span>
        ))}
      </div>
    </motion.div>

    <motion.div {...itemAnim(0.58)} className="flex gap-3">
      <button
        onClick={onSelect}
        className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-[#e8e8ed] transition-colors"
      >
        Read More <BookOpen className="w-3.5 h-3.5" />
      </button>
      <a
        href={project.github}
        className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/5 transition-colors border border-white/15"
      >
        Source <Code className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  </motion.div>
);

const ProjectRow = ({ project, onSelect }: { project: Project; onSelect: () => void }) => (
  <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center w-full">
    {project.flip
      ? <><DetailPanel project={project} onSelect={onSelect} flip={true} /><ImagePanel project={project} flip={true} /></>
      : <><ImagePanel project={project} flip={false} /><DetailPanel project={project} onSelect={onSelect} flip={false} /></>
    }
  </div>
);

const Projects = ({ onSelect }: { onSelect: (project: Project) => void }) => (
  <section id="projects" className="w-full">
    {/* Header — full-screen landing page for the projects section */}
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-center relative px-6">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-ink">
          Selected work
        </h2>
        <p className="mt-4 text-muted text-lg">A few things I've built</p>
      </motion.div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[13px] text-muted font-medium">Scroll to explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/25 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-full bg-white/70"
          />
        </div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-muted" />
        </motion.div>
      </motion.div>
    </div>

    <div className="flex flex-col w-full">
      {projects.map((project, i) => (
        <div
          key={project.title}
          id={`project-${i}`}
          className="min-h-screen w-full flex items-center justify-center snap-center px-6 md:px-12 py-16"
        >
          <div className="max-w-6xl w-full mx-auto">
            <ProjectRow project={project} onSelect={() => onSelect(project)} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;