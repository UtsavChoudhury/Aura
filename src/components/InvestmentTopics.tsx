import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lock } from 'lucide-react';
import { useGame } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface InvestmentTopicsProps {
  setActiveSection: (section: 'home' | 'learn' | 'simulator' | 'future' | 'budget' | 'compete' | 'stories') => void;
  setActivePath: (path: string) => void;
}

const topics = [
  {
    id: 'money-basics',
    name: 'Just Starting to Learn',
    emoji: '📚',
    description: 'Begin your money journey here!',
    color: 'from-blue-400 to-blue-600',
    borderColor: 'border-blue-400',
    unlocked: true,
    requiredLessons: []
  },
  {
    id: 'bank-card',
    name: 'First Bank Card',
    emoji: '📱',
    description: 'Master your first account!',
    color: 'from-purple-400 to-purple-600',
    borderColor: 'border-purple-400',
    unlocked: false,
    requiredLessons: ['money-basics-1', 'money-basics-2', 'money-basics-3', 'money-basics-4']
  },
  {
    id: 'summer-job',
    name: 'First Summer Job',
    emoji: '💼',
    description: 'Understand your paycheck!',
    color: 'from-green-400 to-green-600',
    borderColor: 'border-green-400',
    unlocked: false,
    requiredLessons: ['money-basics-1', 'money-basics-2', 'money-basics-3', 'money-basics-4']
  },
  {
    id: 'credit-card',
    name: 'First Credit Card',
    emoji: '💳',
    description: 'Use credit wisely!',
    color: 'from-orange-400 to-orange-600',
    borderColor: 'border-orange-400',
    unlocked: false,
    requiredLessons: ['money-basics-1', 'money-basics-2', 'money-basics-3', 'money-basics-4']
  },
  {
    id: 'first-car',
    name: 'First Car',
    emoji: '🚗',
    description: 'Make smart car decisions!',
    color: 'from-red-400 to-red-600',
    borderColor: 'border-red-400',
    unlocked: false,
    requiredLessons: ['money-basics-1', 'money-basics-2', 'money-basics-3', 'money-basics-4', 'summer-job-1']
  },
  {
    id: 'moving-out',
    name: 'Moving Out Soon',
    emoji: '🏠',
    description: 'Budget for independence!',
    color: 'from-teal-400 to-teal-600',
    borderColor: 'border-teal-400',
    unlocked: false,
    requiredLessons: ['money-basics-1', 'money-basics-2', 'money-basics-3', 'money-basics-4', 'summer-job-1']
  }
];

export function InvestmentTopics({ setActiveSection, setActivePath }: InvestmentTopicsProps) {
  const { completedLessons } = useGame();
  
  const isUnlocked = (topic: typeof topics[0]) => {
    return topic.requiredLessons.every(lesson => completedLessons.includes(lesson));
  };

  const handleTopicClick = (topic: typeof topics[0]) => {
    if (isUnlocked(topic)) {
      setActivePath(topic.id);
      setActiveSection('learn');
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
          Choose Your Path! 🗺️
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Learn money skills for real-life milestones!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {topics.map((topic) => {
          const unlocked = isUnlocked(topic);
          
          return (
            <Card 
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className={`relative overflow-hidden transform transition-all border-4 ${topic.borderColor} ${
                unlocked ? 'shadow-xl hover:scale-105 cursor-pointer' : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {!unlocked && (
                <div className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 z-10">
                  <Lock className="w-5 h-5" />
                </div>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-20`} />
              
              <CardHeader className="relative">
                <div className="text-6xl mb-3">{topic.emoji}</div>
                <CardTitle className="text-2xl text-gray-900">{topic.name}</CardTitle>
                <p className="text-gray-700">{topic.description}</p>
              </CardHeader>
              
              <CardContent className="relative">
                <div className={`px-4 py-2 rounded-full text-white text-sm inline-block ${
                  unlocked ? 'bg-green-500' : 'bg-gray-500'
                }`}>
                  {unlocked ? '✓ Unlocked' : '🔒 Complete Basics'}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}