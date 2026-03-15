import React from 'react';
import { motion } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { RESUME_PATH } from '../../config/profile';

const ResumeOverlay = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    className="fixed inset-0 z-[100] flex items-end justify-center md:items-center px-4 pb-4 md:pb-0"
  >
    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 
      rounded-[2rem] p-10 md:p-14 overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 
        text-gray-400 hover:text-white cursor-pointer"
      >
        <X size={24} />
      </button>

      <h3 className="text-4xl md:text-6xl font-bold leading-[1.1] text-white mb-12">
        My Journey
      </h3>

      <div className="space-y-12 border-l-2 border-white/10 pl-8 ml-2">
        <div className="relative">
          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-cyan-400 border-4 border-[#0a0a0a]" />
          <span className="text-cyan-300 font-mono text-sm mb-1 block">2026 - Present</span>
          <h3 className="text-xl font-bold text-white">AI Intern at DevX AI Labs</h3>
          <p className="text-gray-400 mt-1">
            Working around AI-native customer experience, automation systems, and modern product engineering workflows.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-purple-500 border-4 border-[#0a0a0a]" />
          <span className="text-purple-400 font-mono text-sm mb-1 block">2026 (Expected)</span>
          <h3 className="text-xl font-bold text-white">B.Tech in AI-DS</h3>
          <p className="text-gray-400 mt-1">
            Specialization in Artificial Intelligence and Data Science.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-blue-500 border-4 border-[#0a0a0a]" />
          <span className="text-blue-400 font-mono text-sm mb-1 block">2024 - Present</span>
          <h3 className="text-xl font-bold text-white">AI Research & Projects</h3>
          <p className="text-gray-400 mt-1">
            Built DocTalk AI and Real-time ISL Recognition.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-600 border-4 border-[#0a0a0a]" />
          <span className="text-gray-400 font-mono text-sm mb-1 block">2022</span>
          <h3 className="text-xl font-bold text-white">Started Programming</h3>
          <p className="text-gray-400 mt-1">
            Entered the world of tech and engineering.
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10">
        <a
          href={RESUME_PATH}
          download="Bhavya_Resume.pdf"
          className="w-full flex items-center justify-center gap-3 py-4 
          bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
        >
          <FileText size={20} /> Download Full Resume
        </a>
      </div>
    </motion.div>
  </motion.div>
);

export default ResumeOverlay;
