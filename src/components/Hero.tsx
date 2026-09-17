import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Cake, Code2, Briefcase, ArrowRight } from 'lucide-react';
import profileImg from '../assets/hero.jpg';
import { scrollToId } from '../utils/smoothScroll';

// ── Quick facts — who this is, at a glance ─────────────────────────────────────

const QUICK_FACTS: { icon: ReactNode; label: string }[] = [
  { icon: <MapPin className="w-4 h-4" />, label: 'Based in India' },
  { icon: <Cake className="w-4 h-4" />, label: '23 years old' },
  { icon: <Code2 className="w-4 h-4" />, label: 'Full-Stack Developer' },
  { icon: <Briefcase className="w-4 h-4" />, label: '1+ year of work experience' },
];

// ── Impact stats — real numbers, not vanity ones ───────────────────────────────

const STATS = [
  { value: '1+', label: 'Year of experience' },
  { value: '5', label: 'Projects shipped' },
  { value: '2', label: 'Vulnerabilities found' },
  { value: '1', label: 'App live on Play Store' },
];

// ── Key skills — the comprehensive, at-a-glance stack ─────────────────────────

const KEY_SKILLS = [
  'TypeScript', 'JavaScript', 'Python', 'React', 'Node.js', 'Express.js',
  'FastAPI', 'Flutter', 'Dart', 'PostgreSQL', 'Docker', 'Burp Suite',
];

// ── What I do — services, stated plainly ──────────────────────────────────────

const SERVICES = [
  'Full-stack web development',
  'Mobile app development — Flutter & native Android',
  'Backend & API architecture',
  'Security testing & VAPT',
  'Shipping to production — solo, end to end',
];

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/badevil666',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tom-cherian-a599ba373/',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
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
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.452-5.439-5.452z" />
      </svg>
    ),
  },
];

const textVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

// ── Hero ──────────────────────────────────────────────────────────────────────

const Hero = () => (
  <section id="hero" className="relative w-full min-h-screen flex flex-col justify-center px-5 sm:px-8 py-20 md:py-14">
    <div className="w-full max-w-6xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* ── Photo: first on mobile, top-right on desktop ── */}
        <motion.div
          custom={1} initial="hidden" animate="visible" variants={textVariants}
          className="flex justify-center md:justify-start order-1 md:order-none md:col-start-2 md:row-start-1 mb-2 md:mb-0"
        >
          <div className="relative">
            <div className="absolute inset-[-16px] rounded-full bg-white/[0.05] blur-2xl pointer-events-none" />
            <div className="relative p-[3px] rounded-full border border-white/15">
              <img
                src={profileImg}
                alt="Tom Cherian"
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>

        {/* ── Identity: name, facts, bio, CTA — second on mobile, left column on desktop ── */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-none md:col-start-1 md:row-start-1 md:row-span-2 min-w-0 w-full">
          <motion.h1
            custom={0} initial="hidden" animate="visible" variants={textVariants}
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.08] mb-2.5 text-ink"
          >
            Tom Cherian
          </motion.h1>

          <motion.p
            custom={1} initial="hidden" animate="visible" variants={textVariants}
            className="text-lg sm:text-xl text-[#d2d2d7] font-normal tracking-[-0.01em] mb-4"
          >
            Full-stack engineer. Security-minded.
          </motion.p>

          <motion.div
            custom={2} initial="hidden" animate="visible" variants={textVariants}
            className="flex flex-col gap-1.5 items-center md:items-start mb-4"
          >
            {QUICK_FACTS.map((fact) => (
              <div key={fact.label} className="flex items-center gap-2 text-sm text-[#d2d2d7]">
                <span className="text-muted">{fact.icon}</span>
                {fact.label}
              </div>
            ))}
          </motion.div>

          <motion.p
            custom={3} initial="hidden" animate="visible" variants={textVariants}
            className="text-sm sm:text-[15px] text-muted max-w-full md:max-w-md leading-relaxed mb-5"
          >
            I am a full-stack developer specializing in web and mobile
            application development. I have built and deployed numerous web
            and mobile applications, working across both frontend and backend
            technologies. In my free time, I explore cybersecurity and
            conduct security research.
          </motion.p>

          <motion.div
            custom={4} initial="hidden" animate="visible" variants={textVariants}
            className="flex flex-wrap gap-3 justify-center md:justify-start mb-5"
          >
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollToId('contact'); }}
              className="px-5 py-2.5 bg-accent rounded-full text-sm font-semibold text-white hover:bg-[#4facff] transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              onClick={e => { e.preventDefault(); scrollToId('projects'); }}
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-white/15 hover:bg-white/5 transition-colors"
            >
              View Projects
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            custom={5} initial="hidden" animate="visible" variants={textVariants}
            className="flex items-center gap-2 justify-center md:justify-start mb-6"
          >
            {SOCIALS.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-black text-muted hover:text-ink hover:border-white/25 transition-colors duration-200"
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Impact stats */}
          <motion.div
            custom={6} initial="hidden" animate="visible" variants={textVariants}
            className="flex flex-wrap gap-x-7 gap-y-3 justify-center md:justify-start"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-xl font-semibold text-ink tracking-[-0.02em]">{stat.value}</span>
                <span className="text-[11px] text-muted mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Key skills + What I do — last on mobile, bottom-right on desktop ── */}
        <div className="flex flex-col items-center md:items-start order-3 md:order-none md:col-start-2 md:row-start-2 w-full">
          <motion.div
            custom={2} initial="hidden" animate="visible" variants={textVariants}
            className="w-full text-center md:text-left mb-5"
          >
            <h2 className="text-xs font-medium text-muted uppercase tracking-wide mb-3">Key skills</h2>
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
              {KEY_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 bg-black text-[#d2d2d7]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            custom={3} initial="hidden" animate="visible" variants={textVariants}
            className="w-full text-center md:text-left"
          >
            <h2 className="text-xs font-medium text-muted uppercase tracking-wide mb-3">What I do</h2>
            <ul className="flex flex-col gap-1.5 items-center md:items-start">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-start gap-2 text-sm text-muted leading-snug">
                  <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 hidden md:block" />
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="flex flex-col items-center gap-1.5 mt-10"
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-full bg-white"
          />
        </div>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4 text-muted" />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
