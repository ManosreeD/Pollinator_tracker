import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PollinatorDetector from './PollinatorDetector';
import SpeciesGuide from './SpeciesGuide';
import ResearchPublications from './ResearchPublications';
import About from './About';
import Setup from './Setup';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        {/* Add padding to account for fixed navbar */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<PollinatorDetector />} />
            <Route path="/species-guide" element={<SpeciesGuide />} />
            <Route path="/research" element={<ResearchPublications />} />
            <Route path="/about" element={<About />} />
            <Route path="/setup" element={<Setup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
