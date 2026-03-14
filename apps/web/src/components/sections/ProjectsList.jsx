import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS } from '../../data';

const ProjectsList = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);

  return (
    <section
      ref={targetRef}
      id="work"
      className="relative h-[400vh] bg-[#050505] border-t border-white/5"
    >
      <div className="sticky top-0 h-screen max-w-[1400px] mx-auto flex overflow-hidden px-6">

        {/* LEFT: Title column — same 4/12 proportion as StickySection, only on large screens */}
        <div className="hidden lg:flex flex-col justify-center flex-none w-[33%] pr-8">
          <h2 className="text-5xl xl:text-7xl font-bold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
            Selected<br />Works
          </h2>
        </div>

        {/* RIGHT: Horizontal scroll track — fills remaining space */}
        <div className="flex flex-1 items-center overflow-hidden">
          {/* Mobile: title pinned at top */}
          <div className="absolute top-6 left-6 right-6 z-20 lg:hidden pointer-events-none">
            <h2 className="text-3xl font-bold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
              Selected Works
            </h2>
          </div>

          <motion.div style={{ x }} className="flex gap-8 md:gap-10 lg:gap-12 pr-12">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className="group relative h-[65vh] md:h-[70vh] w-[80vw] sm:w-[65vw] lg:w-[55vw] xl:w-[48vw] flex-shrink-0 flex flex-col justify-end p-8 md:p-10 glass-panel rounded-[3rem] overflow-hidden border border-white/5 hover:border-purple-500/50 transition-colors duration-500"
              >
                {/* Cinematic image background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 scale-105 group-hover:scale-100 transition-transform ease-out"
                    />
                  )}
                  {/* Dark gradient overlay — heavier at bottom so text is always readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 z-10" />
                </div>

                {/* Content */}
                <div className="relative z-20 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-5 w-full">
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-white border border-white/20">
                      {project.role}
                    </span>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-purple-500 hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-xl mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <div className="flex flex-wrap gap-2 max-w-[70%]">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-mono text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:text-purple-400 transition-colors uppercase font-mono text-xs tracking-widest flex items-center gap-2"
                    >
                      Code <Github size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
