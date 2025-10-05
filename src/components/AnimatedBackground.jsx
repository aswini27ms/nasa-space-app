import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="starfield">
      {/* The star layers remain the same */}
      <div className="star-layer stars1"></div>
      <div className="star-layer stars2"></div>
      <div className="star-layer stars3"></div>

      {/* --- NEW: Add the Nebula Overlay --- */}
      <div className="nebula"></div>
    </div>
  );
};

export default AnimatedBackground;