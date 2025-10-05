import Lottie from 'lottie-react';

// --- Import ALL your animation JSON files with unique names ---
import pAnimation from '../assets/animations/p.json';
import qAnimation from '../assets/animations/q.json';
import rAnimation from '../assets/animations/r.json';
import rocketAnimation from '../assets/animations/rocket.json'; // Assuming this is rocket.json
import sAnimation from '../assets/animations/s.json';
import spaceAnimation from '../assets/animations/space.json'; // Assuming this is the planet animation you showed
import tAnimation from '../assets/animations/t.json';

// --- Define the mapping from your story's animation names to the imported Lottie data ---
const animationMap = {
  // --- Mappings for the "Wacky Magnetic Croc Adventure!" ---
  'map-search': pAnimation,          // Example: Use p.json for map-search
  'jungle-guide': qAnimation,        // Example: Use q.json for jungle-guide
  'science-lab': rAnimation,         // Example: Use r.json for science-lab
  'humming-stones': sAnimation,      // Example: Use s.json for humming-stones
  'camera-fail': tAnimation,         // Example: Use t.json for camera-fail
  'levitating-stones': pAnimation,   // Re-use p.json or add another if you have one
  'photo-proof': qAnimation,
  'nature-protect': rAnimation,
  'science-discovery': sAnimation,
  'fish-spiral': tAnimation,
  'shimmering-pond': pAnimation,
  'croc-mud': qAnimation,
  'newspaper-headline': rAnimation,
  'thinking-reptile': sAnimation,
  'mining-excavator': tAnimation,
  'low-aurora': pAnimation,
  'confused-birds': qAnimation,
  'aurora-fade': rAnimation,
  'earth-from-space': sAnimation,
  'galaxy-spiral': tAnimation,
  'asteroid-warning': pAnimation,
  'magnetic-field-lines': qAnimation,
  'glowing-croc': rAnimation,
  'animal-trap': sAnimation,
  'world-map-hotspots': tAnimation,
  'news-alert': pAnimation,
  'secret-file': qAnimation,

  // --- Mappings for the "Iron Man's Cosmic Choice" ---
  'jet-fizzle': rAnimation,             // Example: Use r.json for jet-fizzle
  'iss-danger': sAnimation,             // Example: Use s.json for iss-danger
  'drone-swarm': tAnimation,            // Example: Use t.json for drone-swarm
  'magnetic-umbrella': pAnimation,      // Example: Use p.json for magnetic-umbrella
  'repulsor-wave': qAnimation,
  'press-conference': rAnimation,
  'global-panic': sAnimation,
  'city-impact': tAnimation,
  'global-response': pAnimation,
  'media-spin': qAnimation,
  'planetary-shield': rAnimation,
  'protests': sAnimation,
  'tech-rival': tAnimation,
  'hostile-takeover': pAnimation,
  'data-leak': qAnimation,
  'shield-humanity': rAnimation,
  'cosmic-arms-race': sAnimation,
  'aegis-blueprint': tAnimation,
  'suit-upgrade': pAnimation,
  'satellite-sabotage': qAnimation,
  'ground-sabotage': rAnimation,
  'security-lockdown': sAnimation,
  'honey-pot': tAnimation,
  'ai-control': pAnimation,
  'iron-throne': qAnimation,
  'alien-threat': rAnimation,
  'earthquake': sAnimation,
  'outsmart-enemy': tAnimation,
  'king-on-throne': pAnimation,
  'heroic-pose': qAnimation,
  'emp-blast': rAnimation,
  'alien-probe': sAnimation,
  'public-speech': tAnimation,
  'journalist': pAnimation,
  'starklink2': qAnimation,
  'open-source': rAnimation,
  'hydra-emerges': sAnimation,
  'iron-man-battle': tAnimation,
  'data-leak-hydra': pAnimation,
  'global-connection': qAnimation,
  'thoughtful-pose': rAnimation,
  'hacker-message': sAnimation,
  'race-against-time': tAnimation,
  'building-trap': pAnimation,
  'spider-web': qAnimation,
  'sunrise': rAnimation,
  'alien-debris': sAnimation,
  'probe-warp': tAnimation,
  'alien-mothership': pAnimation,
  'building-defenses': qAnimation,
  'peace-message': rAnimation,
  'space-armada': sAnimation,
  'handshake': tAnimation,
  'aliens-arrive': pAnimation,
  'alien-library': qAnimation,
  'utopia': rAnimation,
  'future-city': sAnimation,
  'social-chaos': tAnimation,

  // IMPORTANT: For the specific planet animation you shared, I'm assuming 'space.json' corresponds to it.
  // Make sure this name is used for any chapters in stories.json where you want to show it.
  'default-space-animation': spaceAnimation
};

const AnimationDisplay = ({ animationType }) => {
  // Use the specific animation from the map, or fall back to the generic 'spaceAnimation' if not found
  const animationData = animationMap[animationType] || spaceAnimation; 

  // Make sure to set a proper height/width for the Lottie component to be visible
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Lottie animationData={animationData} loop={true} className="max-w-full max-h-full object-contain" />
    </div>
  );
};

export default AnimationDisplay;