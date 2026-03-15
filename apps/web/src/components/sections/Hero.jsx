import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TypewriterText from '../ui/TypewriterText';
import ParticleNetwork from '../ui/ParticleNetwork';
import ScrambleText from '../ui/ScrambleText';
import { USER_IMAGE_URL } from '../../config/profile';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ParticleNetwork />
      </div>

      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 z-0 hidden select-none items-center justify-center whitespace-nowrap text-center font-bold leading-none tracking-tighter text-alive md:flex md:text-[13vw]"
      >
        <ScrambleText text="INTELLIGENCE" delay={500} duration={2000} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-4 z-[5] flex justify-center pointer-events-none sm:bottom-5 md:bottom-8">
        <div className="relative h-[41svh] w-auto max-w-[220px] sm:h-[54svh] sm:max-w-[300px] md:h-[70svh] lg:h-[74svh] md:max-w-none">
          <img
            src={USER_IMAGE_URL}
            alt="Bhavya BW"
            className="h-full w-auto object-cover object-top mask-image-bottom filter contrast-110 brightness-95 pointer-events-none select-none"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-1 z-20 px-4 pointer-events-none sm:bottom-2 md:bottom-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 text-center sm:gap-4 md:gap-6">
          <div className="inline-flex max-w-[calc(100vw-2rem)] items-center justify-center rounded-full border border-purple-500/30 bg-black/60 px-4 py-1.5 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] backdrop-blur-md sm:max-w-full sm:px-6 sm:text-xs md:py-2 md:text-sm md:tracking-[0.2em]">
            <TypewriterText text="Hi there, I'm Bhavya" delay={500} />
          </div>

          <div className="w-full max-w-[94vw] px-2 text-[12px] font-semibold leading-tight tracking-tight text-white drop-shadow-md whitespace-nowrap sm:max-w-3xl sm:text-lg md:max-w-4xl md:px-4 md:text-3xl lg:text-4xl">
            <TypewriterText text="AI Engineer | Full-Stack Developer | Tech Explorer" delay={2000} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.6 }}
            className="mx-auto max-w-[280px] px-2 text-center text-[11px] leading-relaxed text-gray-400 sm:max-w-sm sm:text-sm md:hidden"
          >
            Building AI-driven products, backend systems, and modern web experiences.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 0.65 }}
            className="mx-auto hidden max-w-3xl px-6 text-base font-light leading-relaxed text-gray-300/80 md:block md:text-xl"
          >
            Building AI-driven products and modern web experiences.
            <br className="hidden lg:block" />
            Transforming ideas into scalable and intelligent solutions.
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
