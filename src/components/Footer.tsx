import { motion } from 'framer-motion';
import { Mail, Link2, Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="relative py-40 px-6 md:px-12 overflow-hidden flex flex-col items-center border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] -z-10 rounded-[100%]" />

      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 flex flex-col items-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Let's <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">connect.</span></h2>
        <p className="text-slate-400 text-lg md:text-xl font-light max-w-lg mb-12">
          Currently accepting exciting projects and full-time opportunities. Feel free to reach out.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:ctom71718@gmail.com"
            className="flex items-center gap-3 px-7 py-4 bg-white rounded-full text-base font-medium text-obsidian hover:bg-slate-200 transition-colors"
          >
            <Mail className="w-5 h-5" /> ctom71718@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/tom-cherian-a599ba373/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 glass px-7 py-4 rounded-full text-base font-medium text-white hover:bg-white/10 transition-colors border border-white/20 hover:border-blue-400/50"
          >
            <Link2 className="w-5 h-5 text-blue-400" /> LinkedIn
          </a>
          <a
            href="https://www.upwork.com/freelancers/~01504aced8c8c9471d?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 glass px-7 py-4 rounded-full text-base font-medium text-white hover:bg-white/10 transition-colors border border-white/20 hover:border-emerald-400/50"
          >
            <Briefcase className="w-5 h-5 text-emerald-400" /> Upwork
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-20 text-slate-500 text-sm font-light text-center"
      >
        <p>© {new Date().getFullYear()} Tom Cherian. All rights reserved.</p>
        <p className="mt-2">Built with React, Vite & Tailwind</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
