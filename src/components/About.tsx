import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 36, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const About = () => (
  <section
    id="about"
    className="h-screen w-full flex flex-col justify-center snap-center px-6 md:px-12"
  >
    {/* Inner container to hold your max width so the text doesn't stretch too far */}
    <div className="max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div {...fade(0)} className="md:col-span-5 relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building <span className="text-purple-400 font-light italic">practical</span> systems and testing security.
          </h2>
          <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-emerald-500 rounded-full" />
        </motion.div>

        <motion.div {...fade(0.12)} className="md:col-span-7 flex flex-col gap-6 text-slate-400 text-lg leading-relaxed font-light">
          <p>
            I am a full-stack developer with a strong focus on backend engineering, system design, and application security. I work with Node.js, Express, FastAPI, and React to build scalable and reliable applications. I also develop mobile apps using Android and Flutter.
          </p>
          <p>
            Alongside development, I perform security testing using VAPT techniques and tools like Burp Suite to identify and understand real-world vulnerabilities.
          </p>
          <p>
            I enjoy building practical systems, exploring performance, and understanding how applications work under the hood.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-200">Scalable</span>
              <span className="text-sm tracking-widest uppercase text-purple-400 mt-1">Architecture</span>
            </div>
            <div className="w-[1px] h-full bg-white/10 mx-4" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-200">Secure</span>
              <span className="text-sm tracking-widest uppercase text-emerald-400 mt-1">Systems</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;