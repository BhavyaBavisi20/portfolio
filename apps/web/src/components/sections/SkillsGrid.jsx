import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StickySection from './StickySection';
import { SKILLS_DATA } from '../../data';

// Custom Hook for Mouse Position
const useMousePosition = (ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      return () => element.removeEventListener("mousemove", handleMouseMove);
    }
  }, [ref]);

  return mousePosition;
};

// Neural Node Component
const NeuralNode = ({ 
  skill, 
  x, 
  y, 
  isCenter, 
  isActive, 
  isDimmed, 
  onHover, 
  onLeave,
  color = "bg-purple-500",
  shadow = "shadow-purple-500/50"
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isCenter ? 1.2 : 1, 
        opacity: isDimmed ? 0.3 : 1,
        y: isActive && !isCenter ? -10 : 0
      }}
      transition={{ duration: 0.4, type: "spring", damping: 15 }}
      whileHover={{ scale: isCenter ? 1.3 : 1.2 }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={onLeave}
      className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center cursor-pointer glass-panel border border-white/10 z-20 overflow-visible transition-colors duration-300 ${isActive ? 'bg-white/10 border-white/30 text-white' : 'text-gray-400'}`}
      style={{ left: `calc(${x}% - 2.5rem)`, top: `calc(${y}% - 2.5rem)` }}
    >
      <div className={`absolute inset-0 rounded-full blur-md opacity-0 transition-opacity duration-300 ${color} ${isActive ? 'opacity-20' : ''}`} />
      
      {skill.icon && <skill.icon size={24} className={isActive ? 'text-white' : 'text-gray-400'} />}
      
      <span className="text-[10px] md:text-xs font-mono font-bold mt-1 tracking-wider uppercase text-center w-[150%] break-words leading-tight drop-shadow-md">
        {skill.name}
      </span>

      {/* Center Node Glow */}
      {isCenter && (
         <div className={`absolute -inset-2 border border-white/20 rounded-full animate-ping opacity-20`} style={{ animationDuration: '3s' }} />
      )}

      {/* Tooltip for outer nodes */}
      <AnimatePresence>
        {isActive && !isCenter && skill.details && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -bottom-14 left-1/2 min-w-max transform -translate-x-1/2 px-4 py-2 bg-[#0a0a0a]/90 backdrop-blur-md border border-purple-500/30 rounded-lg text-xs font-mono text-purple-300 shadow-xl z-50 pointer-events-none"
          >
            {skill.details}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// SVG Connection Line
const ConnectionLine = ({ startX, startY, endX, endY, isActive }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
      <motion.line
        x1={`${startX}%`} y1={`${startY}%`} x2={`${endX}%`} y2={`${endY}%`}
        stroke={isActive ? "#8b5cf6" : "rgba(255,255,255,0.05)"}
        strokeWidth={isActive ? 2 : 1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {isActive && (
        <motion.circle
          cx={`${startX}%`} cy={`${startY}%`} r="3" fill="#8b5cf6"
          animate={{ cx: [`${startX}%`, `${endX}%`], cy: [`${startY}%`, `${endY}%`] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </svg>
  );
};

const NeuralMap = ({ category, skills, isCategoryActive, onHoverCategory }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const containerRef = useRef(null);
  
  // Placement Configuration
  const centerX = 50;
  const centerY = 50;
  const radiusXDesktop = 35;
  const radiusYDesktop = 35;
  const radiusXMobile = 40;
  const radiusYMobile = 40;

  // Calculate positions
  const nodes = skills.map((skill, index) => {
    const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
    // Responsive layout base (simplistic via window width, but using CSS % is safer)
    return {
      ...skill,
      x: centerX + Math.cos(angle) * radiusXDesktop,
      y: centerY + Math.sin(angle) * radiusYDesktop,
    };
  });

  return (
    <div ref={containerRef} className="relative w-full h-[400px] md:h-[500px] bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden group">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Glow effect tracking mouse (optional) */}
      <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[100px]" />

      {/* Connections FIRST (so they are under the nodes) */}
      {nodes.map((node) => {
        const isConnectionActive = hoveredSkill === node.name || hoveredSkill === category;
        return (
          <ConnectionLine 
            key={`line-${node.name}`} 
            startX={centerX} startY={centerY} 
            endX={node.x} endY={node.y} 
            isActive={isConnectionActive || isCategoryActive} 
          />
        );
      })}

      {/* Center Category Node */}
      <NeuralNode
        skill={{ name: category, icon: null }}
        x={centerX} y={centerY}
        isCenter={true}
        isActive={hoveredSkill === category || isCategoryActive}
        isDimmed={hoveredSkill && hoveredSkill !== category && !nodes.find(n => n.name === hoveredSkill)}
        onHover={() => { onHoverCategory(category); setHoveredSkill(category); }}
        onLeave={() => { onHoverCategory(null); setHoveredSkill(null); }}
        color="bg-white"
      />

      {/* Skill Nodes */}
      {nodes.map((node) => (
        <NeuralNode
          key={node.name}
          skill={node}
          x={node.x} y={node.y}
          isCenter={false}
          isActive={hoveredSkill === node.name}
          isDimmed={Boolean(hoveredSkill && hoveredSkill !== node.name && hoveredSkill !== category)}
          onHover={() => { onHoverCategory(category); setHoveredSkill(node.name); }}
          onLeave={() => { onHoverCategory(null); setHoveredSkill(null); }}
        />
      ))}
    </div>
  );
};

const SkillsGrid = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const categories = Object.keys(SKILLS_DATA);

  return (
    <StickySection title="The Neural Grid" label="[ 03 — Skills ]" id="skills" className="py-24">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest max-w-sm">
            <span className="text-purple-400">Interactive Map:</span> Hover over nodes to analyze technical proficiencies and architecture stacks.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(tab => (
              <button 
                key={tab} 
                onMouseEnter={() => setActiveCategory(tab)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all duration-300 border ${activeCategory === tab ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Instead of tabs, we display them side by side or stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <NeuralMap 
              key={category} 
              category={category} 
              skills={SKILLS_DATA[category]} 
              isCategoryActive={activeCategory === category}
              onHoverCategory={setActiveCategory}
            />
          ))}
        </div>
      </div>
    </StickySection>
  );
};

export default SkillsGrid;
