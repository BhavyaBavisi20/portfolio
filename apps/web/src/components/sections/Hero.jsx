import React, { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import TypewriterText from '../ui/TypewriterText';
import ParticleNetwork from '../ui/ParticleNetwork';
import ScrambleText from '../ui/ScrambleText';
import { USER_IMAGE_URL } from '../../data';

const Hero = () => {
    const { scrollYProgress } = useScroll(); 
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); 

    return (
    <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ParticleNetwork />
      </div>

      <motion.div style={{ y: textY }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 0.8, scale: 1 }} transition={{ duration: 2, ease: "easeOut" }} className="absolute inset-0 items-center justify-center z-0 select-none transform-gpu font-bold text-[10vw] md:text-[13vw] leading-none tracking-tighter text-alive text-center whitespace-nowrap hidden md:flex">
        <ScrambleText text="INTELLIGENCE" delay={500} duration={2000} />
      </motion.div>

      <div className="absolute bottom-0 z-[5] w-full flex justify-center items-end h-[55vh] sm:h-[65vh] md:h-[85vh] pointer-events-none">
        <div className="relative h-full w-auto max-w-[280px] sm:max-w-none">
          <img src={USER_IMAGE_URL} alt="Bhavya BW" className="h-full w-auto object-cover object-top mask-image-bottom filter contrast-110 brightness-95 pointer-events-none select-none"/>
        </div>
      </div>

      <div className="relative z-20 w-full h-full flex flex-col justify-end items-center pb-6 md:pb-8 pointer-events-none">
         <div className="text-center space-y-3 md:space-y-6 px-4 max-w-4xl mx-auto">
             <div className="block">
               <div className="inline-block text-purple-300 font-mono text-xs md:text-sm tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                 <TypewriterText text="Hi there, I'm Bhavya" delay={500} />
               </div>
             </div>
             <div className="block">
               <div className="text-white text-sm md:text-2xl font-medium tracking-wide drop-shadow-md">
                 <TypewriterText text="AI-ML Engineer | Frontend Developer | Tech Explorer" delay={2000} />
               </div>
             </div>
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.5, duration: 0.65 }} className="hidden md:block text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto mt-4 md:mt-8">
               Building AI-driven products and modern web experiences.<br className="hidden md:block"/> Transforming ideas into scalable and intelligent solutions.
             </motion.div>
         </div>
      </div>
    </section>
  );
};

export default Hero;
