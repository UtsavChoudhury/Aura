import { Sparkles, GraduationCap, Gamepad2, Home, Trophy, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface NavigationProps {
  activeSection: 'home' | 'learn' | 'simulator' | 'future' | 'budget' | 'compete' | 'stories';
  setActiveSection: (section: 'home' | 'learn' | 'simulator' | 'future' | 'budget' | 'compete' | 'stories') => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSectionChange = (section: 'home' | 'learn' | 'simulator' | 'future' | 'budget' | 'compete' | 'stories') => {
    setActiveSection(section);
    setShowDropdown(false);
  };

  const isMoreActive = activeSection === 'future' || activeSection === 'budget' || activeSection === 'stories';

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b-4 border-blue-400">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-2xl shadow-lg transform hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                Aura
              </div>
              <p className="text-xs text-gray-600">Finance for Teens by Teens</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setActiveSection('home')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all transform hover:scale-105 shadow-md ${
                activeSection === 'home' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => setActiveSection('learn')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all transform hover:scale-105 shadow-md ${
                activeSection === 'learn' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              <span>Learn</span>
            </button>
            
            <button
              onClick={() => setActiveSection('simulator')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all transform hover:scale-105 shadow-md ${
                activeSection === 'simulator' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Invest</span>
            </button>
            
            <button
              onClick={() => setActiveSection('compete')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all transform hover:scale-105 shadow-md ${
                activeSection === 'compete' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span>Compete</span>
            </button>
            
            {/* More dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all transform hover:scale-105 shadow-md ${
                  isMoreActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-4 border-blue-400 overflow-hidden">
                  <button
                    onClick={() => handleSectionChange('future')}
                    className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${
                      activeSection === 'future'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-2xl">🔮</span>
                    <div className="text-left">
                      <div>Future Me</div>
                      <div className="text-xs opacity-80">Plan your future</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSectionChange('budget')}
                    className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${
                      activeSection === 'budget'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-2xl">💰</span>
                    <div className="text-left">
                      <div>Budget</div>
                      <div className="text-xs opacity-80">Track spending</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSectionChange('stories')}
                    className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${
                      activeSection === 'stories'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-2xl">⭐</span>
                    <div className="text-left">
                      <div>Success Stories</div>
                      <div className="text-xs opacity-80">Get inspired</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}