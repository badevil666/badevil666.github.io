import { motion } from 'framer-motion';
import { Trophy, Award, Medal, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Achievement = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  context: string;
  year: string;
};

// Newest first so the timeline reads top → bottom as latest → earliest, the
// way recruiters scan. Reverse this order if you'd prefer chronological.
const ACHIEVEMENTS: Achievement[] = [
  {
    icon: Award,
    title: 'Best B.Tech Final-Year Project',
    subtitle: 'DeCloud — Decentralized Storage Network',
    description:
      'DeCloud was selected as the best B.Tech final-year project — a peer-to-peer file storage network with Ethereum-based provider rewards, Node.js backend, Solidity smart contracts, and a Flutter wallet client.',
    context: 'B.Tech Capstone · Final Year',
    year: '2026',
  },
  {
    icon: Medal,
    title: '2nd Place — Inter-College Hackathon',
    subtitle: 'UniMate · Student Assistant App',
    description:
      'Built UniMate, a student-life assistant app, and placed second in a multi-college hackathon during my second year.',
    context: 'Rajiv Gandhi Institute of Technology, Kottayam · Year 2',
    year: '2024',
  },
  {
    icon: Trophy,
    title: '1st Place — RIT Hackathon',
    subtitle: 'Supermarket Management System',
    description:
      'Won first place in the first-year hackathon at Rajiv Gandhi Institute of Technology, Kottayam by designing and building a full supermarket inventory + POS system inside the time window.',
    context: 'Rajiv Gandhi Institute of Technology, Kottayam · Year 1',
    year: '2022',
  },
  {
    icon: GraduationCap,
    title: "Principal's Trophy",
    subtitle: 'Best Student in Computer Science',
    description:
      'Recognized as the top Computer Science student of the graduating class by the school principal.',
    context: "St Mary's HSS Pattom · Grade 11",
    year: '2020',
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 36, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const slideIn = (fromLeft: boolean, delay = 0) => ({
  initial: { opacity: 0, x: fromLeft ? -50 : 50, filter: 'blur(8px)' },
  whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const Card = ({ a }: { a: Achievement }) => {
  const Icon = a.icon;
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-black border border-white/10 p-6 md:p-7 transition-colors duration-300 hover:border-white/20">
      {/* Mobile-only header row: icon + year (timeline node is hidden on mobile) */}
      <div className="md:hidden flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.06] text-ink">
          <Icon className="w-5 h-5" strokeWidth={1.8} />
        </div>
        <span className="text-xs tracking-wide text-muted">{a.year}</span>
      </div>

      <div className="mb-3">
        <h3 className="text-lg md:text-xl font-semibold text-ink leading-tight mb-1.5">
          {a.title}
        </h3>
        <p className="text-sm font-medium text-[#d2d2d7]">{a.subtitle}</p>
      </div>

      <p className="text-[14px] text-muted leading-relaxed mb-5">
        {a.description}
      </p>

      <div className="pt-4 border-t border-white/10">
        <p className="text-[12px] text-muted">{a.context}</p>
      </div>
    </div>
  );
};

const Achievements = () => (
  <section
    id="achievements"
    className="min-h-screen w-full px-6 md:px-12 py-24 md:py-32"
  >
    <div className="max-w-6xl mx-auto w-full">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <motion.div {...fade(0)} className="mb-16 md:mb-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-ink">
          A few wins along the way.
        </h2>
        <p className="text-muted mt-4 max-w-2xl">
          Awards and competitions where my work was recognized — from school
          through to my B.Tech capstone.
        </p>
      </motion.div>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <div className="relative">
        {/* Vertical line — left edge on mobile, dead center on desktop */}
        <div
          className={[
            'absolute top-0 bottom-0 w-px',
            'left-5 md:left-1/2 md:-translate-x-1/2',
            'bg-gradient-to-b from-transparent via-white/15 to-transparent',
          ].join(' ')}
          aria-hidden="true"
        />

        <ol className="flex flex-col gap-12 md:gap-20">
          {ACHIEVEMENTS.map((a, i) => {
            const onLeft = i % 2 === 0; // desktop: alternate sides
            const Icon = a.icon;
            return (
              <li key={a.title} className="relative">
                {/* Timeline node (icon-on-line) */}
                <motion.div
                  {...fade(0.1)}
                  className={[
                    'absolute z-10',
                    'left-5 md:left-1/2',
                    '-translate-x-1/2',
                    'top-6 md:top-1/2 md:-translate-y-1/2',
                  ].join(' ')}
                >
                  <div
                    className={[
                      // Hide the desktop node on small screens because we render
                      // the icon inside each card on mobile to save horizontal room
                      'hidden md:flex',
                      'w-14 h-14 rounded-full items-center justify-center',
                      'bg-obsidian border-2 border-white/20 text-ink',
                    ].join(' ')}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.9} />
                  </div>
                  {/* Mobile: simple dot on the line so the line has rhythm */}
                  <div className="md:hidden w-3 h-3 rounded-full bg-white/40" />
                </motion.div>

                {/* Desktop: year label on the side opposite to the card,
                    quiet and small — a date, not a decoration. */}
                <motion.div
                  {...fade(0.15)}
                  className={[
                    'hidden md:block absolute top-1/2 -translate-y-1/2 pointer-events-none',
                    onLeft
                      ? 'left-1/2 ml-12 text-left'
                      : 'right-1/2 mr-12 text-right',
                  ].join(' ')}
                >
                  <span className="text-sm font-medium text-muted tracking-wide">
                    {a.year}
                  </span>
                </motion.div>

                {/* Card */}
                <motion.div
                  {...slideIn(onLeft, 0.05)}
                  className={[
                    // Mobile: full-width offset from the line; Desktop: half-width on chosen side
                    'pl-14 md:pl-0',
                    onLeft
                      ? 'md:pr-[calc(50%+3.5rem)] md:pl-0'
                      : 'md:pl-[calc(50%+3.5rem)] md:pr-0',
                  ].join(' ')}
                >
                  <Card a={a} />
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  </section>
);

export default Achievements;
