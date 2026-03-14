import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge } from 'lucide-react';

const GithubGraph = () => {
  // Generate a mock dense contribution graph (364 squares = 52 weeks * 7 days)
  const squares = Array.from({ length: 98 }).map((_, i) => {
    // Randomize activity levels 0-4
    const level = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
    return level;
  });

  const getColor = (level) => {
    switch(level) {
      case 1: return 'bg-purple-900/40';
      case 2: return 'bg-purple-700/60';
      case 3: return 'bg-purple-500/80';
      case 4: return 'bg-purple-400';
      default: return 'bg-white/5';
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 rounded-3xl glass-panel border border-white/5 group hover:border-purple-500/30 transition-colors duration-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Consistency</h3>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">GitHub Activity</p>
        </div>
        <div className="flex gap-2 text-gray-400">
            <GitCommit size={16} className="group-hover:text-purple-400 transition-colors"/>
            <GitPullRequest size={16} className="group-hover:text-blue-400 transition-colors"/>
            <GitMerge size={16} className="group-hover:text-green-400 transition-colors"/>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {/* Render a grid of 14 columns x 7 rows as a visual abstract representation */}
        <div className="grid grid-cols-14 grid-rows-7 gap-1 md:gap-1.5 w-full">
          {squares.map((level, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, scale: 0 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.005, duration: 0.2 }}
               whileHover={{ scale: 1.5, zIndex: 10 }}
               className={`w-full aspect-square rounded-sm ${getColor(level)} cursor-pointer`}
             />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-gray-500">
        <span>Less</span>
        <div className="flex gap-1">
            <span className="w-2 h-2 rounded bg-white/5"></span>
            <span className="w-2 h-2 rounded bg-purple-900/40"></span>
            <span className="w-2 h-2 rounded bg-purple-700/60"></span>
            <span className="w-2 h-2 rounded bg-purple-500/80"></span>
            <span className="w-2 h-2 rounded bg-purple-400"></span>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GithubGraph;
