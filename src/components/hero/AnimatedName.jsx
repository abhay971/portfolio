import { motion } from 'framer-motion';

const AnimatedName = ({ name = "Your Name" }) => {
  // Split the name into individual characters
  const letters = name.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      scale: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100, // Reduced from 200 for better performance
        duration: 0.8,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-tight px-4"
      style={{ perspective: '1000px' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          className="inline-block text-white drop-shadow-[0_8px_30px_rgba(0,0,0,1)] font-extrabold"
          style={{
            textShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)',
            transformOrigin: 'center bottom',
            willChange: 'transform, opacity', // Browser optimization hint
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedName;
