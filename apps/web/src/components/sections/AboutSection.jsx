import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Clock, Cpu, Trophy, ArrowRight, ArrowUpRight } from 'lucide-react';

const CountUp = ({ end, duration = 1.6 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counter);
        start = end;
      }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(counter);
  }, [end, duration]);

  return count;
};

const AboutSection = ({ onOpenAbout, onOpenResume }) => {
  return (
    <section id="about" className="py-32 px-6 bg-[#050505] relative z-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">

          <motion.h2 
            initial={{ opacity: 0, x: -60 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            viewport={{ once: true }} 
            className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30"
          >
            Behind<br/>the Code
          </motion.h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            I build AI systems that turn complex models into usable products. 
            I love working at the intersection of applied research and engineering, 
            creating solutions that actually solve real-world problems.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            {[
              { number: 5, label: "Projects", icon: Code },
              { number: 2, label: "Years in AI", icon: Clock },
              { number: 10, label: "Tools", icon: Cpu },
              { number: 300, label: "LC Solved", icon: Trophy }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-transparent" />

                <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                  <div className="p-2 rounded-lg bg-white/5">
                    <stat.icon className="w-6 h-6 text-purple-400" />
                  </div>

                  <span className="text-3xl font-bold bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                    <CountUp end={stat.number} />+
                  </span>

                  <span className="text-[10px] md:text-xs font-mono tracking-widest text-gray-500 uppercase">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative h-[400px] flex items-center justify-center lg:justify-end">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpenResume} className="absolute top-0 right-20 md:right-32 group w-40 h-40 rounded-full border border-gray-600 flex flex-col items-center justify-center hover:border-white transition-all duration-300 bg-[#050505] cursor-pointer">
            <span className="text-sm text-gray-400 group-hover:text-white mb-1 font-bold">View</span>
            <span className="text-lg font-bold text-white mb-2">Resume</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpenAbout} className="absolute bottom-0 right-0 md:right-10 group w-48 h-48 rounded-full bg-white flex flex-col items-center justify-center transition-all duration-300 z-10 shadow-[0_0_50px_rgba(255,255,255,0.1)] cursor-pointer">
            <span className="text-lg font-bold text-black mb-1">Know</span>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-black">More</span>
              <ArrowUpRight className="w-6 h-6 text-black group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
