import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Styles
import FontStyles from './components/styles/FontStyles';

// UI
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import TerminalLoader from './components/ui/TerminalLoader';
import SmoothScroll from './components/ui/SmoothScroll';
import ChatWidget from './components/ui/ChatWidget';

// Overlays
import AboutOverlay from './components/overlays/AboutOverlay';
import ResumeOverlay from './components/overlays/ResumeOverlay';
import BlogOverlay from './components/overlays/BlogOverlay';

// Sections
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import AboutSection from './components/sections/AboutSection';
import ProjectsList from './components/sections/ProjectsList';
import SkillsGrid from './components/sections/SkillsGrid';
import CertificatesSection from './components/sections/CertificatesSection';
import BlogsList from './components/sections/BlogsList';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

const App = () => {
  const [overlay, setOverlay] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const handleOpenBlog = (blog) => {
    setSelectedBlog(blog);
    setOverlay('blog');
  };

  const handleCloseOverlay = () => {
    setOverlay(null);
    setSelectedBlog(null);
  };

  return (
    <>
      {!loaded && (
        <TerminalLoader onComplete={() => setLoaded(true)} />
      )}

      {loaded && (
        <SmoothScroll>
          <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
          <FontStyles />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <AnimatePresence>
            {overlay === 'about' && <AboutOverlay onClose={handleCloseOverlay} />}
            {overlay === 'resume' && <ResumeOverlay onClose={handleCloseOverlay} />}
            {overlay === 'blog' && selectedBlog && <BlogOverlay blog={selectedBlog} onClose={handleCloseOverlay} />}
          </AnimatePresence>

          <main>
            <Hero />
            <AboutSection 
              onOpenAbout={() => setOverlay('about')} 
              onOpenResume={() => setOverlay('resume')} 
            />
            <ProjectsList />
            <SkillsGrid />
            <CertificatesSection />
            <BlogsList onOpenBlog={handleOpenBlog} />
            <ContactSection />
          </main>

          <Footer />
          <ChatWidget />
        </div>
        </SmoothScroll>
      )}
    </>
  );
};

export default App;