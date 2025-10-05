import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Star, BookOpen, Brain, Users } from 'lucide-react';
import FloatingParticles from './FloatingParticles'; // Import the new component

const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/', icon: Star },
    { name: 'Stories', path: '/stories', icon: BookOpen },
    { name: 'Facts', path: '/facts', icon: Brain },
    { name: 'About', path: '/about', icon: Users },
  ];

  return (
    <footer className="relative bg-night-bg/80 border-t border-white/10 pt-12 pb-8 mt-20 overflow-hidden">
      <FloatingParticles />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-white/80"
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 text-aurora-pink fill-aurora-pink animate-pulse" />
            <span>for curious minds exploring space</span>
          </motion.div>

          <div className="flex gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.path} path={link.path} icon={link.icon} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8 text-white/50 text-sm"
        >
          <p>
            © 2025 | A project by{' '}
            <span className="font-bold animated-gradient-text">
              Team Novah
            </span>
          </p>
          <p>Educational Content for All Ages</p>
        </motion.div>
      </div>
    </footer>
  );
};

const NavLink = ({ path, icon }) => {
  const Icon = icon;
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      className="relative p-3 rounded-full group"
    >
      <Link to={path}>
        <motion.div
          variants={{ 
            rest: { scale: 0 }, 
            hover: { scale: 1 } 
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute inset-0 bg-gradient-to-br from-aurora-pink to-aurora-purple rounded-full opacity-60 blur-md"
        />
        <Icon className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />
      </Link>
    </motion.div>
  );
};

export default Footer;