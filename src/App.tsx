import { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Security from './components/Security';
import Footer from './components/Footer';
import Blueprint from './components/Blueprint';
import Ambient from './components/Ambient';
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
    <div className="bg-obsidian text-ink font-space min-h-screen">
      <Splash />

      {/* Side navbar — always visible */}
      <Navbar />

      <Ambient />

      {/* lg:pl-24 reserves a left gutter for the vertical desktop navbar so
          content never sits behind it. Below the lg: breakpoint (1024px)
          the navbar becomes a bottom bar and content uses full width. */}
      <div className="relative z-10 lg:pl-24">
        <Hero />
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
