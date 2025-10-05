import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stories from './pages/Stories';
import StoryPage from './pages/StoryPage';
import About from './pages/About';
import Facts from './pages/Facts'; 
import AnimatedBackground from './components/AnimatedBackground'; // Import the new component

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* The main div now has a simple dark background, the component handles the rest */}
        <div className="min-h-screen bg-aurora-dark text-white relative">
          <AnimatedBackground /> {/* Add the starfield here */}

          <Navbar />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/story/:storyId" element={<StoryPage />} />
              <Route path="/facts" element={<Facts />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          {/* You may want to give your Footer a semi-transparent background to see the stars behind it */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;