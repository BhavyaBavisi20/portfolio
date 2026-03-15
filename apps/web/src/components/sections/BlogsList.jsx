import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FileText, Calendar, Clock } from 'lucide-react';
import StickySection from './StickySection';

const BlogsList = ({ blogs = [], onOpenBlog }) => (
  <StickySection title="Recent Writings" label="[ 05 — Blog ]" id="blogs" className="py-12">
    <div className="mb-8">
      <a href="#" className="text-purple-400 hover:text-white text-sm uppercase tracking-widest flex items-center gap-2">
        View All Articles <ArrowRight size={16}/>
      </a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {blogs.map((blog, index) => (
        <motion.div 
            key={blog._id || blog.id || `${blog.title}-${index}`} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: index * 0.1 }} 
            whileHover={{ scale: 1.01, rotate: -0.1 }}
            onClick={() => onOpenBlog(blog)} 
            className="group flex flex-col justify-between p-6 sm:p-8 glass-panel rounded-2xl sm:rounded-3xl hover:border-purple-500/30 hover:bg-white/5 transition-all duration-300 min-h-[250px] sm:min-h-[300px] cursor-pointer"
        >
            <div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-white/5 rounded-lg text-purple-400">
                  <FileText size={18} className="sm:size-5" />
                </div>
                <ArrowUpRight size={18} className="text-gray-600 sm:size-5 group-hover:text-white group-hover:rotate-45 transition-all" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-200 transition-colors leading-tight">{blog.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">{blog.excerpt}</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono text-gray-500">
              <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
            </div>
        </motion.div>
      ))}
    </div>
  </StickySection>
);

export default BlogsList;
