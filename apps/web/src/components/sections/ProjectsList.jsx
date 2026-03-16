import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const ProjectsList = ({ projects = [] }) => {
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
      className="relative h-[360vh] md:h-[400vh] bg-[#050505] border-t border-white/5"
    >
      <div className="sticky top-0 h-screen max-w-[1400px] mx-auto flex overflow-hidden px-4 md:px-6">
        <div className="hidden lg:flex flex-col justify-center flex-none w-[33%] pr-8">
          <h2 className="text-5xl xl:text-7xl font-bold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
            Selected
            <br />
            Works
          </h2>
        </div>

        <div className="flex flex-1 items-center overflow-hidden">
          <div className="absolute top-6 left-4 right-4 z-20 lg:hidden pointer-events-none">
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
              Selected Works
            </h2>
          </div>

          <motion.div style={{ x }} className="flex gap-4 sm:gap-8 md:gap-10 lg:gap-12 pr-6 md:pr-12">
            {projects.map((project, index) => (
              <div
                key={project._id || project.id || `${project.title}-${index}`}
                className="group relative h-[70svh] min-h-[450px] md:h-[70vh] w-[90vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] xl:w-[48vw] flex-shrink-0 flex flex-col justify-end p-5 sm:p-8 md:p-10 glass-panel rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 hover:border-purple-500/50 transition-colors duration-500"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-20 sm:opacity-30 group-hover:opacity-50 transition-opacity duration-700 scale-105 group-hover:scale-100 transition-transform ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                </div>

                <div className="relative z-20 flex min-h-fit flex-col transform md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-4 md:mb-6 w-full">
                    <span className="max-w-[80%] px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[9px] sm:text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.18em] text-white border border-white/20">
                      {project.role}
                    </span>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-black hover:bg-purple-500 hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      <ArrowUpRight size={18} className="sm:size-5" />
                    </a>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-base md:text-lg font-light leading-relaxed max-w-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-6 flex justify-between items-end gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-200">
                    <div className="flex flex-wrap gap-2 max-w-[70%]">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] sm:text-xs font-mono text-purple-400/80">
                          #{tag.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/60 hover:text-purple-400 transition-colors uppercase font-mono text-[9px] sm:text-xs tracking-[0.15em] flex items-center gap-1.5 sm:gap-2 shrink-0 mb-1"
                    >
                      Code <Github size={12} className="sm:size-14" />
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
