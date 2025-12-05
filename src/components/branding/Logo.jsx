import { motion } from 'framer-motion';

const Logo = ({ variant = 'default', className = '' }) => {
  const variants = {
    splash: {
      container: 'flex flex-col items-center gap-3',
      name: 'text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight',
      monogram: 'text-xl sm:text-2xl tracking-[0.3em] font-light opacity-60',
    },
    hero: {
      container: 'flex flex-col items-center gap-2',
      name: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight',
      monogram: 'text-lg sm:text-xl tracking-[0.3em] font-light opacity-60',
    },
    default: {
      container: 'flex flex-col items-center gap-2',
      name: 'text-4xl sm:text-5xl font-bold tracking-tight',
      monogram: 'text-base tracking-[0.3em] font-light opacity-60',
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div className={`${currentVariant.container} ${className}`}>
      {/* Main Name Wordmark */}
      <div
        className={currentVariant.name}
        style={{
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <span
          className="inline-block bg-gradient-to-br from-white via-purple-100 to-purple-200 bg-clip-text text-transparent"
          style={{
            letterSpacing: '-0.02em',
            textShadow: '0 0 80px rgba(168, 85, 247, 0.4)',
          }}
        >
          ABHAY RANA
        </span>
      </div>

      {/* Monogram / Subtitle */}
      <div
        className={currentVariant.monogram}
        style={{
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span className="text-purple-300/70">
          AR
        </span>
      </div>
    </div>
  );
};

export default Logo;
