import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// ── Inline SVG brand icons ────────────────────────────────────────────────────

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15">
    <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="10" ry="3.6" fill="none" stroke="#61DAFB" strokeWidth="1.4" />
    <ellipse cx="12" cy="12" rx="10" ry="3.6" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.6" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 12 12)" />
  </svg>
);

const FlutterIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="#54C5F8">
    <polygon points="14,2 3,13 7,17 22,2" opacity="0.9" />
    <polygon points="7,17 14,24 22,16 15,9" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="#F05032">
    <path d="M23.5 11.5l-11-11a1.7 1.7 0 00-2.4 0l-2.4 2.4 3 3a2 2 0 012.6 2.6l2.9 2.9a2 2 0 112.4 2.4 2 2 0 01-2.7-2.7L15.6 9v7.8a2 2 0 11-2.4.1 2 2 0 00-.5-2.5V7a2 2 0 00-1.2-3.7 2 2 0 00-1.2 3.5v.4A2 2 0 0011 9.3v7.4a2 2 0 101.9.1V9.7a2 2 0 00-.6-3.9L9.4 2.9.5 11.8a1.7 1.7 0 000 2.4l11 11a1.7 1.7 0 002.4 0l9.6-9.6a1.7 1.7 0 000-2.4z" />
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#2496ED">
    <path d="M13.5 9h2v2h-2zM10.5 9h2v2h-2zM7.5 9h2v2h-2zM13.5 6h2v2h-2zM10.5 6h2v2h-2zM10.5 3h2v2h-2zM7.5 6h2v2h-2zM4.5 9h2v2h-2zM22.6 10.4a3.8 3.8 0 00-2.6-.9h-.3a4 4 0 00-1.1-3.3l-.5-.5-.5.5a4.7 4.7 0 00-.9 2.7v.4H4.3A4.3 4.3 0 000 13.2c0 1 .1 1.9.5 2.9C1.4 18.5 3 20 5 20c2 0 3.5-.8 4.5-2.5.7 1 1.9 1.5 3.4 1.5h2.3c1.6 0 2.9-.7 3.7-1.8a6 6 0 001.4.2 5.4 5.4 0 004-1.8 6 6 0 001.2-4.7l-.1-.5h-.8z" />
  </svg>
);

// Generic colored badge for everything else
const Badge = ({ label, color }: { label: string; color: string }) => (
  <div
    className="w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-bold leading-none flex-shrink-0"
    style={{ background: `${color}22`, border: `1px solid ${color}55`, color }}
  >
    {label}
  </div>
);

// ── Tech data ─────────────────────────────────────────────────────────────────

type TechItem = { name: string; icon: ReactNode };

const ROW1: TechItem[] = [
  { name: 'JavaScript', icon: <Badge label="JS" color="#F7DF1E" /> },
  { name: 'TypeScript', icon: <Badge label="TS" color="#3178C6" /> },
  { name: 'Python', icon: <Badge label="Py" color="#3776AB" /> },
  { name: 'React', icon: <ReactIcon /> },
  { name: 'Node.js', icon: <Badge label="N" color="#339933" /> },
  { name: 'FastAPI', icon: <Badge label="⚡" color="#009688" /> },
  { name: 'Flutter', icon: <FlutterIcon /> },
  { name: 'Android', icon: <Badge label="🤖" color="#3DDC84" /> },
  { name: 'Dart', icon: <Badge label="Dt" color="#0175C2" /> },
];

const ROW2: TechItem[] = [
  { name: 'PostgreSQL', icon: <Badge label="PG" color="#336791" /> },
  { name: 'MySQL', icon: <Badge label="My" color="#4479A1" /> },
  { name: 'ClickHouse', icon: <Badge label="CH" color="#FFCC00" /> },
  { name: 'Git', icon: <GitIcon /> },
  { name: 'Docker', icon: <DockerIcon /> },
  { name: 'Express.js', icon: <Badge label="Ex" color="#cccccc" /> },
  { name: 'SQL', icon: <Badge label="SQL" color="#F29111" /> },
  { name: 'Burp Suite', icon: <Badge label="🔥" color="#FF6633" /> },
  { name: 'OWASP', icon: <Badge label="⚔️" color="#a855f7" /> },
];

// ── Marquee row ───────────────────────────────────────────────────────────────

const MarqueeRow = ({
  items,
  direction,
  duration,
}: {
  items: TechItem[];
  direction: 'left' | 'right';
  duration: number;
}) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-slate-300 text-sm font-medium whitespace-nowrap flex-shrink-0"
          >
            {tech.icon}
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────

const Hero = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const orbScale = useTransform(scrollY, [0, 500], [1, 1.5]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden pb-16">
      {/* Pulsing orb */}
      <motion.div style={{ scale: orbScale }} className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] -z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full bg-purple-500/20 rounded-full blur-[100px]"
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center"
      >
        <motion.p
          custom={0} initial="hidden" animate="visible" variants={textVariants}
          className="text-emerald-400 font-medium tracking-widest uppercase mb-4 text-sm md:text-base"
        >
          Full Stack Developer | Backend, Frontend, Mobile App & Security Focus
        </motion.p>

        <motion.h1
          custom={1} initial="hidden" animate="visible" variants={textVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-4"
        >
          Tom <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Cherian</span>
        </motion.h1>

        <motion.p
          custom={2} initial="hidden" animate="visible" variants={textVariants}
          className="text-lg md:text-xl text-slate-300 max-w-2xl font-light mb-8"
        >
          I build scalable web and mobile applications, design efficient backend systems, and test them for security vulnerabilities.
        </motion.p>

        {/* Tech stack marquee */}
        <motion.div
          custom={3} initial="hidden" animate="visible" variants={textVariants}
          className="w-full max-w-3xl flex flex-col gap-3"
        >
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Tech Stack</p>
          <MarqueeRow items={ROW1} direction="left" duration={28} />
          <MarqueeRow items={ROW2} direction="right" duration={22} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-400 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-full bg-white"
          />
        </div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
