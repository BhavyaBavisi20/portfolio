import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Cpu, Award, FileText, Mail, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', icon: Home, href: '#home' }, 
  { name: 'About', icon: User, href: '#about' }, 
  { name: 'Work', icon: Briefcase, href: '#work' }, 
  { name: 'Skills', icon: Cpu, href: '#skills' }, 
  { name: 'Credentials', icon: Award, href: '#certificates' }, 
  { name: 'Blogs', icon: FileText, href: '#blogs' }, 
  { name: 'Contact', icon: Mail, href: '#contact' }
];

const Navbar = () => {
  const [active, setActive] = useState('Home'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // useCallback ensures the function reference is stable and doesn't
  // cause the scroll listener to be re-added on every render
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    // Iterate in reverse so the last matching section wins (handles overlap)
    for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
      const item = NAV_ITEMS[i];
      const section = document.querySelector(item.href);
      if (section) {
        const { offsetTop } = section;
        if (scrollPosition >= offsetTop) {
          setActive(item.name);
          break;
        }
      }
    }
  }, []);

  useEffect(() => { 
    window.addEventListener('scroll', handleScroll, { passive: true }); 
    // Run once on mount to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll); 
  }, [handleScroll]);

  return (
    <>
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50 mix-blend-difference">
        <div className="text-xl font-bold tracking-tight text-white cursor-pointer">
          bhavya<span className="text-purple-500">.ai</span>
        </div>
      </div>
      
      {/* Desktop Nav */}
      <div className="fixed top-8 right-8 hidden md:flex items-center gap-8 z-50 pointer-events-none">
        <div className="flex flex-row gap-8 pointer-events-auto">
          {NAV_ITEMS.map((item) => (
            <motion.a 
              whileHover={{ scale: 1.15, y: -2 }} 
              whileTap={{ scale: 0.95 }} 
              key={item.name} 
              href={item.href} 
              onClick={() => setActive(item.name)} 
              className="group relative flex items-center justify-center w-10 h-10 cursor-pointer" 
              title={item.name}
            >
              <item.icon 
                size={20} 
                strokeWidth={1.5} 
                className={`transition-colors duration-300 ${
                  active === item.name ? 'text-purple-400' : 'text-gray-500 group-hover:text-white'
                }`} 
              />
              {/* Tooltip label on hover */}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
              {active === item.name && (
                <motion.div 
                  layoutId="active-indicator" 
                  className="absolute bottom-[-10px] w-full h-[2px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                />
              )}
            </motion.a>
          ))}
        </div>
      </div>
      
      {/* Mobile Hamburger */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white cursor-pointer">
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${active === item.name ? 'bg-purple-500/10 border border-purple-500/20' : 'hover:bg-white/5'}`}
                >
                  <div className={`p-2 rounded-lg ${active === item.name ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-400'}`}>
                    <item.icon size={18} />
                  </div>
                  <span className={`text-base font-medium ${active === item.name ? 'text-white' : 'text-gray-300'}`}>
                    {item.name}
                  </span>
                  {active === item.name && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
