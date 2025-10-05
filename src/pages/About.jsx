import { motion, useMotionValue, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import LazyLottie from '../components/LazyLottie'; // Import the LazyLottie component
import { Telescope, Sparkles, Sun, Bot, Users } from 'lucide-react';
import uAnimation from '../assets/animations/u.json';
import vAnimation from '../assets/animations/v.json';
import tAnimation from '../assets/animations/t.json'; // Import the new t.json animation

// --- Reusable Feature Card Component ---
const FeatureCard = ({ icon, title, description, index }) => {
  const Icon = icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="relative p-px rounded-3xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-aurora-purple to-aurora-pink rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative h-full glass-panel p-6 rounded-[23px] group hover:animate-[feature-card-glow_4s_ease-in-out_infinite]">
        <div className="bg-gradient-to-br from-aurora-purple/50 to-aurora-blue/50 p-3 rounded-xl inline-block mb-4 shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-hero text-2xl text-white mb-2">{title}</h3>
        <p className="text-white/70 font-sans">{description}</p>
      </div>
    </motion.div>
  );
};

// --- Main About Page Component ---
const About = () => {
  const features = [
    {
      icon: Sun,
      title: 'Real Science, Fun Stories',
      description: 'We base our adventures on real concepts like CMEs, solar wind, and cosmic rays, making learning exciting.'
    },
    {
      icon: Sparkles,
      title: 'Interactive Choices',
      description: 'Your decisions shape the narrative, creating a unique journey every time you play a story.'
    },
    {
      icon: Bot,
      title: 'Engaging Animations',
      description: 'Each chapter comes to life with beautiful Lottie animations that visualize the wonders of space.'
    },
    {
      icon: Users,
      title: 'For All Ages',
      description: 'Perfect for classrooms, families, and any curious mind eager to explore the universe from home.'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 overflow-hidden">
      <div className="container mx-auto max-w-5xl">

        {/* --- Header Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <Telescope className="w-16 h-16 text-aurora-purple mx-auto lg:mx-0 mb-4" />
            <h1 className="text-5xl md:text-7xl font-hero uppercase animated-gradient-text mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-white/80 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
              To make learning about our universe a magical, interactive, and unforgettable adventure for curious minds of all ages.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Lottie animationData={uAnimation} loop={true} className="w-full max-w-md mx-auto" />
          </motion.div>
        </div>

        {/* --- Features Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        {/* --- Meet the Team Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="order-last lg:order-first"
          >
            <LazyLottie animationData={vAnimation} loop={true} className="w-full max-w-md mx-auto" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-hero uppercase animated-gradient-text mb-6">
              Meet the Cosmic Friends
            </h2>
            <p className="text-lg text-white/80 font-sans leading-relaxed">
              Our stories are told through the eyes of charming characters. Each one is a guide to help you explore the incredible science that governs our solar system and beyond.
            </p>
          </motion.div>
        </div>

        {/* --- NEW: Technology Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-hero uppercase animated-gradient-text mb-6">
              Powered by Imagination
            </h2>
            <p className="text-lg text-white/80 font-sans leading-relaxed">
              This experience is built with modern web technologies and a passion for science communication. We bring data and concepts to life using beautiful animations to create an engaging learning environment.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <LazyLottie animationData={tAnimation} loop={true} className="w-full max-w-md mx-auto" />
          </motion.div>
        </div>
        
      </div>
    </div>
  );
};

export default About;