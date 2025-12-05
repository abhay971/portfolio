import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { memo } from 'react';

const PAGES = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' },
];

const SOCIAL_LINKS = [
  { label: 'GITHUB', href: 'https://github.com/yourusername' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/yourusername' },
  { label: 'TWITTER', href: 'https://twitter.com/yourusername' },
  { label: 'YOUTUBE', href: 'https://youtube.com/@yourusername' },
];

// Tech stack logos - Replace with your actual technologies
const TECH_LOGOS = [
  { name: 'React', url: '#' },
  { name: 'Next.js', url: '#' },
  { name: 'TypeScript', url: '#' },
  { name: 'Node.js', url: '#' },
  { name: 'MongoDB', url: '#' },
  { name: 'AWS', url: '#' },
  { name: 'Docker', url: '#' },
  { name: 'Vercel', url: '#' },
];

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a1510] overflow-hidden">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-lime-400/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-lime-400/20" />

      {/* Background Gradient Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-400/5 to-transparent opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-3xl" />

      {/* Main Footer Container */}
      <div className="relative z-10 w-full border-t-2 border-lime-400">
        {/* Email / Contact Section Above Main Grid */}
        <motion.div
          className="border-b-2 border-white/10 py-8 md:py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 text-center">
            <motion.p
              className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 font-bold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              LET'S CREATE SOMETHING AMAZING
            </motion.p>
            <motion.a
              href="mailto:your.email@example.com"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase text-white hover:text-lime-400 transition-colors duration-300 inline-block break-all"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: '0.05em',
              }}
              whileHover={{ scale: 1.05 }}
            >
              ABHAYRANA3169@GMAIL.COM
            </motion.a>
          </div>
        </motion.div>

        {/* 3-Column Layout: PAGES | TAGLINE | FOLLOW ON */}
        <div className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 xl:gap-12">
              {/* Column 1: PAGES Navigation */}
              <motion.div
                className="flex flex-col items-center justify-start"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8 font-bold"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  PAGES
                </p>
                <nav className="space-y-4 text-center w-full">
                  {PAGES.map((page, index) => (
                    <motion.div
                      key={page.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={page.href}
                        className="block text-xl sm:text-2xl md:text-3xl font-bold uppercase text-white hover:text-lime-400 transition-colors duration-300"
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          letterSpacing: '0.08em',
                        }}
                      >
                        {page.label}
                      </a>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>

              {/* Column 2: TAGLINE (Center) */}
              <motion.div
                className="flex flex-col items-center justify-center text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.9]"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: '0.02em',
                  }}
                >
                  <span className="text-white block">CRAFTING</span>
                  <span className="text-lime-400 block whitespace-nowrap">DIGITAL MAGIC</span>
                </h2>
              </motion.div>

              {/* Column 3: FOLLOW ON Social Links */}
              <motion.div
                className="flex flex-col items-center justify-start"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8 font-bold"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  FOLLOW ON
                </p>
                <nav className="space-y-4 text-center w-full">
                  {SOCIAL_LINKS.map((social, index) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xl sm:text-2xl md:text-3xl font-bold uppercase text-white hover:text-lime-400 transition-colors duration-300"
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          letterSpacing: '0.08em',
                        }}
                      >
                        {social.label}
                      </a>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tech Stack / Logos Section - Infinite Carousel */}
        <div className="border-t-2 border-white/10 py-12 md:py-16 overflow-hidden">
          <motion.div
            className="flex gap-12 md:gap-16 lg:gap-20"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{ width: 'max-content', willChange: 'transform' }}
          >
            {/* Duplicate tech logos for seamless loop */}
            {[...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS].map((tech, index) => (
              <span
                key={`${tech.name}-${index}`}
                className="text-xl md:text-2xl lg:text-3xl font-bold uppercase text-lime-400/40 hover:text-lime-400 transition-colors duration-300 whitespace-nowrap"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.08em',
                }}
              >
                {tech.name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar - Dark Background */}
        <div className="relative border-t-2 border-white/10 bg-black/40 py-6">
          {/* Bottom Corner Accents */}
          <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-lime-400/30" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-lime-400/30" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.p
                className="text-sm text-lime-400 font-bold uppercase"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                © {currentYear} Abhay Rana. All rights reserved
              </motion.p>

              {/* <motion.div
                className="flex items-center gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <a
                  href="#privacy"
                  className="text-sm text-white hover:text-lime-400 transition-colors duration-300 font-bold uppercase"
                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.08em' }}
                >
                  PRIVACY POLICY
                </a>
                <a
                  href="#terms"
                  className="text-sm text-white hover:text-lime-400 transition-colors duration-300 font-bold uppercase"
                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.08em' }}
                >
                  TERMS
                </a>
              </motion.div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
