import { motion, useMotionValue, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import LazyLottie from '../components/LazyLottie'; // Import the LazyLottie component
import InfoCard from '../components/InfoCard';
import rocketAnimation from '../assets/animations/rocket.json';
import newAnimation from '../assets/animations/r.json';
import { Sun, Wind, Shield, Sparkles } from 'lucide-react';
import FunFactsCarousel from '../components/FunFactsCarousel';

const Star = ({ style }) => (
  <motion.div 
    className="absolute bg-white/80 rounded-full"
    style={style} 
    initial={{ scale: 0 }}
    animate={{ scale: 1, transition: { duration: 1, delay: 0.5 } }}
  />
);

const spaceWeatherInfo = [
  {
    icon: Sun,
    title: "The Active Sun",
    text: "Our Sun is a busy star! It sometimes has huge bursts of energy called solar flares and sends out a constant stream of particles called the solar wind.",
  },
  {
    icon: Wind,
    title: "Cosmic Journey",
    text: "These solar particles travel all the way through space to Earth. Think of them as cosmic messengers on a very long journey!",
  },
  {
    icon: Shield,
    title: "Earth's Shield",
    text: "Luckily, Earth has an invisible superhero shield! It's our magnetic field, and it protects us from most of the particles from the Sun.",
  },
  {
    icon: Sparkles,
    title: "Beautiful Auroras",
    text: "When the solar particles meet our shield, they create a beautiful light show in the sky called the aurora (the Northern and Southern Lights).",
  },
];

const Home = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rocketX = useTransform(mouseX, [-1, 1], [-25, 25]);
  const rocketY = useTransform(mouseY, [-1, 1], [-25, 25]);
  const starX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const starY = useTransform(mouseY, [-1, 1], [-10, 10]);
  const rJsonX = useTransform(mouseX, [-1, 1], [15, -15]);
  const rJsonY = useTransform(mouseY, [-1, 1], [15, -15]);

  const handleMouseMove = (event) => {
    const { clientWidth, clientHeight } = event.currentTarget;
    const { clientX, clientY } = event;
    const x = (clientX / clientWidth) * 2 - 1;
    const y = (clientY / clientHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const heroText = "Join our cosmic friends as you soar across the galaxy on amazing adventures! Discover the secrets of the Sun, ride the powerful solar wind, and help paint the night sky with the dazzling colors of the aurora.".split(" ");
  
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.5 } }
  };

  const textChildVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 overflow-x-hidden">
      <div className="container mx-auto">
        
        <div 
          className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-24 min-h-[60vh]"
          onMouseMove={handleMouseMove}
        >
          <Star style={{ x: starX, y: starY, top: '20%', left: '10%', width: '8px', height: '8px' }} />
          <Star style={{ x: starX, y: starY, top: '80%', left: '30%', width: '12px', height: '12px' }} />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center md:text-left">
              <span className="font-hero uppercase text-3d-glow">
                Space Weather Stories
              </span>
            </h1>

            <motion.p 
              className="text-xl md:text-2xl text-white/80 max-w-xl mx-auto md:mx-0 leading-relaxed"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {heroText.map((word, index) => (
                <motion.span key={index} variants={textChildVariants} className="inline-block mr-[0.5em]">
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <motion.div 
            className="relative flex justify-center items-center"
            style={{ x: rocketX, y: rocketY }}
          >
            {/* We keep the regular Lottie component here as it's visible on page load */}
            <Lottie animationData={rocketAnimation} loop={true} className="w-full max-w-md" />
          </motion.div>
        </div>

        <div className="py-16">
          <FunFactsCarousel />
        </div>

        <div id="info" className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            style={{ x: rJsonX, y: rJsonY }} 
          >
            {/* --- UPDATED: Swapped Lottie for LazyLottie here --- */}
            <LazyLottie animationData={newAnimation} loop={true} className="w-full max-w-sm mx-auto" />
          </motion.div>

          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="font-hero text-4xl md:text-5xl text-center lg:text-left uppercase mb-8 animated-gradient-text"
            >
              What is Space Weather?
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {spaceWeatherInfo.map((item, index) => (
                <InfoCard 
                  key={index}
                  index={index}
                  icon={item.icon}
                  title={item.title}
                  text={item.text}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;