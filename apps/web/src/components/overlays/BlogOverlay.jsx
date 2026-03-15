import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const BlogOverlay = ({ blog, onClose }) => {
  if (!blog) return null;

  const contentParagraphs = blog.content
    ? String(blog.content)
        .split('\n\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 90, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.2)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={22} />
        </button>

        <div className="shrink-0 pr-10">
          <h3 className="text-2xl md:text-4xl font-bold leading-[1.15] text-white mb-4">
            {blog.title}
          </h3>

          <div className="flex gap-4 mb-6 text-xs md:text-sm font-mono text-gray-400">
            <span>{blog.date}</span>
            <span>&bull;</span>
            <span>{blog.readTime}</span>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2 md:pr-3">
          <div className="space-y-4 break-words text-[15px] md:text-base leading-7 text-gray-300">
          <p className="text-gray-400">{blog.excerpt}</p>
          {contentParagraphs.length > 0 ? (
            contentParagraphs.map((paragraph, index) => (
              <p key={`${blog.title}-${index}`}>{paragraph}</p>
            ))
          ) : (
            <p className="italic text-gray-500 mt-8">Full content coming soon...</p>
          )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogOverlay;
