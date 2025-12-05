import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import TextReveal from '../common/TextReveal';

const Projects = () => {
  const sectionRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    // RAF-throttled mousemove handler
    const handleMouseMove = (e) => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          rafId.current = null;
        });
      }
    };

    if (hoveredProject) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredProject]);

  const projects = [
    {
      id: 1,
      number: '01',
      title: 'E-Commerce Platform',
      year: '2024',
      category: 'Full Stack',
      tech: 'React • Node.js • MongoDB',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      number: '02',
      title: 'Task Management App',
      year: '2024',
      category: 'Frontend',
      tech: 'React • TypeScript • Framer',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      number: '03',
      title: 'AI Image Generator',
      year: '2023',
      category: 'Full Stack',
      tech: 'Next.js • OpenAI • PostgreSQL',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      number: '04',
      title: 'Real-time Chat App',
      year: '2023',
      category: 'Full Stack',
      tech: 'React • Socket.io • Express',
      image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      number: '05',
      title: 'Weather Dashboard',
      year: '2023',
      category: 'Frontend',
      tech: 'React • API • Chart.js',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6 mb-8">
            <div
              className="text-7xl md:text-8xl lg:text-9xl font-bold text-lime-400/10"
              style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}
            >
              02
            </div>
            <div className="flex flex-col">
              <div className="h-[2px] w-24 bg-lime-400 mb-3" />
              <span
                className="text-base md:text-lg uppercase tracking-[0.3em] text-lime-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Featured Projects
              </span>
            </div>
          </div>
        </motion.div>

        {/* Projects List - Table Style */}
        <div className="relative">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 mb-2">
            <div
              className="col-span-1 text-xs uppercase tracking-wider text-gray-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              #
            </div>
            <div
              className="col-span-4 text-xs uppercase tracking-wider text-gray-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Project
            </div>
            <div
              className="col-span-3 text-xs uppercase tracking-wider text-gray-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Technology
            </div>
            <div
              className="col-span-2 text-xs uppercase tracking-wider text-gray-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Category
            </div>
            <div
              className="col-span-2 text-xs uppercase tracking-wider text-gray-500 text-right"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Year
            </div>
          </div>

          {/* Projects Rows */}
          <div className="space-y-0">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative border-b border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="grid grid-cols-12 gap-4 min-h-[60px] py-6 md:py-8 cursor-pointer hover:bg-lime-400 transition-all duration-700 relative z-10">
                  {/* Number */}
                  <TextReveal delay={index * 0.1} duration={1.6} className="col-span-2 md:col-span-1">
                    <span
                      className="text-2xl md:text-3xl font-bold text-lime-400 group-hover:text-black transition-colors duration-700"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0, 1)'
                      }}
                    >
                      {project.number}
                    </span>
                  </TextReveal>

                  {/* Project Title */}
                  <TextReveal delay={index * 0.1 + 0.1} duration={1.6} className="col-span-10 md:col-span-4">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase text-white group-hover:text-black transition-colors duration-700 leading-tight"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        letterSpacing: '0.02em',
                        transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0, 1)'
                      }}
                    >
                      {project.title}
                    </h3>
                  </TextReveal>

                  {/* Technology - Hidden on mobile */}
                  <TextReveal delay={index * 0.1 + 0.2} duration={1.6} className="hidden md:block md:col-span-3">
                    <p
                      className="text-sm text-gray-400 group-hover:text-black/80 transition-colors duration-700 mt-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0, 1)'
                      }}
                    >
                      {project.tech}
                    </p>
                  </TextReveal>

                  {/* Category - Hidden on mobile */}
                  <TextReveal delay={index * 0.1 + 0.3} duration={1.6} className="hidden md:block md:col-span-2">
                    <span
                      className="text-sm uppercase text-lime-400 group-hover:text-black font-medium transition-colors duration-700"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '0.1em',
                        transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0, 1)'
                      }}
                    >
                      {project.category}
                    </span>
                  </TextReveal>

                  {/* Year */}
                  <TextReveal delay={index * 0.1 + 0.4} duration={1.6} className="hidden md:block md:col-span-2 text-right">
                    <span
                      className="text-lg font-bold text-white group-hover:text-black transition-colors duration-700"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0, 1)'
                      }}
                    >
                      {project.year}
                    </span>
                  </TextReveal>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cursor-Following Image - Appears on Hover */}
          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                className="fixed pointer-events-none z-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: mousePosition.x - 225,
                  y: mousePosition.y - 150,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  x: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
                  y: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
                }}
                style={{
                  left: 0,
                  top: 0,
                }}
              >
                <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[267px] lg:w-[450px] lg:h-[300px] rounded-lg overflow-hidden shadow-2xl border-4 border-lime-400/30">
                  <img
                    src={projects.find(p => p.id === hoveredProject)?.image}
                    alt="Project preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 to-transparent" />

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-lime-400 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-lime-400 rounded-bl-lg" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
