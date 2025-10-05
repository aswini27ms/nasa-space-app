import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import FactCard from '../components/FactCard';
import factsData from '../data/facts.json';
import spaceAnimation from '../assets/animations/space.json'; // Re-using a cool animation

const Facts = () => {
  return (
    <div className="min-h-screen pt-32 pb-12 px-4 overflow-hidden">
      <div className="container mx-auto">
        
        {/* --- Header Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-hero uppercase mb-4 animated-gradient-text">
              Fascinating Facts
            </h1>
            <p className="text-xl text-white/80 max-w-xl mx-auto md:mx-0">
              Journey through the cosmos with these mind-blowing facts about our incredible universe.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center"
          >
            <Lottie animationData={spaceAnimation} loop={true} className="w-full max-w-md" />
          </motion.div>
        </div>

        {/* --- Fact Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {factsData.facts.map((fact, index) => (
            <FactCard key={fact.id} fact={fact} index={index} />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Facts;