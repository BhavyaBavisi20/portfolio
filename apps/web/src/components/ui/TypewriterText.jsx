import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0, className = "" }) => {
    const [displayedText, setDisplayedText] = useState(""); 
    const [started, setStarted] = useState(false);
    
    useEffect(() => { 
        const startTimeout = setTimeout(() => { setStarted(true); }, delay); 
        return () => clearTimeout(startTimeout); 
    }, [delay]);
    
    useEffect(() => { 
        if (!started) return; 
        let currentIndex = 0; 
        const intervalId = setInterval(() => { 
            if (currentIndex < text.length) { 
                setDisplayedText(text.slice(0, currentIndex + 1)); 
                currentIndex++; 
            } else { 
                clearInterval(intervalId); 
            } 
        }, 50); 
        return () => clearInterval(intervalId); 
    }, [text, started]);
    
    return (
        <span className={`${className} inline-block`}>
            {displayedText}
            <motion.span 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }} 
                className="ml-1 inline-block w-[2px] h-[1em] bg-purple-500 align-middle"
            />
        </span>
    );
};

export default TypewriterText;
