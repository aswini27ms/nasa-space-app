import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Atom, Signal, CircleDashed, Footprints, Layers, Wind, Sun, Moon } from 'lucide-react';

// --- EXPANDED: More Fun Facts ---
const facts = [
  {
    icon: CircleDashed,
    title: "Black Holes Don't Suck",
    text: "Instead of sucking, black holes are like cosmic traps. Anything that gets too close falls in and can't escape!",
    color: "from-purple-500 via-violet-600 to-purple-700"
  },
  {
    icon: Signal,
    title: "The 'Wow!' Signal",
    text: "In 1977, a powerful radio signal was detected from deep space. It was so unusual the astronomer wrote 'Wow!' on the printout.",
    color: "from-green-400 via-emerald-500 to-teal-600"
  },
  {
    icon: Atom,
    title: "Neutron Stars",
    text: "These are so dense, a single spoonful would weigh more than a mountain! They are the tiny, leftover cores of giant stars.",
    color: "from-blue-400 via-cyan-500 to-blue-600"
  },
  {
    icon: Footprints,
    title: "Moon Footprints",
    text: "The footprints left by astronauts on the Moon will stay there for millions of years because there is no wind to erase them.",
    color: "from-slate-300 via-gray-400 to-slate-500"
  },
  {
    icon: Layers,
    title: "The Biggest Volcano",
    text: "The largest volcano in our solar system is Olympus Mons on Mars. It's three times taller than Mount Everest!",
    color: "from-orange-400 via-amber-500 to-yellow-600"
  },
  {
    icon: Wind,
    title: "Diamond Rain",
    text: "Scientists believe it might rain diamonds on planets like Neptune and Uranus due to their extreme pressure and heat.",
    color: "from-pink-400 via-fuchsia-500 to-purple-600"
  },
  {
    icon: Sun,
    title: "The Sun's True Color",
    text: "Although it looks yellow to us, the Sun is actually a white star. Its light just gets scattered by Earth's atmosphere.",
    color: "from-yellow-500 via-amber-600 to-orange-700"
  },
  {
    icon: Moon,
    title: "Space is Silent",
    text: "Because there is no air in space, sound waves have nothing to travel through. It is completely silent!",
    color: "from-red-500 via-pink-600 to-rose-700"
  },
];


const FunFactsCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const starfieldX = useTransform(mouseX, [-0.5, 0.5], ['20px', '-20px']);
  const starfieldY = useTransform(mouseY, [-0.5, 0.5], ['20px', '-20px']);

  const handleMouseMove = (event) => {
    if (!isHovered) return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0.9 },
  };

  const nextFact = () => setIndex((prev) => (prev === facts.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextFact, 7000);
    return () => clearInterval(timer);
  }, [index, isHovered]);

  const FactIcon = facts[index].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative bg-black/40 backdrop-blur-lg p-8 rounded-3xl border border-white/10 max-w-4xl mx-auto overflow-hidden animate-[animate-glow_6s_ease-in-out_infinite]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ x: starfieldX, y: starfieldY, transition: 'transform 0.1s ease-out' }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </motion.div>

      <motion.div
        className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 -z-10 bg-gradient-to-r ${facts[index].color}`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />
      
      <h2 className="text-3xl md:text-4xl text-center uppercase mb-8 relative z-10 font-hero animated-gradient-text">
        Cosmic Curiosities
      </h2>

      <div className="relative h-40 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute w-full grid grid-cols-1 md:grid-cols-4 items-center gap-6"
          >
            <div className="flex justify-center md:justify-end">
              <motion.div
                className={`bg-gradient-to-br ${facts[index].color} p-4 rounded-2xl shadow-lg relative`}
                animate={{
                    boxShadow: [
                    `0 0 25px rgba(255,255,255,0.2)`,
                    `0 0 45px rgba(255,255,255,0.3)`,
                    `0 0 25px rgba(255,255,255,0.2)`,
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: 'mirror' }}
              >
                <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl animate-pulse"></div>
                <FactIcon className="w-10 h-10 text-white relative z-10" />
              </motion.div>
            </div>
            <div className="md:col-span-3 text-center md:text-left relative z-10">
              <h3 className="text-2xl text-white mb-1 drop-shadow-lg font-hero tracking-wide">{facts[index].title}</h3>
              <p className="text-lg text-white/80">{facts[index].text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- REMOVED: Navigation Arrows --- */}
      
      <div className="flex justify-center gap-2 mt-6 relative z-10">
        {facts.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? 'bg-aurora-pink w-6 shadow-lg shadow-aurora-pink/50' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FunFactsCarousel;