import { motion } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-24 overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20">
        {/* Animated Section Number */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6">
            <div
              className="text-7xl md:text-8xl lg:text-9xl font-bold text-lime-400/10"
              style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1 }}
            >
              01
            </div>
            <div className="flex flex-col">
              <div className="h-[2px] w-24 bg-lime-400 mb-3" />
              <span
                className="text-base md:text-lg uppercase tracking-[0.3em] text-lime-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                About Me
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 xl:gap-24">
          {/* Left Side - Text Content */}
          <div className="space-y-12">
            {/* Impact Headline */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2
                className="font-bold uppercase leading-[0.85] mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(3rem, 8vw, 9rem)',
                }}
              >
                <span className="text-white">Crafting</span>
                <br />
                <span className="text-lime-400 relative inline-block">
                  Digital Magic
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-lime-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
              </h2>
              <p
                className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Transforming ideas into powerful digital experiences
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                I'm a <span className="text-lime-400 font-semibold">full-stack developer</span> with
                a passion for creating exceptional web experiences. I combine cutting-edge technology
                with creative design to build applications that not only work flawlessly but also
                captivate users.
              </p>
              <p
                className="text-base md:text-lg text-gray-400 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                From responsive frontends to robust backends, I craft every pixel and every line
                of code with precision and purpose.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.button
                className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-lg text-base transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(163, 230, 53, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side - Stats & Skills */}
          <div className="space-y-16">
            {/* Experience Metrics - Vertical List */}
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {[
                { value: '03', unit: 'YEARS', label: 'of experience' },
                { value: '50', unit: 'PROJECTS', label: 'delivered' },
                { value: '15', unit: 'TECHNOLOGIES', label: 'mastered' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.unit}
                  className="group relative flex items-center gap-6 pb-6 border-b border-white/5 hover:border-lime-400/30 transition-all duration-500"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="text-6xl md:text-7xl font-bold text-lime-400 leading-none"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      whileHover={{ scale: 1.1, color: '#d9f99d' }}
                    >
                      {stat.value}
                      <span className="text-3xl md:text-4xl align-top">+</span>
                    </motion.div>
                  </div>

                  {/* Label */}
                  <div className="flex-grow">
                    <div
                      className="text-sm md:text-base font-bold text-white uppercase tracking-wider mb-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {stat.unit}
                    </div>
                    <div
                      className="text-xs md:text-sm text-gray-400"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {stat.label}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-8 h-8 rounded-full border-2 border-lime-400 flex items-center justify-center">
                      <span className="text-lime-400 text-lg">→</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tech Stack - Flowing Tags */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] flex-grow bg-gradient-to-r from-lime-400/50 to-transparent" />
                <h3
                  className="text-2xl md:text-3xl font-bold uppercase text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Tech Arsenal
                </h3>
                <div className="h-[2px] flex-grow bg-gradient-to-l from-lime-400/50 to-transparent" />
              </div>

              {/* Flowing tag cloud */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  'React', 'Next.js', 'TypeScript', 'JavaScript',
                  'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
                  'Tailwind CSS', 'Framer Motion', 'Three.js', 'WebGL',
                  'Git', 'Docker', 'AWS', 'Vercel'
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-lime-400/10 hover:bg-lime-400 border border-lime-400/30 hover:border-lime-400 text-lime-400 hover:text-black rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.03 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
