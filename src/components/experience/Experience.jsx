import { motion } from 'framer-motion';
import { useRef } from 'react';

const Experience = () => {
  const sectionRef = useRef(null);

  const experiences = [
    {
      id: 1,
      year: '2024',
      period: 'Present',
      title: 'Full Stack Developer',
      company: 'Tech Startup',
      achievements: [
        'Built responsive web applications',
        'Implemented modern UI/UX designs',
        'Collaborated with cross-functional teams',
      ],
    },
    {
      id: 2,
      year: '2023',
      period: '1 Year',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      achievements: [
        'Developed interactive user interfaces',
        'Optimized website performance',
        'Worked with React and modern frameworks',
      ],
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-20"
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
              03
            </div>
            <div className="flex flex-col">
              <div className="h-[2px] w-24 bg-lime-400 mb-3" />
              <span
                className="text-base md:text-lg uppercase tracking-[0.3em] text-lime-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Career Journey
              </span>
            </div>
          </div>
        </motion.div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Card */}
              <motion.div
                className="relative h-full p-6 md:p-8 bg-transparent border-2 border-white/10 hover:border-lime-400 transition-all duration-700 overflow-hidden"
                whileHover={{ y: -10 }}
              >
                {/* Background Overlay on Hover */}
                <div className="absolute inset-0 bg-lime-400 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Year */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span
                      className="text-5xl md:text-6xl lg:text-7xl font-bold text-lime-400 group-hover:text-black transition-colors duration-700"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}
                    >
                      {experience.year}
                    </span>
                    <span
                      className="text-sm uppercase text-gray-400 group-hover:text-black/70 transition-colors duration-700"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
                    >
                      {experience.period}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl font-bold uppercase mb-2 text-white group-hover:text-black transition-colors duration-700"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: '0.02em',
                      lineHeight: 1.1,
                    }}
                  >
                    {experience.title}
                  </h3>

                  {/* Company */}
                  <p
                    className="text-base text-lime-400 group-hover:text-black font-semibold mb-6 transition-colors duration-700"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    @ {experience.company}
                  </p>

                  {/* Divider */}
                  <div className="h-[1px] w-16 bg-lime-400 group-hover:bg-black transition-colors duration-700 mb-6" />

                  {/* Achievements */}
                  <ul className="space-y-3">
                    {experience.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm md:text-base text-gray-300 group-hover:text-black/80 transition-colors duration-700"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span className="text-lime-400 group-hover:text-black transition-colors duration-700 mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-lime-400 group-hover:border-black transition-colors duration-700" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-lime-400 group-hover:border-black transition-colors duration-700" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
