import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'linear-gradient(135deg, #050a08 0%, #0a1510 50%, #0d1a12 100%)',
      }}
    >
      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(163, 230, 53, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163, 230, 53, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 px-4 sm:px-6">
        {/* Name Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          className="text-center"
        >
          <div
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wide leading-none uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            <span className="inline-block text-white">
              ABHAY RANA
            </span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.6,
          }}
          className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium text-lime-400/80"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Developer
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 1,
          }}
          className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-lime-400/50 to-transparent"
        />
      </div>

      {/* Radial Glow Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[800px] h-[800px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.08) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
