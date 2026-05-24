import { motion } from 'framer-motion';
import { ShieldAlert, Inspect, Network, ActivitySquare } from 'lucide-react';

const securityData = [
  {
    title: 'Vulnerability Discovery',
    tag: 'Real-world Applications',
    icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
    description: 'Successfully identified and reported 2 valid vulnerabilities in production applications. Conducted thorough VAPT on complex web architectures.',
  },
  {
    title: 'Deep Protocol Audits',
    tag: 'Capabilities',
    icon: <Inspect className="w-6 h-6 text-purple-400" />,
    description: 'Extensive experience using Burp Suite to intercept HTTP requests, bypassing client-side validation to expose XSS, IDOR, and injection flaws.',
  },
  {
    title: 'API Security Research',
    tag: 'Experiments & Labs',
    icon: <Network className="w-6 h-6 text-gold-400" />,
    description: 'Ran dedicated API security testing limits, probing backend boundaries for stateless session manipulation and flawed token verifications.',
  },
  {
    title: 'Systems Resilience',
    tag: 'Achievements',
    icon: <ActivitySquare className="w-6 h-6 text-white" />,
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
      <p className="text-purple-400 font-medium tracking-widest uppercase mb-4 text-sm">Offensive Defense</p>
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
        Security & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">VAPT</span>
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {securityData.map((sec, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40, scale: 0.97, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
          className="group relative glass-card p-6 md:p-10 overflow-hidden hover:-translate-y-2 transition-transform duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-emerald-500/0 group-hover:from-purple-500/10 group-hover:to-emerald-500/5 transition-colors duration-500" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {sec.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-slate-100">{sec.title}</h3>
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mt-1">{sec.tag}</p>
              </div>
            </div>
            <p className="text-slate-400 font-light leading-relaxed text-lg">{sec.description}</p>
          </div>

          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-transparent group-hover:w-full transition-all duration-700 ease-out" />
        </motion.div>
      ))}
    </div>
  </section>
);

export default Security;
