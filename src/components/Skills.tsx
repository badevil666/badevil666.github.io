import { motion } from 'framer-motion';
import { Code2, Server, MonitorSmartphone, Shield, Database, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';

type Category = {
  name: string;
  desc: string;
  icon: ReactNode;
  skills: string[];
};

const CATEGORIES: Category[] = [
  {
    name: 'Languages',
    desc: 'The foundation',
    icon: <Code2 className="w-5 h-5" />,
    skills: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'Dart'],
  },
  {
    name: 'Backend',
    desc: 'Server & APIs',
    icon: <Server className="w-5 h-5" />,
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
  },
  {
    name: 'Mobile & Frontend',
    desc: 'User-facing layers',
    icon: <MonitorSmartphone className="w-5 h-5" />,
    skills: ['HTML', 'CSS', 'React', 'Flutter'],
  },
  {
    name: 'Databases',
    desc: 'Data layer',
    icon: <Database className="w-5 h-5" />,
    skills: ['MySQL', 'PostgreSQL', 'ClickHouse'],
  },
  {
    name: 'Security',
    desc: 'Offensive & defensive',
    icon: <Shield className="w-5 h-5" />,
    skills: ['Burp Suite', 'Nmap', 'Metasploit'],
  },
  {
    name: 'Tools & Infra',
    desc: 'Dev ecosystem',
    icon: <Wrench className="w-5 h-5" />,
    skills: ['Git', 'Docker', 'Cloudflare'],
  },
];

const SkillCard = ({ cat, index }: { cat: Category; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: false, amount: 0.15 }}
    transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    className="group relative rounded-2xl border border-white/10 bg-black p-6 flex flex-col gap-5 transition-colors duration-300 hover:border-white/20 cursor-default"
  >
    {/* Header */}
    <div className="flex items-center gap-3">
      <div className="bg-white/[0.06] text-ink p-2.5 rounded-xl">
        {cat.icon}
      </div>
      <div>
        <h3 className="font-semibold text-ink text-base leading-tight">{cat.name}</h3>
        <p className="text-xs text-muted mt-0.5">{cat.desc}</p>
      </div>
    </div>

    {/* Skill chips */}
    <div className="flex flex-wrap gap-2">
      {cat.skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-black text-[#d2d2d7]"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => (
  <section id="skills" className="w-full px-6 md:px-12 py-24 md:py-32">
    <div className="max-w-6xl w-full mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-ink">Technical arsenal</h2>
        <p className="mt-3 text-muted text-base">Tools and technologies I work with</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, i) => (
          <SkillCard key={cat.name} cat={cat} index={i} />
        ))}
      </div>

    </div>
  </section>
);

export default Skills;
