import { motion } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8"
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Left: Stacked Name */}
        <motion.a
          href="/"
          className="flex flex-col leading-none"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <span
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase text-white font-black"
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              letterSpacing: '0.03em',
              lineHeight: 0.85,
            }}
          >
            ABHAY
          </span>
          <span
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase text-white font-black"
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              letterSpacing: '0.03em',
              lineHeight: 0.85,
            }}
          >
            RANA
          </span>
        </motion.a>

        {/* Right: Resume Button + Hamburger Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Resume Button */}
          <motion.a
            href="#contact"
            className="hidden sm:flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-lime-400 hover:bg-lime-300 text-black font-bold uppercase transition-all duration-300 text-xs sm:text-sm"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.1em',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>RESUME</span>
          </motion.a>

          {/* Hamburger Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 border-2 border-white hover:border-lime-400 hover:bg-lime-400/10 transition-all duration-300 group"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`w-6 h-0.5 bg-white group-hover:bg-lime-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white group-hover:bg-lime-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-6 h-0.5 bg-white group-hover:bg-lime-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[#0a1510] overflow-hidden z-[9999] animate-fadeIn"
        >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-lime-400" />
              <div className="absolute top-0 left-0 w-64 h-64 border-l-4 border-t-4 border-lime-400/30" />
              <div className="absolute top-0 right-0 w-64 h-64 border-r-4 border-t-4 border-lime-400/30" />
              <div className="absolute bottom-0 left-0 w-64 h-64 border-l-4 border-b-4 border-lime-400/30" />
              <div className="absolute bottom-0 right-0 w-64 h-64 border-r-4 border-b-4 border-lime-400/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-400/5 rounded-full blur-3xl" />
            </div>

            {/* Animated Grid Lines */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 h-[1px] bg-lime-400"
                  style={{ top: `${i * 10}%` }}
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-[1px] bg-lime-400"
                  style={{ left: `${i * 10}%` }}
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 w-16 h-16 flex items-center justify-center border-2 border-lime-400 bg-lime-400/10 hover:bg-lime-400 hover:border-lime-400 hover:rotate-90 transition-all duration-300 group z-[10000]"
            >
              <X className="w-7 h-7 text-lime-400 group-hover:text-black transition-colors duration-300" />
            </button>

            {/* Menu Content Container */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-6 sm:px-8">
                {/* Navigation Links */}
                <nav className="flex flex-col items-center gap-4 md:gap-6 mb-12">
                  {['HOME', 'ABOUT', 'PROJECTS', 'EXPERIENCE', 'CONTACT'].map((item, index) => (
                    <div
                      key={item}
                      className="relative group"
                    >
                      {/* Number Prefix */}
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="flex items-center gap-6 px-8 py-4"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span
                          className="text-2xl md:text-3xl font-bold text-lime-400/40 group-hover:text-lime-400 transition-colors duration-300"
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                          }}
                        >
                          0{index + 1}
                        </span>

                        <span
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-white group-hover:text-lime-400 transition-colors duration-300"
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            letterSpacing: '0.05em',
                          }}
                        >
                          {item}
                        </span>
                      </a>

                      {/* Underline Animation */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-lime-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  ))}
                </nav>

                {/* Social Links / Contact Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t-2 border-lime-400/20">
                  <a
                    href="mailto:abhayrana3169@gmail.com"
                    className="text-sm sm:text-base md:text-lg text-gray-400 hover:text-lime-400 transition-colors duration-300 uppercase tracking-wider break-all"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ABHAYRANA3169@GMAIL.COM
                  </a>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-lime-400" />
                  <div className="flex items-center gap-6">
                    {['GITHUB', 'LINKEDIN', 'TWITTER'].map((social) => (
                      <a
                        key={social}
                        href={`#${social.toLowerCase()}`}
                        className="text-sm text-gray-400 hover:text-lime-400 hover:scale-110 transition-all duration-300 uppercase tracking-wider"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Decorative Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent" />
          </div>
        )}
    </motion.header>
  );
};

export default Header;
