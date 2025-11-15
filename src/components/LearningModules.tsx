import { useState } from 'react';
import { CheckCircle2, Lock, Star, Sparkles, DollarSign } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useGame } from '../App';
import { Lesson } from './Lesson';
import { lessonContent } from '../data/lessons';

interface LessonItem {
  id: string;
  title: string;
  emoji: string;
  xp: number;
  money: number;
}

interface LearningPath {
  id: string;
  name: string;
  emoji: string;
  color: string;
  lessons: LessonItem[];
}

const learningPaths: LearningPath[] = [
  {
    id: 'money-basics',
    name: 'Just Starting to Learn',
    emoji: '📚',
    color: 'blue',
    lessons: [
      { id: 'money-basics-1', title: 'What is Money?', emoji: '💰', xp: 50, money: 50 },
      { id: 'money-basics-2', title: 'Needs vs Wants', emoji: '🤔', xp: 50, money: 50 },
      { id: 'money-basics-3', title: 'Saving Your First €100', emoji: '🎯', xp: 75, money: 75 },
      { id: 'money-basics-4', title: 'Understanding Interest', emoji: '✨', xp: 75, money: 75 },
    ]
  },
  {
    id: 'bank-card',
    name: 'First Bank Card',
    emoji: '📱',
    color: 'purple',
    lessons: [
      { id: 'bank-card-1', title: 'Opening Your First Account', emoji: '🏦', xp: 100, money: 100 },
      { id: 'bank-card-2', title: 'Debit Card Basics', emoji: '💳', xp: 100, money: 100 },
      { id: 'bank-card-3', title: 'Online Banking Safety', emoji: '🔒', xp: 100, money: 100 },
      { id: 'bank-card-4', title: 'Tracking Your Spending', emoji: '📊', xp: 125, money: 125 },
    ]
  },
  {
    id: 'summer-job',
    name: 'First Summer Job',
    emoji: '💼',
    color: 'green',
    lessons: [
      { id: 'summer-job-1', title: 'Understanding Your Paycheck', emoji: '💵', xp: 100, money: 100 },
      { id: 'summer-job-2', title: 'Taxes for Teens', emoji: '📋', xp: 125, money: 125 },
      { id: 'summer-job-3', title: 'Saving vs Spending', emoji: '⚖️', xp: 100, money: 100 },
      { id: 'summer-job-4', title: 'Building Work Skills', emoji: '🎯', xp: 100, money: 100 },
    ]
  },
  {
    id: 'credit-card',
    name: 'First Credit Card',
    emoji: '💳',
    color: 'orange',
    lessons: [
      { id: 'credit-card-1', title: 'Credit Card Basics', emoji: '💳', xp: 150, money: 150 },
      { id: 'credit-card-2', title: 'Credit Score Explained', emoji: '📈', xp: 150, money: 150 },
      { id: 'credit-card-3', title: 'Avoiding Debt Traps', emoji: '⚠️', xp: 175, money: 175 },
      { id: 'credit-card-4', title: 'Using Credit Wisely', emoji: '✨', xp: 150, money: 150 },
    ]
  },
  {
    id: 'first-car',
    name: 'First Car',
    emoji: '🚗',
    color: 'red',
    lessons: [
      { id: 'first-car-1', title: 'Buying vs Leasing', emoji: '🚗', xp: 150, money: 150 },
      { id: 'first-car-2', title: 'Car Insurance 101', emoji: '🛡️', xp: 175, money: 175 },
      { id: 'first-car-3', title: 'True Cost of Ownership', emoji: '💰', xp: 150, money: 150 },
      { id: 'first-car-4', title: 'Car Loans Explained', emoji: '📋', xp: 175, money: 175 },
    ]
  },
  {
    id: 'moving-out',
    name: 'Moving Out Soon',
    emoji: '🏠',
    color: 'teal',
    lessons: [
      { id: 'moving-out-1', title: 'Budgeting for Independence', emoji: '📊', xp: 200, money: 200 },
      { id: 'moving-out-2', title: 'Rent vs Buy', emoji: '🏠', xp: 200, money: 200 },
      { id: 'moving-out-3', title: 'Utility Bills & Costs', emoji: '💡', xp: 175, money: 175 },
      { id: 'moving-out-4', title: 'Emergency Fund Planning', emoji: '🆘', xp: 200, money: 200 },
    ]
  }
];

interface LearningModulesProps {
  activePath: string;
  setActivePath: (path: string) => void;
  recommendedPath?: string;
}

export function LearningModules({ activePath, setActivePath, recommendedPath = '' }: LearningModulesProps) {
  const { completedLessons, addMoney, addXP, completeLesson } = useGame();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [inLesson, setInLesson] = useState(false);

  const currentPath = learningPaths.find(p => p.id === activePath) || learningPaths[0];
  
  // Check if money basics is complete
  const moneyBasicsComplete = learningPaths[0].lessons.every(l => completedLessons.includes(l.id));
  
  // Available paths based on completion
  const availablePaths = learningPaths.filter(path => {
    if (path.id === 'money-basics') return true;
    return moneyBasicsComplete;
  });

  const handleCompleteLesson = () => {
    if (selectedLesson && !completedLessons.includes(selectedLesson)) {
      const lesson = currentPath.lessons.find(l => l.id === selectedLesson);
      if (lesson) {
        completeLesson(lesson.id);
        addMoney(lesson.money);
        addXP(lesson.xp);
      }
    }
    setInLesson(false);
    setSelectedLesson(null);
  };

  const handleStartLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setInLesson(true);
  };

  const handleBackFromLesson = () => {
    setInLesson(false);
    setSelectedLesson(null);
  };

  const isLessonUnlocked = (lesson: LessonItem, index: number) => {
    if (index === 0) return true;
    const prevLesson = currentPath.lessons[index - 1];
    return completedLessons.includes(prevLesson.id);
  };

  const pathProgress = (currentPath.lessons.filter(l => completedLessons.includes(l.id)).length / currentPath.lessons.length) * 100;

  // If in a lesson, show the lesson component
  if (inLesson && selectedLesson && lessonContent[selectedLesson]) {
    return (
      <section className="container mx-auto px-4 py-16">
        <Lesson 
          lessonData={lessonContent[selectedLesson]}
          onComplete={handleCompleteLesson}
          onBack={handleBackFromLesson}
        />
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>Your Life Journey!</span>
          </div>
          <h2 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            {currentPath.emoji} {currentPath.name}
          </h2>
          <p className="text-xl text-gray-700">
            Master money skills for real-life situations!
          </p>
        </div>

        {/* Path Selector */}
        {moneyBasicsComplete && (
          <div className="mb-8">
            {/* Recommended Path Highlight */}
            {recommendedPath && (
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl p-4 mb-4 shadow-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-lg">Recommended Path For You</span>
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-white/90 text-sm">
                  Based on your onboarding quiz, we think you'll love{' '}
                  <span className="font-semibold">
                    {learningPaths.find(p => p.id === recommendedPath)?.emoji}{' '}
                    {learningPaths.find(p => p.id === recommendedPath)?.name}
                  </span>
                  ! 🎯
                </p>
              </div>
            )}
            
            <div className="flex gap-3 justify-center flex-wrap">
              {availablePaths.map(path => (
                <div key={path.id} className="relative">
                  {/* Recommended Badge */}
                  {path.id === recommendedPath && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-pulse">
                        ⭐ For You
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={() => setActivePath(path.id)}
                    className={`px-6 py-3 rounded-2xl text-lg ${
                      path.id === activePath
                        ? 'bg-blue-600 text-white'
                        : path.id === recommendedPath
                        ? 'bg-purple-50 text-purple-700 border-2 border-purple-400 hover:bg-purple-100'
                        : 'bg-white text-gray-700 hover:bg-blue-50'
                    }`}
                    variant={path.id === activePath ? 'default' : 'outline'}
                  >
                    <span className="mr-2">{path.emoji}</span>
                    {path.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white border-4 border-blue-300 shadow-2xl mb-12">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-6xl mb-2">{currentPath.emoji}</div>
                <div className="text-4xl mb-1">
                  {currentPath.lessons.filter(l => completedLessons.includes(l.id)).length}/{currentPath.lessons.length}
                </div>
                <p className="text-blue-100">Lessons Done</p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-2">💰</div>
                <div className="text-4xl mb-1">
                  €{currentPath.lessons.reduce((sum, l) => completedLessons.includes(l.id) ? sum + l.money : sum, 0)}
                </div>
                <p className="text-blue-100">Money Earned</p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-2">⭐</div>
                <div className="text-4xl mb-1">
                  {currentPath.lessons.reduce((sum, l) => completedLessons.includes(l.id) ? sum + l.xp : sum, 0)} XP
                </div>
                <p className="text-blue-100">XP Earned</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-white/90 mb-2">
                <span className="text-xl">Path Progress</span>
                <span className="text-xl">{pathProgress.toFixed(0)}%</span>
              </div>
              <Progress value={pathProgress} className="h-4 bg-blue-300" />
            </div>
          </CardContent>
        </Card>

        {/* Lesson Path - Diagonal/Criss-crossed */}
        <div className="relative min-h-[800px]">
          {/* The diagonal path line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            {currentPath.lessons.map((_, index) => {
              if (index === currentPath.lessons.length - 1) return null;
              const isLeft = index % 2 === 0;
              const nextIsLeft = (index + 1) % 2 === 0;
              
              const startX = isLeft ? '25%' : '75%';
              const endX = nextIsLeft ? '25%' : '75%';
              const startY = `${(index * 180) + 80}px`;
              const endY = `${((index + 1) * 180) + 80}px`;
              
              return (
                <line
                  key={`line-${index}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="url(#pathGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          
          <div className="relative" style={{ zIndex: 1 }}>
            {currentPath.lessons.map((lesson, index) => {
              const isLeft = index % 2 === 0;
              const isCompleted = completedLessons.includes(lesson.id);
              const isUnlocked = isLessonUnlocked(lesson, index);
              const rotation = isLeft ? -3 : 3;
              
              return (
                <div
                  key={lesson.id}
                  className="flex items-center mb-24"
                  style={{ 
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    paddingLeft: isLeft ? '5%' : '0',
                    paddingRight: isLeft ? '0' : '5%'
                  }}
                >
                  <div
                    className={`transform transition-all ${
                      selectedLesson === lesson.id ? 'scale-110' : ''
                    }`}
                    style={{ 
                      transform: `rotate(${rotation}deg)`,
                      maxWidth: '400px'
                    }}
                  >
                    {isUnlocked ? (
                      <div
                        onClick={() => setSelectedLesson(lesson.id)}
                        className="cursor-pointer"
                      >
                        <div className={`bg-white rounded-3xl p-6 shadow-xl border-4 ${
                          isCompleted 
                            ? 'border-green-400' 
                            : selectedLesson === lesson.id 
                            ? 'border-blue-500 shadow-2xl' 
                            : 'border-blue-200'
                        } relative`}>
                          {/* Node circle */}
                          <div className={`absolute ${isLeft ? '-right-8' : '-left-8'} top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-gradient-to-br from-green-400 to-green-600'
                              : 'bg-gradient-to-br from-blue-400 to-blue-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-8 h-8 text-white" />
                            ) : (
                              <Star className="w-8 h-8 text-white" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-5xl">{lesson.emoji}</div>
                            <div className="flex-1">
                              <div className="text-xl text-gray-900 mb-2">{lesson.title}</div>
                              <div className="flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-1 text-yellow-600">
                                  <Star className="w-4 h-4" />
                                  <span>{lesson.xp} XP</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                  <DollarSign className="w-4 h-4" />
                                  <span>€{lesson.money}</span>
                                </div>
                              </div>
                              {!isCompleted && lessonContent[lesson.id] && (
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartLesson(lesson.id);
                                  }}
                                  className="mt-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white w-full"
                                >
                                  Start Lesson 📚
                                </Button>
                              )}
                              {isCompleted && (
                                <div className="mt-3 text-center text-green-600 font-semibold">
                                  ✓ Completed!
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="opacity-60">
                        <div className="bg-gray-100 rounded-3xl p-6 shadow-md border-4 border-gray-300 relative">
                          <div className={`absolute ${isLeft ? '-right-8' : '-left-8'} top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-300 border-4 border-white shadow-lg flex items-center justify-center`}>
                            <Lock className="w-6 h-6 text-gray-500" />
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-5xl grayscale">{lesson.emoji}</div>
                            <div className="flex-1">
                              <div className="text-xl text-gray-500 mb-2">{lesson.title}</div>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Lock className="w-4 h-4" />
                                <span>Complete previous lesson</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trophy at the end */}
          {pathProgress === 100 && (
            <div className="flex justify-center mt-12">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 shadow-2xl border-4 border-yellow-300 text-center transform -rotate-2">
                <div className="text-7xl mb-4">🏆</div>
                <div className="text-3xl text-white mb-2">Path Complete!</div>
                <p className="text-white/90">You've mastered {currentPath.name}!</p>
                {currentPath.id === 'money-basics' && (
                  <p className="text-white mt-2">🎉 New paths unlocked!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}