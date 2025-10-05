import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';

const LazyLottie = ({ animationData, loop = true, className }) => {
  const [load, setLoad] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the component is intersecting with the viewport
        if (entries[0].isIntersecting) {
          setLoad(true); // Set state to load the Lottie animation
          observer.disconnect(); // Stop observing, as we only need to do this once
        }
      },
      {
        // Start loading when the component is 200px away from the screen
        rootMargin: '200px', 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // The Lottie component is only rendered when `load` is true
  return (
    <div ref={ref} className={className} style={{ minHeight: '100px' }}>
      {load ? <Lottie animationData={animationData} loop={loop} /> : null}
    </div>
  );
};

export default LazyLottie;