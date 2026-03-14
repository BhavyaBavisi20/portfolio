import React from 'react';
import { motion } from 'framer-motion';

const StickySection = ({ title, label, children, id, className = "" }) => (
  <section id={id} className={`py-12 px-6 bg-[#050505] border-t border-white/5 relative z-10 ${className}`}>
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4 relative">
        <div className="lg:sticky lg:top-48">
          <motion.h2 
            initial={{ opacity: 0, x: -60 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            viewport={{ once: true }} 
            className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30"
          >
            {title}
          </motion.h2>
        </div>
      </div>
      <div className="lg:col-span-8 mt-10 md:mt-14">{children}</div>
    </div>
  </section>
);

export default StickySection;
