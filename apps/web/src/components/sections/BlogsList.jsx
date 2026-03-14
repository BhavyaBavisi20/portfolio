import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FileText, Calendar, Clock } from 'lucide-react';
import StickySection from './StickySection';
import { BLOGS } from '../../data';

const BlogsList = ({ onOpenBlog }) => (
  <StickySection title="Recent Writings" label="[ 05 — Blog ]" id="blogs" className="py-12">
    <div className="mb-8">
      <a href="#" className="text-purple-400 hover:text-white text-sm uppercase tracking-widest flex items-center gap-2">
        View All Articles <ArrowRight size={16}/>
      </a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {BLOGS.map((blog, index) => (
        <motion.div 
            key={blog.id} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: index * 0.1 }} 
            whileHover={{ scale: 1.02, rotate: -0.2 }}
            onClick={() => onOpenBlog(blog)} 
            className="group flex flex-col justify-between p-8 glass-panel rounded-3xl hover:border-purple-500/30 hover:bg-white/5 transition-all duration-300 min-h-[300px] cursor-pointer"
        >
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="p-2 bg-white/5 rounded-lg text-purple-400">
                  <FileText size={20} />
                </div>
                <ArrowUpRight className="text-gray-600 group-hover:text-white group-hover:rotate-45 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">{blog.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{blog.excerpt}</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
              <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
            </div>
        </motion.div>
      ))}
    </div>
  </StickySection>
);

export default BlogsList;
