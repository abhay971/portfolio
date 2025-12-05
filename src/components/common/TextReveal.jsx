import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';

const TextReveal = memo(({
  children,
  className = '',
  style = {},
  delay = 0,
  duration = 1.6,
  blockColor = '#a3e635',
  inline = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <span
      ref={ref}
      className={`relative block ${className}`}
      style={{
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
      <motion.span
        className="absolute inset-0"
        style={{
          backgroundColor: blockColor,
          transformOrigin: 'right',
          willChange: 'transform',
          pointerEvents: 'none',
          zIndex: 10
        }}
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.33, 1, 0.68, 1]
        }}
      />
    </span>
  );
});

TextReveal.displayName = 'TextReveal';

export default TextReveal;
