import { Rocket, Sparkles } from 'lucide-react'; // More thematic icons
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      // Use our new custom colors!
      className="p-2 rounded-full bg-day-card/50 text-day-accent dark:bg-night-card/50 dark:text-night-accent transition-colors"
      whileHover={{ scale: 1.15, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {/* Show Rocket for light mode, Sparkles for dark mode */}
      {theme === 'dark' ? <Rocket className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
    </motion.button>
  );
};

export default ThemeToggle;