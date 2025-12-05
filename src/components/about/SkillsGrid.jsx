import { motion } from 'framer-motion';
import {
  Code2,
  Laptop,
  Database,
  Smartphone,
  Layout,
  Zap,
  Globe,
  GitBranch,
} from 'lucide-react';

const SKILLS = [
  {
    category: 'Frontend',
    icon: Layout,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-lime-400 to-green-400',
  },
  {
    category: 'Backend',
    icon: Database,
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    color: 'from-green-400 to-emerald-400',
  },
  {
    category: 'Tools',
    icon: Zap,
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
    color: 'from-lime-300 to-lime-500',
  },
  {
    category: 'Other',
    icon: Code2,
    skills: ['WebGL', 'Three.js', 'GSAP', 'Jest', 'CI/CD'],
    color: 'from-green-300 to-green-500',
  },
];

const SkillsGrid = ({ isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="space-y-6"
    >
      {/* Skills Header */}
      <div className="mb-8">
        <h3
          className="text-3xl md:text-4xl font-bold uppercase text-white mb-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '0.05em',
          }}
        >
          Tech Stack
        </h3>
        <p
          className="text-sm md:text-base text-gray-400"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Technologies I work with
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {SKILLS.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + categoryIndex * 0.1 }}
          >
            {/* Card */}
            <div className="relative h-full p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-400/40 transition-all duration-300 overflow-hidden">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
              </div>

              {/* Icon */}
              <div className="relative flex items-center gap-3 mb-4">
                <div className="relative">
                  <category.icon className="h-6 w-6 text-lime-400 relative z-10" />
                  <div className="absolute inset-0 blur-lg bg-lime-400/30" />
                </div>
                <h4
                  className="text-lg md:text-xl font-bold uppercase text-white"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: '0.05em',
                  }}
                >
                  {category.category}
                </h4>
              </div>

              {/* Skills List */}
              <div className="relative space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    className="flex items-center gap-2 text-sm md:text-base text-gray-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    <span className="group-hover:text-lime-400/90 transition-colors duration-300">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative corner accent */}
              <motion.div
                className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-lime-400/30 rounded-br-xl" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom accent */}
      <motion.div
        className="flex items-center justify-center gap-2 pt-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-lime-400/50" />
        <span
          className="text-xs text-gray-500 uppercase tracking-widest"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          And more
        </span>
        <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-lime-400/50" />
      </motion.div>
    </motion.div>
  );
};

export default SkillsGrid;
