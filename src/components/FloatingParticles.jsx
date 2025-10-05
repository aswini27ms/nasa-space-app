// A simple array to create multiple particles without extra logic
const particles = Array.from({ length: 15 });

const FloatingParticles = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      {particles.map((_, i) => {
        const size = `${Math.random() * 3 + 1}px`; // Random size between 1px and 4px
        const animationDuration = `${Math.random() * 10 + 5}s`; // Random speed (5s to 15s)
        const animationDelay = `${Math.random() * 5}s`; // Random start delay
        const left = `${Math.random() * 100}%`; // Random horizontal position

        return (
          <div
            key={i}
            className="absolute bottom-0 rounded-full bg-white/80 animate-[animate-particles_linear_infinite]"
            style={{
              width: size,
              height: size,
              left: left,
              animationDuration: animationDuration,
              animationDelay: animationDelay,
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingParticles;