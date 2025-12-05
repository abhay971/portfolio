import { useCustomCursor } from '@/hooks/useCustomCursor';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const { position, isPointer, isHidden } = useCustomCursor();

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isPointer ? 0.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
        }}
      />
    </>
  );
};

export default CustomCursor;
