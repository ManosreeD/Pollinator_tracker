import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, GraduationCap, Info, Settings } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'bg-yellow-200' : '';
  };

  return (
    <nav className="bg-yellow-50 shadow-md py-3 px-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl">🐝</span>
            <span className="font-bold text-yellow-700 hidden sm:block">Pollinator Tracker</span>
          </Link>
          
          {/* Navigation links */}
          <div className="flex space-x-1 md:space-x-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors ${isActive('/')}`}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Detector</span>
            </Link>
            
            <Link 
              to="/species-guide" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors ${isActive('/species-guide')}`}
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline">Species</span>
            </Link>
            
            <Link 
              to="/research" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors ${isActive('/research')}`}
            >
              <GraduationCap size={18} />
              <span className="hidden sm:inline">Research</span>
            </Link>
            
            <Link 
              to="/about" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors ${isActive('/about')}`}
            >
              <Info size={18} />
              <span className="hidden sm:inline">About</span>
            </Link>
            
            <Link 
              to="/setup" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors ${isActive('/setup')}`}
            >
              <Settings size={18} />
              <span className="hidden sm:inline">Setup</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}