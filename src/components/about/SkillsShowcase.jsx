import { motion } from 'framer-motion';
import { memo } from 'react';

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
  'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'WebGL',
  'Three.js', 'GSAP', 'Git', 'Docker', 'AWS',
  'Vercel', 'REST APIs', 'GraphQL', 'Jest', 'Figma'
];

// Memoized skill item component
const SkillItem = memo(({ skill, index }) => (
  <motion.div
    className="group relative"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.6,
      delay: 0.3 + index * 0.03,
      ease: [0.65, 0.05, 0, 1],
    }}
  >
    <motion.div
      className="relative px-6 py-4 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-lime-400/50 transition-all duration-700 overflow-hidden"
      style={{ transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0, 1)' }}
      whileHover={{
        scale: 1.05,
        backgroundColor: 'rgba(163, 230, 53, 0.08)',
      }}
    >
      <span
        className="relative z-10 block text-center text-sm md:text-base font-medium text-gray-300 group-hover:text-lime-400 transition-colors duration-700"
        style={{
          fontFamily: "'Inter', sans-serif",
          transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0, 1)',
        }}
      >
        {skill}
      </span>

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0, 1)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-transparent" />
      </motion.div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[2px] border-r-[2px] border-lime-400/0 group-hover:border-lime-400/60 group-hover:w-4 group-hover:h-4 transition-all duration-700 rounded-tr-xl"
        style={{ transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0, 1)' }}
      />
    </motion.div>
  </motion.div>
));

SkillItem.displayName = 'SkillItem';

const SkillsShowcase = () => {
  return (
    <div className="border-t border-white/10 pt-16 md:pt-24">
      {/* Section Header */}
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.65, 0.05, 0, 1] }}
      >
        <h3
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white mb-4"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '-0.05em',
            lineHeight: 0.83,
          }}
        >
          Technology Stack
        </h3>
        <p
          className="text-base md:text-lg text-gray-400"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Tools and technologies I use to build exceptional experiences
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {SKILLS.map((skill, index) => (
          <SkillItem key={skill} skill={skill} index={index} />
        ))}
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        className="mt-16 md:mt-20 flex items-center justify-center gap-3"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8, ease: [0.65, 0.05, 0, 1] }}
      >
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />
        <span
          className="text-xs text-gray-500 uppercase tracking-[0.3em]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Continuously Learning
        </span>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />
      </motion.div>
    </div>
  );
};

export default SkillsShowcase;
