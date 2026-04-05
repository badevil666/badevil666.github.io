import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Code2, ShieldCheck, Layers } from 'lucide-react';
import profileImg from '../assets/hero.jpg';
import { scrollToId } from '../utils/smoothScroll';

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
  { name: 'Python',     icon: <Badge label="Py" color="#3776AB" /> },
  { name: 'React',      icon: <ReactIcon /> },
  { name: 'Node.js',    icon: <Badge label="N" color="#339933" /> },
  { name: 'FastAPI',    icon: <Badge label="⚡" color="#009688" /> },
  { name: 'Flutter',    icon: <FlutterIcon /> },
  { name: 'Android',    icon: <Badge label="🤖" color="#3DDC84" /> },
  { name: 'Dart',       icon: <Badge label="Dt" color="#0175C2" /> },
];

const ROW2: TechItem[] = [
  { name: 'PostgreSQL', icon: <Badge label="PG" color="#336791" /> },
  { name: 'MySQL',      icon: <Badge label="My" color="#4479A1" /> },
  { name: 'ClickHouse', icon: <Badge label="CH" color="#FFCC00" /> },
  { name: 'Git',        icon: <GitIcon /> },
  { name: 'Docker',     icon: <DockerIcon /> },
  { name: 'Express.js', icon: <Badge label="Ex" color="#cccccc" /> },
  { name: 'SQL',        icon: <Badge label="SQL" color="#F29111" /> },
  { name: 'Burp Suite', icon: <Badge label="🔥" color="#FF6633" /> },
  { name: 'OWASP',      icon: <Badge label="⚔️" color="#a855f7" /> },
];

// ── Marquee row ───────────────────────────────────────────────────────────────

const MarqueeRow = ({ items, direction, duration }: { items: TechItem[]; direction: 'left' | 'right'; duration: number }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-3 w-max" style={{ animation: `marquee-${direction} ${duration}s linear infinite` }}>
        {doubled.map((tech, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-slate-300 text-sm font-medium whitespace-nowrap flex-shrink-0">
            {tech.icon}
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Floating badge ────────────────────────────────────────────────────────────

const FloatBadge = ({
  icon,
  label,
  sub,
  color,
  delay,
  className,
}: {
  icon: ReactNode;
  label: string;
  sub: string;
  color: string;
  delay: number;
  className: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute ${className} glass border border-white/10 rounded-2xl px-3 py-2.5 flex items-center gap-2.5 shadow-xl backdrop-blur-md z-10`}
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
      className="flex items-center gap-2.5"
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-100 leading-tight">{label}</p>
        <p className="text-[10px] text-slate-500 leading-tight">{sub}</p>
      </div>
    </motion.div>
  </motion.div>
);

// ── Hero ──────────────────────────────────────────────────────────────────────

const Hero = () => {
  const { scrollY } = useScroll();
  const heroY       = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const orbScale    = useTransform(scrollY, [0, 500], [1, 1.5]);

  const textVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden pb-8">

      {/* Pulsing orb */}
      <motion.div style={{ scale: orbScale, willChange: 'transform' }} className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full bg-purple-500/20 rounded-full blur-[120px]"
          style={{ willChange: 'transform, opacity' }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center gap-14"
      >
        {/* Two-column: text + photo */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
            <motion.p
              custom={0} initial="hidden" animate="visible" variants={textVariants}
              className="text-emerald-400 font-semibold tracking-widest uppercase mb-4 text-sm"
            >
              Full Stack Developer &amp; Security Focus
            </motion.p>

            <motion.h1
              custom={1} initial="hidden" animate="visible" variants={textVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-5"
            >
              Tom{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                Cherian
              </span>
            </motion.h1>

            <motion.p
              custom={2} initial="hidden" animate="visible" variants={textVariants}
              className="text-base md:text-lg text-slate-400 max-w-xl font-light leading-relaxed mb-8"
            >
              I build scalable web and mobile applications, design efficient backend
              systems, and test them for security vulnerabilities.
            </motion.p>

            <motion.div
              custom={3} initial="hidden" animate="visible" variants={textVariants}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); scrollToId('contact'); }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); scrollToId('projects'); }}
                className="px-6 py-3 glass rounded-full text-sm font-semibold border border-white/15 hover:bg-white/10 transition-colors"
              >
                View Projects
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              custom={4} initial="hidden" animate="visible" variants={textVariants}
              className="flex items-center gap-2 justify-center md:justify-start mt-5"
            >
              <div className="h-px w-8 bg-white/15" />
              {[
                {
                  label: 'GitHub',
                  href: 'https://github.com/badevil666',
                  color: '#e2e8f0',
                  icon: (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/tom-cherian-a599ba373/',
                  color: '#0A66C2',
                  icon: (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: 'Twitter / X',
                  href: 'https://twitter.com/',
                  color: '#e2e8f0',
                  icon: (
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  href: 'https://instagram.com/',
                  color: '#E1306C',
                  icon: (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: 'Upwork',
                  href: 'https://www.upwork.com/freelancers/~01504aced8c8c9471d?mp_source=share',
                  color: '#14a800',
                  icon: (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.452-5.439-5.452z" />
                    </svg>
                  ),
                },
              ].map(({ label, href, color, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm text-slate-400 transition-colors duration-200"
                  style={{ '--hover-color': color } as React.CSSProperties}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.color = color;
                    el.style.borderColor = `${color}50`;
                    el.style.boxShadow = `0 0 16px ${color}30`;
                    el.style.background = `${color}12`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.color = '';
                    el.style.borderColor = '';
                    el.style.boxShadow = '';
                    el.style.background = '';
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            custom={1} initial="hidden" animate="visible" variants={textVariants}
            className="flex justify-center items-center order-1 md:order-2"
          >
            <div className="relative">

              {/* Outer ambient glow */}
              <div className="absolute inset-[-30px] rounded-full bg-gradient-to-br from-purple-600/25 via-violet-500/15 to-emerald-500/20 blur-3xl pointer-events-none" />

              {/* Rotating gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-4px] rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #a855f7, #6d28d9, #10b981, #a855f7)',
                  borderRadius: '50%',
                  padding: '3px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              {/* Static gradient ring (so photo doesn't spin) */}
              <div className="relative p-[3px] rounded-full bg-gradient-to-br from-purple-500 via-violet-600 to-emerald-500">
                <div className="p-1 rounded-full bg-obsidian">
                  <img
                    src={profileImg}
                    alt="Tom Cherian"
                    className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Floating badge — top right */}
              <FloatBadge
                icon={<Code2 className="w-4 h-4" />}
                label="Full Stack"
                sub="Web · Mobile · API"
                color="#a855f7"
                delay={0.8}
                className="-top-4 -right-4 md:-right-12"
              />

              {/* Floating badge — bottom left */}
              <FloatBadge
                icon={<ShieldCheck className="w-4 h-4" />}
                label="Security"
                sub="VAPT · OWASP"
                color="#10b981"
                delay={1.0}
                className="-bottom-4 -left-4 md:-left-12"
              />

              {/* Floating badge — right middle */}
              <FloatBadge
                icon={<Layers className="w-4 h-4" />}
                label="3+ Projects"
                sub="Shipped to users"
                color="#6d28d9"
                delay={1.2}
                className="top-1/2 -translate-y-1/2 -right-6 md:-right-16"
              />

            </div>
          </motion.div>
        </div>

        {/* ── Marquee ── */}
        <motion.div
          custom={5} initial="hidden" animate="visible" variants={textVariants}
          className="w-full max-w-3xl flex flex-col gap-3"
        >
          <p className="text-xs uppercase tracking-widest text-slate-600 text-center mb-1">Tech Stack</p>
          <MarqueeRow items={ROW1} direction="left"  duration={28} />
          <MarqueeRow items={ROW2} direction="right" duration={22} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-400 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-full bg-white"
          />
        </div>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
