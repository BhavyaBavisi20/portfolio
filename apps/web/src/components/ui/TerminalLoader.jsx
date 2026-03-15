import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TerminalLoader = ({ onComplete }) => {
  const lines = [
    '> Signal detected...',
    '> Bringing intelligence into focus...',
    '> Revealing projects, systems, and experiments...',
    '> Lighting up the neural grid...',
    '> Entering bhavya.ai...',
    'ACCESS GRANTED',
    'where intelligence meets engineering.',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < lines.length) {
      setTimeout(() => setIndex(index + 1), 650);
    } else {
      setTimeout(onComplete, 700);
    }
  }, [index, lines.length, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: index === lines.length ? 0 : 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
    >
      <div className="font-mono text-lg md:text-xl leading-8 space-y-1">
        {lines.slice(0, index).map((line, i) => (
          <div
            key={i}
            className={
              i === lines.length - 1
                ? 'text-purple-400 font-bold'
                : 'text-gray-300'
            }
          >
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TerminalLoader;
