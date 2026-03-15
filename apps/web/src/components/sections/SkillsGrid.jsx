import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICON_MAP } from '../../config/icons';

const getTooltipPositionClasses = (x, y) => {
  const horizontalClass = x < 28
    ? 'left-0'
    : x > 72
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';
  const verticalClass = y < 32 ? 'top-full mt-4' : 'bottom-full mb-4';

  return `${horizontalClass} ${verticalClass}`;
};

const getNodeLayout = (skills, category) => {
  const rotationOffsets = {
    'AI-Core': -Math.PI / 2,
    Development: -Math.PI / 2 - Math.PI / 8,
    Tools: -Math.PI / 2 - Math.PI / 7,
  };
  const centerX = 50;
  const centerY = 51;
  const count = skills.length;

  // Slightly reduce radius as node count grows so the ring stays clean.
  const radiusByCount = {
    6: { x: 33, y: 33 },
    7: { x: 32, y: 32 },
    8: { x: 31, y: 31 },
  };
  const radius = radiusByCount[count] || { x: 33, y: 33 };
  const startAngle = rotationOffsets[category] ?? -Math.PI / 2;

  return skills.map((skill, index) => {
    const angle = startAngle + (index / count) * 2 * Math.PI;

    return {
      ...skill,
      x: centerX + Math.cos(angle) * radius.x,
      y: centerY + Math.sin(angle) * radius.y,
    };
  });
};

const NeuralNode = ({
  skill,
  x,
  y,
  isCenter,
  isActive,
  isDimmed,
  onHover,
  onLeave,
  color = 'bg-purple-500',
}) => {
  const tooltipPositionClasses = getTooltipPositionClasses(x, y);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isCenter ? 1.18 : 1,
        opacity: isDimmed ? 0.28 : 1,
        y: isActive && !isCenter ? -8 : 0,
      }}
      transition={{ duration: 0.42, type: 'spring', damping: 16 }}
      whileHover={{ scale: isCenter ? 1.24 : 1.14 }}
      onMouseEnter={() => onHover(skill.name)}
      onClick={() => onHover(skill.name)}
      onMouseLeave={onLeave}
      className={`absolute w-12 h-12 sm:w-16 sm:h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-full flex flex-col items-center justify-center cursor-pointer glass-panel border border-white/10 z-20 overflow-visible transition-colors duration-300 touch-manipulation ${isActive ? 'bg-white/10 border-white/30 text-white' : 'text-gray-400'}`}
      style={{ left: `calc(${x}% - 2.5rem)`, top: `calc(${y}% - 2.5rem)` }}
    >
      <div className={`absolute inset-0 rounded-full blur-md opacity-0 transition-opacity duration-300 ${color} ${isActive ? 'opacity-20' : ''}`} />

      {skill.icon && <skill.icon size={16} className={`sm:size-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />}

      <span className="text-[7px] sm:text-[10px] md:text-[11px] font-mono font-bold mt-0.5 sm:mt-1 tracking-[0.05em] sm:tracking-[0.12em] uppercase text-center w-[150%] sm:w-[135%] break-words leading-tight drop-shadow-md">
        {skill.name}
      </span>

      {isCenter && (
        <div
          className="absolute -inset-2 border border-white/20 rounded-full animate-ping opacity-20"
          style={{ animationDuration: '3s' }}
        />
      )}

      <AnimatePresence>
        {isActive && !isCenter && skill.details && (
          <motion.div
            initial={{ opacity: 0, y: y < 32 ? -8 : 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: y < 32 ? -8 : 8, scale: 0.92 }}
            className={`absolute ${tooltipPositionClasses} min-w-[120px] sm:min-w-[180px] max-w-[160px] sm:max-w-[220px] px-2.5 sm:px-4 py-2 sm:py-2.5 bg-[#0a0a0a]/95 backdrop-blur-md border border-purple-500/30 rounded-xl text-[9px] sm:text-xs font-mono text-purple-300 shadow-xl z-50 pointer-events-none whitespace-normal`}
          >
            {skill.details}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ConnectionLine = ({ startX, startY, endX, endY, isActive }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
      <motion.line
        x1={`${startX}%`}
        y1={`${startY}%`}
        x2={`${endX}%`}
        y2={`${endY}%`}
        stroke={isActive ? '#8b5cf6' : 'rgba(255,255,255,0.05)'}
        strokeWidth={isActive ? 2 : 1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      {isActive && (
        <motion.circle
          cx={`${startX}%`}
          cy={`${startY}%`}
          r="3"
          fill="#8b5cf6"
          animate={{ cx: [`${startX}%`, `${endX}%`], cy: [`${startY}%`, `${endY}%`] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </svg>
  );
};

const NeuralMap = ({ category, skills, isCategoryActive, onHoverCategory }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const containerRef = useRef(null);
  const centerX = 50;
  const centerY = 50;
  const nodes = useMemo(() => getNodeLayout(skills, category), [skills, category]);

  return (
    <div ref={containerRef} className="relative w-full h-[420px] sm:h-[460px] md:h-[530px] group">
      <div className="absolute inset-0 rounded-[2rem] border border-white/6 bg-[#0a0a0a]" />
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[100px]" />
      </div>

      {nodes.map((node) => {
        const isConnectionActive = hoveredSkill === node.name || hoveredSkill === category;

        return (
          <ConnectionLine
            key={`line-${node.name}`}
            startX={centerX}
            startY={centerY}
            endX={node.x}
            endY={node.y}
            isActive={isConnectionActive || isCategoryActive}
          />
        );
      })}

      <NeuralNode
        skill={{ name: category, icon: null }}
        x={centerX}
        y={centerY}
        isCenter={true}
        isActive={hoveredSkill === category || isCategoryActive}
        isDimmed={hoveredSkill && hoveredSkill !== category && !nodes.find((node) => node.name === hoveredSkill)}
        onHover={() => {
          onHoverCategory(category);
          setHoveredSkill(category);
        }}
        onLeave={() => {
          onHoverCategory(null);
          setHoveredSkill(null);
        }}
        color="bg-white"
      />

      {nodes.map((node) => (
        <NeuralNode
          key={node.name}
          skill={node}
          x={node.x}
          y={node.y}
          isCenter={false}
          isActive={hoveredSkill === node.name}
          isDimmed={Boolean(hoveredSkill && hoveredSkill !== node.name && hoveredSkill !== category)}
          onHover={() => {
            onHoverCategory(category);
            setHoveredSkill(node.name);
          }}
          onLeave={() => {
            onHoverCategory(null);
            setHoveredSkill(null);
          }}
        />
      ))}
    </div>
  );
};

const SkillsGrid = ({ categories = [] }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const normalizedCategories = categories.map((category) => ({
    ...category,
    skills: (category.skills || []).map((skill) => ({
      ...skill,
      icon: ICON_MAP[skill.icon] || null,
    })),
  }));
  const categoryNames = normalizedCategories.map((category) => category.name);

  return (
    <section id="skills" className="py-20 md:py-28 px-4 sm:px-6 bg-[#050505] border-t border-white/5 relative z-10">
      <div className="max-w-[1680px] mx-auto space-y-12">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30"
          >
            The Neural Grid
          </motion.h2>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 xl:justify-end">
            {categoryNames.map((tab) => (
              <button
                key={tab}
                onMouseEnter={() => setActiveCategory(tab)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] transition-all duration-300 border ${activeCategory === tab ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-9">
          {normalizedCategories.map((category) => (
            <NeuralMap
              key={category._id || category.name}
              category={category.name}
              skills={category.skills}
              isCategoryActive={activeCategory === category.name}
              onHoverCategory={setActiveCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
