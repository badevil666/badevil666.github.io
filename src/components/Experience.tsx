import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const experienceData = [
  {
    company: "Real-world Applications",
    role: "Security Experience",
    dates: "VAPT Testing",
    description: "Reported 2 valid vulnerabilities in real-world applications. Performed VAPT on web applications and APIs, testing authentication, session handling, and validation."
  },
  {
    company: "Vulnerability Identification",
    role: "Capabilities",
    dates: "Security Audits",
    description: "Intercepting and modifying HTTP requests using Burp Suite for manual testing. Identifying vulnerabilities like XSS, IDOR, and testing API endpoints for security flaws."
  },
  {
    company: "Research & Development",
    role: "Experiments & Labs",
    dates: "Prototyping",
    description: "Conducted API security testing experiments, backend performance testing, and system design prototypes with small-scale implementations."
  },
  {
    company: "Systems & Security",
    role: "Achievements",
    dates: "Key Highlights",
    description: "Reported 2 valid security vulnerabilities, built multiple full-stack and mobile applications, and gained hands-on experience with high-performance databases like ClickHouse."
  }
];

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id = "experience" className="py-24 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
      <motion.div
         initial={{ opacity: 0, y: 100, scale: 0.5 }}
         whileInView={{ opacity: 1, y: 0, scale: 1 }}
         viewport={{ once: true, amount: 0.8 }}
         transition={{ type: "spring", bounce: 0.5, duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-24 text-center">Security & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">Achievements</span></h2>
      </motion.div>

      <div ref={containerRef} className="relative flex flex-col gap-24 py-10">
        {/* The Animated Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 transform md:-translate-x-1/2 origin-top">
          <motion.div 
            className="absolute top-0 w-full h-full bg-gradient-to-b from-purple-500 via-emerald-500 to-gold-500 origin-top shadow-[0_0_15px_rgba(168,85,247,0.8)]"
            style={{ scaleY }}
          />
        </div>

        {experienceData.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className="relative flex items-center w-full justify-between group">
              
              {/* Desktop layout: alternating left/right */}
              <div className="hidden md:flex w-full justify-between items-center">
                {isEven ? (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                      className="w-5/12 text-right pr-12"
                    >
                      <h3 className="text-2xl font-bold text-slate-200 mb-1">{exp.role}</h3>
                      <p className="text-purple-400 font-medium mb-3">{exp.company}</p>
                      <p className="text-slate-400 font-light text-sm">{exp.description}</p>
                    </motion.div>
                    <div className="w-2/12 flex justify-center z-10 relative">
                        <div className="w-5 h-5 rounded-full bg-obsidian border-4 border-slate-700 group-hover:border-purple-500 group-hover:shadow-[0_0_10px_#a855f7] transition-all duration-300" />
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                      className="w-5/12 pl-12"
                    >
                      <span className="glass px-4 py-2 rounded-full text-slate-300 text-sm">{exp.dates}</span>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                      className="w-5/12 text-right pr-12"
                    >
                      <span className="glass px-4 py-2 rounded-full text-slate-300 text-sm">{exp.dates}</span>
                    </motion.div>
                    <div className="w-2/12 flex justify-center z-10 relative">
                        <div className="w-5 h-5 rounded-full bg-obsidian border-4 border-slate-700 group-hover:border-emerald-500 group-hover:shadow-[0_0_10px_#10b981] transition-all duration-300" />
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                      className="w-5/12 pl-12"
                    >
                      <h3 className="text-2xl font-bold text-slate-200 mb-1">{exp.role}</h3>
                      <p className="text-emerald-400 font-medium mb-3">{exp.company}</p>
                      <p className="text-slate-400 font-light text-sm">{exp.description}</p>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile layout: strict left line, content on right */}
              <div className="flex md:hidden w-full ml-6 pl-8 relative items-start">
                  <div className="absolute left-[-10px] top-1 z-10">
                     <div className="w-5 h-5 rounded-full bg-obsidian border-4 border-slate-700 group-hover:border-purple-500 transition-all duration-300" />
                  </div>
                  <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                      className="w-full flex flex-col items-start text-left"
                  >
                      <span className="glass px-3 py-1 rounded-full text-slate-300 text-xs mb-3">{exp.dates}</span>
                      <h3 className="text-xl font-bold text-slate-200 mb-1">{exp.role}</h3>
                      <p className="text-purple-400 font-medium mb-2">{exp.company}</p>
                      <p className="text-slate-400 font-light text-sm">{exp.description}</p>
                  </motion.div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
