import { motion } from 'framer-motion';

const HeroContent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col items-center text-center"
    >
      {/* Eyebrow */}
      <motion.div
        variants={itemVariants}
        className="mb-6 md:mb-8 relative flex items-center gap-2 sm:gap-4"
      >
        {/* Left decorative element */}
        <motion.div
          className="h-[2px] w-8 sm:w-12 md:w-16"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #a3e635 100%)',
          }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Text with split color effect */}
        <motion.span
          className="relative text-sm sm:text-base lg:text-lg xl:text-2xl uppercase font-black"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '0.15em',
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span
            className="relative"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #a3e635 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            FULL-STACK DEVELOPER
          </span>
        </motion.span>

        {/* Right decorative element */}
        <motion.div
          className="h-[2px] w-8 sm:w-12 md:w-16"
          style={{
            background: 'linear-gradient(90deg, #a3e635 0%, transparent 100%)',
          }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        variants={itemVariants}
        className="font-bold leading-[0.9] md:leading-[0.85] mb-6 md:mb-8 uppercase"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: '0.02em',
          fontSize: 'clamp(2.5rem, 10vw, 10rem)',
        }}
      >
        <span className="block text-white">
          Crafting
        </span>
        <span className="block">
          <span className="text-white">Digital </span>
          <span className="relative inline-block">
            <span className="relative z-10 text-lime-400">
              Excellence
            </span>
            <div className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-lime-400/20 blur-xl" />
          </span>
        </span>
      </motion.h1>

      {/* Highlighted Stats */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-lime-400/20 mb-2"
      >
        <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
        <span className="text-xs sm:text-sm text-gray-300/90">Available for new projects</span>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
