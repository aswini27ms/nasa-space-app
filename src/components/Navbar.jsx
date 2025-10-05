import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, BookOpen, Users, Mail, Star, Brain } from 'lucide-react';
// import ThemeToggle from './ThemeToggle'; // ThemeToggle is no longer used

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/', icon: Star },
    { name: 'Stories', path: '/stories', icon: BookOpen },
    { name: 'Facts', path: '/facts', icon: Brain },
    { name: 'About', path: '/about', icon: Users }
  ];

  const isActive = (path) => location.pathname === path;

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, height: 0, transition: { when: "afterChildren" } }
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                    ${isScrolled 
                      ? 'shadow-2xl shadow-black/20 bg-aurora-dark/80 backdrop-blur-md'
                      : 'bg-transparent'
                    } 
                    border-b border-white/10`}
      >
        <div className={`container mx-auto px-4 lg:px-6 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'} relative`}>
          <div className="flex items-center justify-between">
            
            {/* --- UPDATED: Logo --- */}
            <Link to="/" className="flex items-center gap-3 group relative z-10" onClick={() => setIsOpen(false)}>
              {/* Animated Rocket Icon */}
              <motion.div
                className="relative"
                animate={{ x: [0, 5, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, rotate: 15, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-aurora-pink/30 to-aurora-purple/30 rounded-full blur-sm"></div>
                <Rocket className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
              </motion.div>
              
              {/* --- REMOVED: Sparkles icon in a circle --- */}
              
              <div>
                <span className="text-xl lg:text-2xl font-hero uppercase tracking-wider text-white">
                  Space Stories
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <div className="relative flex gap-1 bg-black/20 rounded-full p-1.5 backdrop-blur-sm border border-white/10">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative flex items-center gap-2 px-4 lg:px-5 py-2 rounded-full font-sans font-bold text-sm lg:text-base transition-colors duration-300 z-10
                                  ${isActive(link.path)
                                    ? 'text-white'
                                    : 'text-white/70 hover:text-white'
                                  }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>

                      {isActive(link.path) && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 bg-gradient-to-r from-aurora-pink to-aurora-purple rounded-full -z-10 animate-[animate-pill-glow_4s_ease-in-out_infinite]"
                          style={{ borderRadius: 9999 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
              
              {/* --- REMOVED: ThemeToggle button --- */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button 
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 p-2"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-[68px] left-0 right-0 z-40 bg-aurora-dark/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-2">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                      <motion.div
                        variants={mobileLinkVariants}
                        className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-base transition-all ${
                          isActive(link.path)
                            ? 'bg-gradient-to-r from-aurora-pink to-aurora-purple text-white'
                            : 'text-white/80 hover:bg-white/10'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{link.name}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;