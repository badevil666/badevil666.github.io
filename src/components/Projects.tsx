import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Code, CheckCircle2, Zap } from 'lucide-react';
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

const ImagePanel = ({ project, index, flip }: { project: Project; index: number; flip: boolean }) => {
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
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} mix-blend-screen`} />
      <div className="absolute top-5 left-5">
        <span className={`text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border ${project.accentBorder} bg-black/50 backdrop-blur-sm ${project.accentText}`}>
          {project.category}
        </span>
      </div>
      <div className="absolute bottom-4 right-6 text-[90px] font-black text-white/[0.04] leading-none select-none pointer-events-none">
        {String(index + 1).padStart(2, '0')}
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
      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100 mb-3">{project.title}</h3>
      <p className="text-slate-400 font-light leading-relaxed text-[15px]">{project.description}</p>
    </motion.div>

    <motion.div {...itemAnim(0.26)}>
      <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3 font-medium">Key Features</p>
      <ul className="flex flex-col gap-2.5">
        {project.features.map((f, i) => (
          <motion.li
            key={f}
            {...itemAnim(0.28 + i * 0.05)}
            className="flex items-start gap-2.5 text-sm text-slate-300 leading-snug"
          >
            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${project.accentText}`} />
            {f}
          </motion.li>
        ))}
      </ul>
    </motion.div>

    <motion.div
      {...itemAnim(0.42)}
      className={`rounded-xl border ${project.accentBorder} bg-white/[0.03] p-4 flex gap-3 items-start`}
    >
      <Zap className={`w-4 h-4 flex-shrink-0 mt-0.5 ${project.accentText}`} />
      <p className="text-xs text-slate-400 leading-relaxed">{project.highlight}</p>
    </motion.div>

    <motion.div {...itemAnim(0.5)}>
      <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3 font-medium">Tech Stack</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t, i) => (
          <motion.span
            key={t.name}
            {...itemAnim(0.52 + i * 0.04)}
            className="px-3 py-1.5 rounded-full text-xs font-medium border"
            style={{ color: t.color, borderColor: `${t.color}35`, background: `${t.color}12` }}
          >
            {t.name}
          </motion.span>
        ))}
      </div>
    </motion.div>

    <motion.div {...itemAnim(0.58)} className="flex gap-3">
      <button
        onClick={onSelect}
        className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:bg-slate-200 transition-colors"
      >
        Read More <BookOpen className="w-3.5 h-3.5" />
      </button>
      <a
        href={project.github}
        className="flex items-center gap-2 px-6 py-2.5 glass rounded-full text-sm font-medium hover:bg-white/10 transition-colors border border-white/20"
      >
        Source <Code className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  </motion.div>
);

const ProjectRow = ({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) => (
  <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center w-full">
    {project.flip
      ? <><DetailPanel project={project} onSelect={onSelect} flip={true} /><ImagePanel project={project} index={index} flip={true} /></>
      : <><ImagePanel project={project} index={index} flip={false} /><DetailPanel project={project} onSelect={onSelect} flip={false} /></>
    }
  </div>
);

const Projects = ({ onSelect }: { onSelect: (project: Project) => void }) => (
  <section id="projects" className="w-full">
    {/* Header - Centered in its own shorter block so it snaps gracefully before projects begin */}
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[50vh] flex flex-col justify-center items-center text-center snap-center px-6"
    >
      <h2 className="text-4xl font-bold tracking-tight">
        Selected{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Works</span>
      </h2>
      <p className="mt-3 text-slate-500 font-light">A few things I've built</p>
    </motion.div>

    <div className="flex flex-col w-full">
      {projects.map((project, i) => (
        <div
          key={project.title}
          id={`project-${i}`}
          className="min-h-screen w-full flex items-center justify-center snap-center px-6 md:px-12 py-16"
        >
          <div className="max-w-6xl w-full mx-auto">
            <ProjectRow project={project} index={i} onSelect={() => onSelect(project)} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;