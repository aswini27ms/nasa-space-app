import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const StoryCard = ({ story, index }) => {
  // --- Logic for 3D Tilt and Parallax ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-12deg', '12deg']);
  
  const contentX = useTransform(mouseX, [-0.5, 0.5], ['-8px', '8px']);
  const contentY = useTransform(mouseY, [-0.5, 0.5], ['8px', '-8px']);

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
  // ---------------------------------------------

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="group h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      <Link
        to={`/story/${story.id}`}
        className="relative block h-full overflow-hidden rounded-3xl story-card-mystical story-card-celestial story-card-divine story-card-enchanted"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-night-card via-night-bg to-night-bg rounded-3xl z-0"></div>

        <motion.div
          className="relative flex h-full flex-col justify-between p-6 rounded-[23px] bg-night-card/85 backdrop-blur-sm story-card-sacred z-10 transition-all duration-300"
          style={{ transform: 'translateZ(40px)' }}
        >
          {/* Top Section with Icons */}
          <motion.div
            className="flex justify-between items-start mb-4"
            style={{ x: contentX, y: contentY }}
          >
            <div className={`rounded-xl bg-gradient-to-br ${story.color} p-2 text-3xl shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-aurora-purple/40 group-hover:scale-110`}>
              {story.icon}
            </div>
            <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-night-bg/60 text-night-text transition-all duration-300 group-hover:bg-aurora-purple/25 group-hover:text-white border border-aurora-purple/20 group-hover:border-aurora-purple/50 group-hover:scale-105">
              <Rocket size={16} />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-grow">
            <h3 className="font-hero text-2xl uppercase tracking-wider text-night-text transition-all duration-300 group-hover:text-white">
              {story.title}
            </h3>
            <p className={`mt-1 font-sans text-md font-bold bg-gradient-to-r ${story.color} bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105`}>
              {story.subtitle}
            </p>
            <p className="mt-4 font-sans text-sm text-night-text/70 leading-relaxed transition-all duration-300 group-hover:text-night-text/90">
              {story.description}
            </p>
          </div>

          {/* Launch Button */}
          <div className="mt-6 flex items-center justify-end gap-2 font-action text-sm text-night-text opacity-0 transition-all duration-400 group-hover:opacity-100 group-hover:text-aurora-yellow">
            <span className="transition-all duration-300 group-hover:scale-110">LAUNCH</span>
            <ArrowRight size={16} className="transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;