import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import storiesData from '../data/stories.json';
import AnimationDisplay from '../components/AnimationDisplay'; // Import the new component
import { ArrowLeft, Home, RotateCcw, XCircle } from 'lucide-react';

const StoryPage = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [currentChapterId, setCurrentChapterId] = useState('intro');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const foundStory = storiesData.stories.find(s => s.id === storyId);
    if (foundStory) {
      setStory(foundStory);
      const introChapter = foundStory.chapters.find(ch => ch.id === 'intro');
      if (introChapter) {
        setCurrentChapterId('intro');
      }
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [storyId]);

  const currentChapter = story?.chapters.find(ch => ch.id === currentChapterId);

  const handleChoice = (nextChapterId) => {
    const nextChapter = story.chapters.find(ch => ch.id === nextChapterId);
    if (nextChapter) {
      setCurrentChapterId(nextChapterId);
    }
  };

  const handleRestart = () => {
    setCurrentChapterId('intro');
  };

  if (notFound) {
    // ... (Not Found JSX remains the same)
    return <div>Story Not Found</div>;
  }

  if (!story || !currentChapter) {
    // ... (Loading JSX remains the same)
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* --- Top Navigation Buttons --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex flex-wrap gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/stories')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white/80 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Story
          </motion.button>
        </motion.div>

        {/* --- Main Two-Column Layout --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapterId}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            {/* Left Column: Animation */}
            <div className="relative h-96 lg:h-[500px] glass-panel rounded-3xl border border-white/10 overflow-hidden">
              <AnimationDisplay animationType={currentChapter.animation} />
            </div>

            {/* Right Column: Story Content */}
            <div className="glass-panel rounded-3xl border border-white/10 p-8">
              <div className="mb-6">
                <div className={`inline-block text-5xl mb-4 bg-gradient-to-br ${story.color} p-4 rounded-2xl shadow-lg`}>
                  {story.icon}
                </div>
                <h2 className="font-hero text-4xl uppercase text-white">
                  {currentChapter.title}
                </h2>
              </div>

              <p className="text-xl text-white/80 leading-relaxed mb-8 font-sans">
                {currentChapter.text}
              </p>

              {currentChapter.isEnding ? (
                // --- End of Story UI ---
                <div className="space-y-4 text-center">
                   <h3 className="font-hero text-3xl animated-gradient-text">The End</h3>
                   <p className="text-white/70">You have completed this adventure!</p>
                   <div className="flex flex-wrap gap-4 justify-center pt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={handleRestart}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora-pink to-aurora-purple rounded-xl font-action text-lg tracking-wider text-white"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Try Another Path
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/stories')}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-action text-lg tracking-wider text-white"
                      >
                        <Home className="w-5 h-5" />
                        Back to Library
                      </motion.button>
                   </div>
                </div>
              ) : (
                // --- Story Choices UI ---
                <div className="space-y-4">
                  {currentChapter.choices.map((choice, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.03, x: 5, boxShadow: '0 0 20px rgba(142, 45, 226, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice(choice.next)}
                      className="w-full p-5 bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-aurora-purple rounded-2xl text-left transition-all group"
                    >
                      <span className="font-sans text-xl font-bold text-white group-hover:text-aurora-yellow transition-colors">
                        {choice.text}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryPage;