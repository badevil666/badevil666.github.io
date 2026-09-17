import { motion } from 'framer-motion';
import { ShieldAlert, Inspect, Network, ActivitySquare } from 'lucide-react';

const securityData = [
  {
    title: 'Vulnerability Discovery',
    tag: 'Real-world applications',
    icon: <ShieldAlert className="w-6 h-6" />,
    description: 'Successfully identified and reported 2 valid vulnerabilities in production applications. Conducted thorough VAPT on complex web architectures.',
  },
  {
    title: 'Deep Protocol Audits',
    tag: 'Capabilities',
    icon: <Inspect className="w-6 h-6" />,
    description: 'Extensive experience using Burp Suite to intercept HTTP requests, bypassing client-side validation to expose XSS, IDOR, and injection flaws.',
  },
  {
    title: 'API Security Research',
    tag: 'Experiments & labs',
    icon: <Network className="w-6 h-6" />,
    description: 'Ran dedicated API security testing limits, probing backend boundaries for stateless session manipulation and flawed token verifications.',
  },
  {
    title: 'Systems Resilience',
    tag: 'Achievements',
    icon: <ActivitySquare className="w-6 h-6" />,
    description: 'Combining development with defensive mindset. Engineered highly resilient databases (ClickHouse/PostgreSQL) fortified against denial and data leakage.',
  },
];

const Security = () => (
  <section id="security" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
    <motion.div
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-24"
    >
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-[-0.02em] text-ink">
        Security &amp; VAPT
      </h2>
      <p className="mt-4 text-muted text-lg">Offense-minded, defense-shipped.</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {securityData.map((sec, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
          className="group relative glass-card p-6 md:p-10 hover:border-white/20 hover:-translate-y-1 transition-[transform,border-color] duration-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.06] text-ink flex items-center justify-center">
              {sec.icon}
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-semibold text-ink">{sec.title}</h3>
              <p className="text-xs font-medium text-muted mt-1">{sec.tag}</p>
            </div>
          </div>
          <p className="text-muted leading-relaxed text-lg">{sec.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Security;
