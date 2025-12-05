import { motion } from 'framer-motion';

const ScrollRevealText = ({ text, className = '', delay = 0, asBlock = false }) => {
  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.01, delay }}
    >
      <motion.h2
        className={`font-bold uppercase text-white ${className}`}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: '-0.05em',
          lineHeight: asBlock ? 1.2 : 0.83,
          whiteSpace: asBlock ? 'normal' : 'nowrap',
        }}
        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
        whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 1.2,
          delay: delay,
          ease: [0.65, 0.05, 0, 1],
        }}
      >
        {text}
      </motion.h2>
    </motion.div>
  );
};

export default ScrollRevealText;
