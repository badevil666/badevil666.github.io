import { useState, useEffect, useRef } from 'react';
import BlackholeBackground from './components/BlackholeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Security from './components/Security';
import Footer from './components/Footer';
import Blueprint from './components/Blueprint';
import projects, { type Project } from './data/projects';

function App() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const selectedIndex = selected ? projects.findIndex((p) => p.title === selected.title) : 0;

  useEffect(() => {
    // Set up the observer to watch the Hero section
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the Hero section is NOT on screen (intersecting), show the Navbar
        setShowNavbar(!entry.isIntersecting);
      },
      {
        // 0.1 means it triggers when 90% of the Hero section is scrolled out of view.
        // Tweak this between 0 (completely out) and 1 (fully in) if you want it to appear sooner.
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-obsidian text-slate-200 font-space min-h-screen selection:bg-purple-500/30">
      <BlackholeBackground />

      {/* Navbar Wrapper: Handles the smooth slide-in/out animation.
        pointer-events control ensures you can't click invisible buttons when it's hidden.
      */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${showNavbar
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
          }`}
      >
        <Navbar />
      </div>

      {/* Background ambient glow effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10">
        {/* Wrap Hero with the ref so the Intersection Observer can track it */}
        <div ref={heroRef}>
          <Hero />
        </div>

        <About />
        <Skills />
        <Projects onSelect={setSelected} />
        <Security />
        <Footer />
      </div>

      {/* Blueprint case-study overlay */}
      <Blueprint
        project={selected}
        onClose={() => setSelected(null)}
        index={selectedIndex}
        total={projects.length}
      />
    </div>
  );
}

export default App;