import { useState } from 'react';
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
  const selectedIndex = selected ? projects.findIndex((p) => p.title === selected.title) : 0;

  return (
    <div className="bg-obsidian text-slate-200 font-space min-h-screen selection:bg-purple-500/30">
      {/* Side navbar — always visible */}
      <Navbar />

      {/* Background ambient glow effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10">
        <Hero />
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
