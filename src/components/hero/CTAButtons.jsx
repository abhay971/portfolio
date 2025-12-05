import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, FileDown } from 'lucide-react';

const CTAButtons = () => {
  const handleContact = () => {
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResume = () => {
    // Open resume in new tab or download
    window.open('/resume.pdf', '_blank');
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <motion.button
        onClick={handleContact}
        className="group relative px-6 py-3 md:px-8 md:py-4 bg-lime-400 hover:bg-lime-300 text-black rounded-lg md:rounded-xl font-bold overflow-hidden flex items-center justify-center gap-2 transition-all duration-300 text-sm md:text-base"
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(163, 230, 53, 0.5)' }}
        whileTap={{ scale: 0.98 }}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <Mail className="h-4 w-4 md:h-5 md:w-5 relative z-10" />
        <span className="relative z-10">Get in Touch</span>
      </motion.button>

      <motion.button
        onClick={handleResume}
        className="group px-6 py-3 md:px-8 md:py-4 bg-white/5 backdrop-blur-sm border-2 border-lime-400/30 hover:border-lime-400 text-white rounded-lg md:rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(163, 230, 53, 0.1)' }}
        whileTap={{ scale: 0.98 }}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <FileDown className="h-4 w-4 md:h-5 md:w-5 group-hover:text-lime-400 transition-colors" />
        <span className="group-hover:text-lime-400 transition-colors">View Resume</span>
      </motion.button>
    </motion.div>
  );
};

export default CTAButtons;
