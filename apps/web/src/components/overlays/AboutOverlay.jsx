import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const AboutOverlay = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    className="fixed inset-0 z-[100] flex items-center justify-center px-4 perspective-1000"
  >
    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

    <motion.div
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: 90, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-4xl w-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 md:p-14 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.2)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white cursor-pointer"
      >
        <X size={24} />
      </button>

      <h3 className="text-4xl md:text-6xl font-bold leading-[1.1] text-white mb-12">
        Behind the Code
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-5 text-lg leading-relaxed text-gray-300">
          <p>
            I’m <span className="text-purple-400 font-medium">Bhavya</span> — an AI Engineer crafting intelligent systems for the next era of tech.
          </p>
          <p>
            Currently working on <span className="text-blue-400">AI Agents</span>, <span className="text-blue-400">Edge-side inference</span>, and <span className="text-blue-400">system-level optimization</span>.
          </p>
          <p>I thrive at the intersection of creativity and engineering.</p>
          <p>I build products that solve real-world problems, not just demonstrate machine learning.</p>
          <p className="text-purple-300 font-bold">Always open to challenges worth solving.</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-mono mb-3">Core Focus Areas</p>
          <div className="flex flex-wrap gap-3">
            {[
              "AI System Design",
              "LLM Engineering",
              "Autonomous Agents",
              "Edge Deployment",
              "Applied ML",
              "RAG Pipelines"
            ].map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-default"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-purple-400 font-mono whitespace-nowrap">
            bhavya.ai — Intelligence meets engineering.
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default AboutOverlay;
