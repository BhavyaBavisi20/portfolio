import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Instagram, Terminal } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Blog', href: '#blogs' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { icon: Github, href: 'https://github.com/bhavyabavisi', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/bhavya-bavisi-61a592281', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/bhavya_.020', label: 'Instagram' },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="pt-20 pb-10 px-6 border-t border-white/5 bg-[#050505] relative z-10 overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-40 bg-purple-900/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold tracking-tight text-white mb-2">
              bhavya<span className="text-purple-400">.ai</span>
            </div>
            <p className="text-sm text-gray-500 font-mono max-w-xs leading-relaxed">
              Building intelligent systems at the intersection of AI research and product engineering.
            </p>
          </div>

          {/* Quick Nav */}
          <nav className="flex flex-col gap-3">
            <p className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.3em] mb-1">Navigation</p>
            {NAV_LINKS.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-sm text-gray-500 hover:text-white font-mono transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials + CTA */}
          <div className="flex flex-col gap-4 items-start">
            <p className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.3em]">Connect</p>
            <div className="flex gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <a href="#contact" 
              className="mt-2 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-colors duration-300 flex items-center gap-2">
              <Terminal size={14} /> Let's Build Together
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 font-mono">
            © 2025 Bhavya Bavisi — Crafted with React, Three.js & Framer Motion
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-purple-400 transition-colors group cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
              <ArrowUp size={13} />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
