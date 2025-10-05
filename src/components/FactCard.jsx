import { motion, useMotionValue, useTransform } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const FactCard = ({ fact, index }) => {
  const Icon = LucideIcons[fact.icon] || LucideIcons.HelpCircle;

  // --- Logic for 3D Tilt and Parallax ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-10deg', '10deg']);
  
  const contentX = useTransform(mouseX, [-0.5, 0.5], ['-5px', '5px']);
  const contentY = useTransform(mouseY, [-0.5, 0.5], ['5px', '-5px']);

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.1 }}
      className="group h-full fact-card-hover-lift"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      <div className="relative h-full overflow-hidden rounded-3xl fact-card-border">
        <div className="absolute inset-0 bg-gradient-to-br from-night-card via-night-bg to-night-bg rounded-3xl"></div>
        <motion.div 
          className="relative flex h-full flex-col p-6 rounded-[23px] bg-night-card/80 backdrop-blur-sm fact-card-inner-glow"
          style={{ transform: 'translateZ(30px)' }}
        >
          <motion.div 
            className="flex items-center gap-4 mb-4"
            style={{ x: contentX, y: contentY }}
          >
            <div className={`rounded-xl bg-gradient-to-br ${fact.color} p-3 shadow-lg transition-all duration-300 group-hover:scale-110`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-hero text-2xl uppercase tracking-wider text-white transition-all duration-300 group-hover:text-aurora-yellow">
              {fact.title}
            </h3>
          </motion.div>
          <p className="font-sans text-lg text-white/80 leading-relaxed transition-all duration-300 group-hover:text-white/95">
            {fact.text}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FactCard;