import image_2860af584c2e69ad5f4672762edae54ae8c60dee from 'figma:asset/2860af584c2e69ad5f4672762edae54ae8c60dee.png';
import { Sparkles, ArrowRight, Rocket, Star } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  setActiveSection: (section: 'home' | 'learn' | 'simulator' | 'future' | 'budget' | 'compete' | 'stories') => void;
}

export function Hero({ setActiveSection }: HeroProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full mb-6 shadow-lg animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span>Start Your Adventure Today!</span>
          <Star className="w-5 h-5" />
        </div>
        
        <h1 className="text-6xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
          Welcome to Aura! 🌟
        </h1>
        
        <h2 className="text-3xl md:text-4xl text-gray-800 mb-6">
          Learn to Invest Like a Pro! 🚀
        </h2>
        
        <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
          Join thousands of young investors on an epic journey to financial success! 
          Play games, earn badges, and become a money master! 💰✨
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <Button
            onClick={() => setActiveSection('learn')}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-10 py-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all text-xl"
          >
            <Rocket className="w-6 h-6 mr-2" />
            Start Learning!
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
          
          <Button
            onClick={() => setActiveSection('simulator')}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-10 py-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all text-xl"
          >
            🎮 Play Now!
          </Button>
          
          <Button
            onClick={() => setActiveSection('future')}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-10 py-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all text-xl"
          >
            ⏰ See Your Future!
          </Button>
          
          <Button
            onClick={() => setActiveSection('budget')}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-10 py-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all text-xl"
          >
            💰 Budget Coach!
          </Button>
          
          <Button
            onClick={() => setActiveSection('compete')}
            className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-10 py-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all text-xl"
          >
            🏆 Compete!
          </Button>
          
          <Button
            onClick={() => setActiveSection('stories')}
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-10 py-7 rounded-2xl shadow-xl transform hover:scale-105 transition-all text-xl"
          >
            📖 Read Stories!
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-blue-300 transform hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">🎯</div>
            <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
              500+ Missions
            </div>
            <p className="text-gray-700">Complete quests and level up!</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-blue-400 transform hover:scale-105 transition-transform">
            <ImageWithFallback 
              src={image_2860af584c2e69ad5f4672762edae54ae8c60dee}
              alt="Moominpappa Guide"
              className="w-20 h-20 mx-auto mb-3 rounded-full"
            />
            <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
              Moominpappa Guide
            </div>
            <p className="text-gray-700">Get help anytime, anywhere!</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-blue-500 transform hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">🏆</div>
            <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
              Win Badges
            </div>
            <p className="text-gray-700">Collect achievements & rewards!</p>
          </div>
        </div>
      </div>
    </section>
  );
}