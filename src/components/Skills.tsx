import { motion } from 'framer-motion';
import { Code2, Server, MonitorSmartphone, Shield, Database, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';

type Skill = { name: string; color: string };
type Category = {
  name: string;
  desc: string;
  icon: ReactNode;
  gradient: string;
  iconBg: string;
  iconColor: string;
  border: string;
  glow: string;
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    name: 'Languages',
    desc: 'The foundation',
    icon: <Code2 className="w-5 h-5" />,
    gradient: 'from-violet-500/15 to-transparent',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
    border: 'hover:border-violet-500/40',
    glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]',
    skills: [
      { name: 'JavaScript', color: '#F7DF1E' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Python', color: '#3776AB' },
      { name: 'Dart', color: '#0175C2' },
      { name: 'SQL', color: '#F29111' },
    ],
  },
  {
    name: 'Backend',
    desc: 'Server & APIs',
    icon: <Server className="w-5 h-5" />,
    gradient: 'from-emerald-500/15 to-transparent',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    border: 'hover:border-emerald-500/40',
    glow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]',
    skills: [
      { name: 'Node.js', color: '#339933' },
      { name: 'Express.js', color: '#cccccc' },
      { name: 'FastAPI', color: '#009688' },
      { name: 'REST APIs', color: '#10b981' },
    ],
  },
  {
    name: 'Mobile & Frontend',
    desc: 'User-facing layers',
    icon: <MonitorSmartphone className="w-5 h-5" />,
    gradient: 'from-sky-500/15 to-transparent',
    iconBg: 'bg-sky-500/15',
    iconColor: 'text-sky-400',
    border: 'hover:border-sky-500/40',
    glow: 'hover:shadow-[0_0_40px_rgba(56,189,248,0.12)]',
    skills: [
      { name: 'React', color: '#61DAFB' },
      { name: 'Flutter', color: '#54C5F8' },
      { name: 'Android Native', color: '#3DDC84' },
    ],
  },
  {
    name: 'Databases',
    desc: 'Data layer',
    icon: <Database className="w-5 h-5" />,
    gradient: 'from-amber-500/15 to-transparent',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    border: 'hover:border-amber-500/40',
    glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]',
    skills: [
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'MySQL', color: '#4479A1' },
      { name: 'ClickHouse', color: '#FFCC00' },
    ],
  },
  {
    name: 'Security',
    desc: 'Offensive & defensive',
    icon: <Shield className="w-5 h-5" />,
    gradient: 'from-rose-500/15 to-transparent',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
    border: 'hover:border-rose-500/40',
    glow: 'hover:shadow-[0_0_40px_rgba(244,63,94,0.12)]',
    skills: [
      { name: 'VAPT', color: '#FF6633' },
      { name: 'Burp Suite', color: '#FF6633' },
      { name: 'OWASP Top 10', color: '#a855f7' },
    ],
  },
  {
    name: 'Tools & Infra',
    desc: 'Dev ecosystem',
    icon: <Wrench className="w-5 h-5" />,
    gradient: 'from-slate-400/15 to-transparent',
    iconBg: 'bg-slate-400/10',
    iconColor: 'text-slate-400',
    border: 'hover:border-slate-400/40',
    glow: 'hover:shadow-[0_0_40px_rgba(148,163,184,0.10)]',
    skills: [
      { name: 'Git', color: '#F05032' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'Auth / JWT', color: '#10b981' },
    ],
  },
];

const SkillCard = ({ cat, index }: { cat: Category; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: false, amount: 0.15 }}
    transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 flex flex-col gap-5 transition-all duration-500 cursor-default ${cat.border} ${cat.glow}`}
  >
    {/* Gradient tint top-left */}
    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.gradient} opacity-60 pointer-events-none`} />

    {/* Header */}
    <div className="relative flex items-center gap-3">
      <div className={`${cat.iconBg} ${cat.iconColor} p-2.5 rounded-xl`}>
        {cat.icon}
      </div>
      <div>
        <h3 className="font-semibold text-slate-100 text-base leading-tight">{cat.name}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{cat.desc}</p>
      </div>
    </div>

    {/* Skill chips */}
    <div className="relative flex flex-wrap gap-2">
      {cat.skills.map((skill) => (
        <span
          key={skill.name}
          className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-300"
          style={{
            color: skill.color,
            borderColor: `${skill.color}30`,
            background: `${skill.color}10`,
          }}
        >
          {skill.name}
        </span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => (
  <section id="skills" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-14 text-center"
    >
      <h2 className="text-4xl font-bold tracking-tight">
        Technical{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-purple-500">
          Arsenal
        </span>
      </h2>
      <p className="mt-3 text-slate-500 text-base font-light">Tools and technologies I work with</p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {CATEGORIES.map((cat, i) => (
        <SkillCard key={cat.name} cat={cat} index={i} />
      ))}
    </div>
  </section>
);

export default Skills;
