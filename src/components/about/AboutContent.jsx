import { motion } from 'framer-motion';

const AboutContent = ({ isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="space-y-6"
    >
      {/* Main Description */}
      <div className="space-y-4">
        <p
          className="text-lg md:text-xl text-gray-100 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          I'm a passionate full-stack developer who loves building elegant,
          high-performance web applications. With a keen eye for design and
          a deep understanding of modern web technologies, I transform complex
          problems into simple, beautiful solutions.
        </p>

        <p
          className="text-base md:text-lg text-gray-300 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          My approach combines technical excellence with creative thinking.
          I believe great software should not only work flawlessly but also
          provide an exceptional user experience.
        </p>
      </div>

      {/* Stats/Highlights */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {[
          { number: '3+', label: 'Years Experience' },
          { number: '50+', label: 'Projects Completed' },
          { number: '15+', label: 'Technologies' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="relative group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
          >
            <div className="relative p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-lime-400/50 transition-all duration-300">
              <div
                className="text-3xl md:text-4xl font-bold text-lime-400 mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stat.number}
              </div>
              <div
                className="text-xs md:text-sm text-gray-400 uppercase tracking-wider"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {stat.label}
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-lime-400/0 group-hover:bg-lime-400/5 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA or additional info */}
      <motion.div
        className="pt-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center gap-3 text-lime-400">
          <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span
            className="text-sm md:text-base font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Currently available for freelance projects
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutContent;
