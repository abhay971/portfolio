import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={handleScroll}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white z-30"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.5,
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0.5,
      }}
    >
      <ChevronDown className="h-8 w-8" />
      <span className="sr-only">Scroll down</span>
    </motion.button>
  );
};

export default ScrollIndicator;
