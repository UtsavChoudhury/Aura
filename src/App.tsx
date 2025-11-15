import { useState, createContext, useContext } from 'react';
import { Hero } from './components/Hero';
import { LearningModules } from './components/LearningModules';
import { PortfolioSimulator } from './components/PortfolioSimulator';
import { InvestmentTopics } from './components/InvestmentTopics';
import { Navigation } from './components/Navigation';
import { FloatingChatbot } from './components/FloatingChatbot';
import { UserStats } from './components/UserStats';
import { FutureMe } from './components/FutureMe';
import { BudgetSimulator } from './components/BudgetSimulator';
import { Onboarding } from './components/Onboarding';
import { Compete } from './components/Compete';
import { SuccessStories } from './components/SuccessStories';

interface GameContextType {
  money: number;
  xp: number;
  level: number;
  completedLessons: string[];
  addMoney: (amount: number) => void;
  spendMoney: (amount: number) => boolean;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  portfolioValue: number;
  portfolioReturns: number;
  portfolioReturnsPercent: number;
  updatePortfolioStats: (value: number, returns: number, percent: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'learn' | 'simulator' | 'future' | 'budget' | 'compete' | 'stories'>('home');
  const [activePath, setActivePath] = useState<string>('money-basics');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [recommendedPath, setRecommendedPath] = useState<string>('');
  const [userGender, setUserGender] = useState<string>('prefer-not-to-say');
  
  // Game state
  const [money, setMoney] = useState(500); // Start with €500
  const [xp, setXP] = useState(150);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  // Portfolio stats for compete - starts at 0 until user invests
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioReturns, setPortfolioReturns] = useState(0);
  const [portfolioReturnsPercent, setPortfolioReturnsPercent] = useState(0);

  const level = Math.floor(xp / 500) + 1;

  const addMoney = (amount: number) => {
    setMoney(prev => prev + amount);
  };

  const spendMoney = (amount: number): boolean => {
    if (money >= amount) {
      setMoney(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addXP = (amount: number) => {
    setXP(prev => prev + amount);
  };

  const completeLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };
  
  const updatePortfolioStats = (value: number, returns: number, percent: number) => {
    setPortfolioValue(value);
    setPortfolioReturns(returns);
    setPortfolioReturnsPercent(percent);
  };

  const handleOnboardingComplete = (answers: Record<string, string>, recommended: string) => {
    console.log('Onboarding answers:', answers);
    console.log('Recommended path:', recommended);
    setRecommendedPath(recommended);
    setUserGender(answers['3'] || 'prefer-not-to-say'); // Store gender from question 4
    setShowOnboarding(false);
    // Navigate to the learning section to start
    setActiveSection('learn');
    setActivePath('money-basics'); // Always start with basics
  };

  const gameValue: GameContextType = {
    money,
    xp,
    level,
    completedLessons,
    addMoney,
    spendMoney,
    addXP,
    completeLesson,
    portfolioValue,
    portfolioReturns,
    portfolioReturnsPercent,
    updatePortfolioStats,
  };

  // Show onboarding first
  if (showOnboarding) {
    return (
      <GameContext.Provider value={gameValue}>
        <Onboarding onComplete={handleOnboardingComplete} />
      </GameContext.Provider>
    );
  }

  return (
    <GameContext.Provider value={gameValue}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        {/* Floating shapes for fun background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300/30 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-40 h-40 bg-blue-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-blue-300/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 right-1/3 w-44 h-44 bg-blue-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10">
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
          <UserStats />
          
          <main>
            {activeSection === 'home' && (
              <>
                <Hero setActiveSection={setActiveSection} />
                <InvestmentTopics setActiveSection={setActiveSection} setActivePath={setActivePath} />
              </>
            )}
            
            {activeSection === 'learn' && <LearningModules activePath={activePath} setActivePath={setActivePath} recommendedPath={recommendedPath} />}
            
            {activeSection === 'simulator' && <PortfolioSimulator />}
            
            {activeSection === 'future' && <FutureMe />}
            
            {activeSection === 'budget' && <BudgetSimulator />}
            
            {activeSection === 'compete' && <Compete />}
            
            {activeSection === 'stories' && <SuccessStories userGender={userGender} />}
          </main>
          
          <footer className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-8 mt-20">
            <div className="container mx-auto px-4 text-center">
              <div className="mb-4">🌟 Aura | Finance for Teens by Teens 🌟</div>
              <p className="text-white/90">Learn, Play, and Grow Your Financial Future!</p>
              <p className="text-white/70 mt-2 text-sm">Educational purposes only. Not financial advice.</p>
            </div>
          </footer>
        </div>

        <FloatingChatbot />
      </div>
    </GameContext.Provider>
  );
}