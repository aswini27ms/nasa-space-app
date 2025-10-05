import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

const InfoCard = ({ icon, title, text, index }) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg']);
  
  const contentX = useTransform(mouseX, [-0.5, 0.5], ['-5px', '5px']);
  const contentY = useTransform(mouseY, [-0.5, 0.5], ['5px', '-5px']);

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    const glareX = event.clientX - left;
    const glareY = event.clientY - top;
    cardRef.current.style.setProperty('--mouse-x', `${glareX}px`);
    cardRef.current.style.setProperty('--mouse-y', `${glareY}px`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    // Optionally reset glare position, or let CSS fade it out
    cardRef.current.style.setProperty('--mouse-x', `0px`); 
    cardRef.current.style.setProperty('--mouse-y', `0px`);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeOut',
      },
    },
  };

  const IconComponent = icon;

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      // --- UPDATED: Added infocard-animated-glow class ---
      className="infocard-glow-border infocard-glare infocard-animated-glow h-full p-6 rounded-3xl cursor-pointer"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="infocard-content" style={{ transform: 'translateZ(40px)' }}>
        <motion.div 
          className="flex items-center gap-4 mb-4"
          style={{ x: contentX, y: contentY }}
        >
          <div className="bg-gradient-to-br from-aurora-purple to-aurora-blue p-3 rounded-xl shadow-lg">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-hero text-xl uppercase tracking-wider text-white">
            {title}
          </h3>
        </motion.div>
        <p className="font-sans text-white/80 leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default InfoCard;