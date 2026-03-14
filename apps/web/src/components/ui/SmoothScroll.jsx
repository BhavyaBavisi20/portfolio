import React, { useEffect } from 'react';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Implementing native smooth scrolling on the document root
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="smooth-scroll-container">
      {children}
    </div>
  );
};

export default SmoothScroll;
