import { motion, useMotionValue, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import StoryCard from '../components/StoryCard';
import storiesData from '../data/stories.json';
import spaceAnimation from '../assets/animations/space.json'; // Import space animation
import sAnimation from '../assets/animations/s.json'; // Import s animation

const Stories = () => {
  const { stories } = storiesData;

  // --- Logic for mouse-tracking parallax effect ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const lottieX = useTransform(mouseX, [-1, 1], [-20, 20]);
  const lottieY = useTransform(mouseY, [-1, 1], [-20, 20]);

  const handleMouseMove = (event) => {
    const { clientWidth, clientHeight } = event.currentTarget;
    const { clientX, clientY } = event;
    const x = (clientX / clientWidth) * 2 - 1;
    const y = (clientY / clientHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };
  // --------------------------------------------------

  // Animation variants for the grid of cards
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each card will appear 0.1s after the previous one
      },
    },
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 overflow-hidden">
      <div className="container mx-auto">
        
        {/* --- NEW: Hero-style Header Section --- */}
        <div 
          className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-20"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-hero uppercase mb-4 animated-gradient-text">
              Story Library
            </h1>
            <p className="text-xl text-white/80 max-w-xl mx-auto md:mx-0">
              Explore all our space weather adventures and discover the amazing world beyond Earth! Each story is a new mission.
            </p>
          </motion.div>

          <motion.div 
            className="relative flex justify-center items-center"
            style={{ x: lottieX, y: lottieY }}
          >
            <Lottie animationData={spaceAnimation} loop={true} className="w-full max-w-md" />
          </motion.div>
        </div>

        {/* --- UPDATED: Animated Grid Section with S Animation --- */}
        <div className="relative">
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {/* Left side - S Animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1 flex justify-center items-start"
            >
              <div className="sticky top-32">
                <motion.div
                  className="relative"
                  style={{ x: lottieX, y: lottieY }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Lottie
                    animationData={sAnimation}
                    loop={true}
                    className="w-full max-w-sm"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Story Cards */}
            <motion.div
              variants={gridContainerVariants}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {stories.map((story, index) => (
                  <StoryCard key={story.id} story={story} index={index} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Stories;