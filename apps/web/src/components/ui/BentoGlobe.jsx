import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { motion } from 'framer-motion';

const BentoGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    // Track canvas parent width for responsive sizing
    const onResize = () => {
      width = canvasRef.current ? canvasRef.current.offsetWidth : 400;
    };
    window.addEventListener('resize', onResize);
    onResize();

    const planetColor = [0.05, 0.05, 0.05]; // Near black #0a0a0a
    const glowColor = [0.1, 0.1, 0.2];
    const markerColor = [0.55, 0.36, 0.96]; // #8b5cf6 primary purple

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 3,
      baseColor: planetColor,
      markerColor: markerColor,
      glowColor: glowColor,
      markers: [
        // Marker for Surat, India roughly
        { location: [21.1702, 72.8311], size: 0.08 },
      ],
      onRender: (state) => {
        // Automatically rotate the globe
        state.phi = phi;
        phi += 0.005;
        // Keep responsive aspect
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden rounded-3xl glass-panel border border-white/5 group hover:border-purple-500/30 transition-colors duration-500">
      
      {/* Label */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          HQ LOCATED
        </div>
        <h3 className="text-xl font-bold text-white">Surat, India</h3>
      </div>
      
      {/* Globe Container - Shifted down/right to peek out elegantly */}
      <motion.div 
        className="absolute w-full h-full"
        style={{ top: '20%', left: '20%' }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', cursor: 'grab' }}
          className="opacity-80 mix-blend-screen"
        />
      </motion.div>
    </div>
  );
};

export default BentoGlobe;
