import { motion } from 'framer-motion';
import { Mail, Link2, Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="relative py-20 md:py-40 pb-32 lg:pb-40 px-6 md:px-12 overflow-hidden flex flex-col items-center border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 flex flex-col items-center"
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.03em] mb-6 text-ink">Let's connect.</h2>
        <p className="text-muted text-lg md:text-xl max-w-lg mb-12">
          Currently accepting exciting projects and full-time opportunities. Feel free to reach out.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:ctom71718@gmail.com"
            className="flex items-center gap-3 px-5 md:px-7 py-3 md:py-4 bg-white rounded-full text-sm md:text-base font-medium text-obsidian hover:bg-[#e8e8ed] transition-colors"
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="truncate max-w-[180px] md:max-w-none">ctom71718@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/tom-cherian-a599ba373/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-4 rounded-full text-base font-medium text-ink hover:bg-white/5 transition-colors border border-white/15"
          >
            <Link2 className="w-5 h-5" /> LinkedIn
          </a>
          <a
            href="https://www.upwork.com/freelancers/~01504aced8c8c9471d?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-4 rounded-full text-base font-medium text-ink hover:bg-white/5 transition-colors border border-white/15"
          >
            <Briefcase className="w-5 h-5" /> Upwork
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-20 text-muted text-sm text-center"
      >
        <p>© {new Date().getFullYear()} Tom Cherian. All rights reserved.</p>
        <p className="mt-2">Built with React, Vite & Tailwind</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
