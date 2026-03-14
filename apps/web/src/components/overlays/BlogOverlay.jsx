import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const BlogOverlay = ({ blog, onClose }) => {
  if (!blog) return null;
  
  return (
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
        className="relative max-w-3xl w-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.2)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={24} />
        </button>

        <h3 className="text-3xl md:text-5xl font-bold leading-[1.1] text-white mb-6 pr-10">
          {blog.title}
        </h3>
        
        <div className="flex gap-4 mb-8 text-sm font-mono text-gray-400">
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-gray-300">
          <p>{blog.excerpt}</p>
          <p className="italic text-gray-500 mt-8">Full content coming soon...</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogOverlay;
