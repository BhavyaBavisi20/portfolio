import React from 'react';
import { motion } from 'framer-motion';

const StickySection = ({ title, label, children, id, className = "" }) => (
  <section id={id} className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#050505] border-t border-white/5 relative z-10 ${className}`}>
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
      <div className="lg:col-span-5 relative">
        <div className="lg:sticky lg:top-48">
          <motion.h2 
            initial={{ opacity: 0, x: -60 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            viewport={{ once: true }} 
            style={{ textWrap: 'balance' }}
            className="max-w-full text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.75rem] font-bold uppercase tracking-[-0.05em] leading-[0.92] break-normal text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30"
          >
            {title}
          </motion.h2>
        </div>
      </div>
      <div className="lg:col-span-7 mt-6 sm:mt-10 md:mt-14">{children}</div>
    </div>
  </section>
);

export default StickySection;
