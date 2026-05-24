import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Security from './components/Security';
import Footer from './components/Footer';
import Blueprint from './components/Blueprint';
import AuroraBackground from './components/AuroraBackground';
import { initSmoothScroll } from './utils/smoothScroll';
import projects, { type Project } from './data/projects';

function App() {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);
  const [selected, setSelected] = useState<Project | null>(null);
  const selectedIndex = selected ? projects.findIndex((p) => p.title === selected.title) : 0;

  return (
    <div className="bg-obsidian text-slate-200 font-space min-h-screen selection:bg-purple-500/30">
      {/* Side navbar — always visible */}
      <Navbar />

      {<AuroraBackground />}

      {/* Dark vignette — sits between aurora and content for readability */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Top-to-bottom darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        {/* Left-edge deepening where navbar is */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* lg:pl-24 reserves a left gutter for the vertical desktop navbar so
          content never sits behind it. Below the lg: breakpoint (1024px)
          the navbar becomes a bottom bar and content uses full width. */}
      <div className="relative z-10 lg:pl-24">
        <Hero />
        <About />
        <Skills />
        <Projects onSelect={setSelected} />
        <Achievements />
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
