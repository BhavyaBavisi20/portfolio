import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

const ScrambleText = ({ text, delay = 0, duration = 1500, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const queueRef = useRef([]);
  const frameRef = useRef(null);
  const resolveRef = useRef(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
      scramble(text);
    }, delay);
    
    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay]);

  const scramble = (newText) => {
    const length = Math.max(displayText.length, newText.length);
    const promise = new Promise((resolve) => resolveRef.current = resolve);
    
    queueRef.current = [];
    for (let i = 0; i < length; i++) {
      const from = displayText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queueRef.current.push({ from, to, start, end, char: '' });
    }

    let frame = 0;
    const update = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0; i < queueRef.current.length; i++) {
        let { from, to, start, end, char } = queueRef.current[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queueRef.current[i].char = char;
          }
          output += `<span class="opacity-50">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      setDisplayText(output);
      
      if (complete === queueRef.current.length) {
        resolveRef.current();
      } else {
        frameRef.current = requestAnimationFrame(update);
        frame++;
      }
    };
    
    update();
    return promise;
  };

  if (!started) return <span className={className} style={{ opacity: 0 }}>{text}</span>;

  return (
    <span 
      className={className} 
      dangerouslySetInnerHTML={{ __html: displayText }} 
    />
  );
};

export default ScrambleText;
