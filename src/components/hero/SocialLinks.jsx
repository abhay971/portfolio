import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
];

const SocialLinks = () => {
  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {SOCIAL_LINKS.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-400 text-gray-400 hover:text-lime-400 transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + index * 0.08 }}
          whileHover={{ x: -6, backgroundColor: 'rgba(163, 230, 53, 0.15)' }}
        >
          <social.icon className="h-5 w-5 relative z-10" />
          <span className="sr-only">{social.label}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
