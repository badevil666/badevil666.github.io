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
    className="min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24 md:py-0"
  >
    {/* Inner container to hold your max width so the text doesn't stretch too far */}
    <div className="max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div {...fade(0)} className="md:col-span-5 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 break-words">
            I ship <span className="text-purple-400 font-light italic">end-to-end</span> — design, code, release, monetize.
          </h2>
          <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-emerald-500 rounded-full" />
        </motion.div>

        <motion.div {...fade(0.12)} className="md:col-span-7 flex flex-col gap-6 text-slate-400 text-lg leading-relaxed font-light">
          <p>
            I'm a full-stack engineer who builds and ships products solo. Backend
            (Node.js, FastAPI, Postgres) is my home base, but I also write the
            mobile apps (Flutter, native Android / Kotlin), the React frontends,
            the CI/CD, the AdMob integration, and the Play Store listing.
          </p>
          <p>
            <span className="text-slate-300 font-medium">Tally</span> — a
            privacy-first budget tracker — is live on Google Play right now,
            including Android 15 16 KB page-size compliance, native foreground
            services, on-device SMS detection, and AdMob monetization. I
            designed, built and released it alone.
          </p>
          <p>
            I also break into things on the side — VAPT &amp; OWASP-style web
            security testing — which makes me a more paranoid (and therefore
            better) backend engineer.
          </p>
          <p className="text-slate-300">
            Looking for backend / founding-engineer / engineering-leadership
            roles where shipping speed and ownership matter more than
            committee.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-200">Solo</span>
              <span className="text-sm tracking-widest uppercase text-purple-400 mt-1">Ship to prod</span>
            </div>
            <div className="w-[1px] h-full bg-white/10 mx-4" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-200">Secure</span>
              <span className="text-sm tracking-widest uppercase text-emerald-400 mt-1">By default</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;