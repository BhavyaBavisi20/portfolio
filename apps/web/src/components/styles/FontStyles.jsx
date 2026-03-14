import React from 'react';

const FontStyles = () => (
  <style>{`
    @import url('https://api.fontshare.com/v2/css?f[]=clash-display@200,400,500,600,700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --bg-dark: #050505;
      --card-dark: #0a0a0a;
      --accent-purple: #8b5cf6;
      --accent-blue: #3b82f6;
      --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
    }

    body {
      background-color: var(--bg-dark);
      color: white;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      scroll-behavior: smooth;
      cursor: none; /* Hide default cursor for custom one */
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Clash Display', sans-serif;
    }
    
    /* Reverted to original weights */
    p {
        line-height: 1.6;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #050505; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #8b5cf6; }

    /* Alive Text Gradient */
    .text-alive {
      background: linear-gradient(to right, #666 20%, #8b5cf6 40%, #3b82f6 60%, #666 80%);
      background-size: 200% auto;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: textShine 5s linear infinite;
    }

    @keyframes textShine {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }

    /* Image Gradient Mask */
    .mask-image-bottom {
      mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    }

    /* Glassmorphism Utilities */
    .glass-panel {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    
    .vertical-text {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform: rotate(180deg);
    }

    /* Custom Cursor */
    .cursor {
      width: 20px;
      height: 20px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 150ms var(--ease-out-expo), background-color 150ms;
      top: 0;
      left: 0;
      margin-top: -10px;
      margin-left: -10px;
    }
    
    /* Hover state for cursor */
    body.hovering .cursor {
      transform: scale(2.5);
      background-color: rgba(139, 92, 246, 0.1);
      border-color: var(--accent-purple);
    }
  `}</style>
);

export default FontStyles;
