import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5"
    >
      <nav className="glass flex items-center gap-1 px-2 py-2 rounded-full border border-white/10">
        <button
          onClick={() => scrollTo('about')}
          className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          About
        </button>

        <button
          onClick={() => scrollTo('skills')}
          className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          Skills
        </button>

        <button
          onClick={() => scrollTo('projects')}
          className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          Projects
        </button>

        <button
          onClick={() => scrollTo('security')}
          className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          Security
        </button>

        <button
          onClick={() => scrollTo('contact')}
          className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          Contact
        </button>
        <a
          href="https://github.com/badevil666"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-white/10 text-white hover:bg-white/20 border border-white/15 transition-all duration-200"
        >
          <GitBranch className="w-4 h-4" />
          GitHub
        </a>
      </nav>
    </motion.header>
  );
};

export default Navbar;
