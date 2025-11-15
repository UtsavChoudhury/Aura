import { useState } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Sparkles, ArrowRight, Lock } from 'lucide-react';

interface Answer {
  emoji: string;
  label: string;
  value: string;
}

interface QuizScreen {
  question: string;
  answers: Answer[];
}

const quizScreens: QuizScreen[] = [
  {
    question: "What's your biggest financial challenge?",
    answers: [
      { emoji: '💸', label: 'Saving Money', value: 'saving' },
      { emoji: '🤔', label: 'Understanding Investing', value: 'investing' },
      { emoji: '🎯', label: 'Setting Goals', value: 'goals' },
      { emoji: '📊', label: 'Budgeting', value: 'budgeting' }
    ]
  },
  {
    question: "What's your experience level?",
    answers: [
      { emoji: '🌱', label: 'Total Beginner', value: 'beginner' },
      { emoji: '📚', label: 'Learning the Basics', value: 'learning' },
      { emoji: '💡', label: 'Some Knowledge', value: 'intermediate' },
      { emoji: '🎓', label: 'Pretty Confident', value: 'advanced' }
    ]
  },
  {
    question: "What describes you?",
    answers: [
      { emoji: '🎮', label: 'Love Gaming', value: 'gamer' },
      { emoji: '📱', label: 'Tech Savvy', value: 'tech' },
      { emoji: '🎨', label: 'Creative Type', value: 'creative' },
      { emoji: '🚀', label: 'Future Entrepreneur', value: 'entrepreneur' }
    ]
  },
  {
    question: "How do you identify?",
    answers: [
      { emoji: '👦', label: 'Male', value: 'male' },
      { emoji: '👧', label: 'Female', value: 'female' },
      { emoji: '🌈', label: 'Other', value: 'other' },
      { emoji: '🤐', label: 'Prefer Not to Say', value: 'prefer-not-to-say' }
    ]
  }
];

interface RecommendedPath {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

// Function to determine recommended path based on answers
function getRecommendedPath(answers: Record<string, string>): RecommendedPath {
  const challenge = answers['0'];
  const experience = answers['1'];
  const personality = answers['2'];

  // Logic to recommend different paths
  if (challenge === 'saving' || challenge === 'budgeting') {
    return {
      id: 'summer-job',
      name: 'First Summer Job',
      emoji: '💼',
      description: 'Perfect for learning how to earn, save, and manage your first real income!',
      color: 'from-green-400 to-emerald-500'
    };
  }
  
  if (personality === 'tech' || challenge === 'investing') {
    return {
      id: 'bank-card',
      name: 'First Bank Card',
      emoji: '📱',
      description: 'Master digital banking and online money management - perfect for tech-savvy learners!',
      color: 'from-purple-400 to-purple-600'
    };
  }

  if (experience === 'advanced' || experience === 'intermediate') {
    return {
      id: 'credit-card',
      name: 'First Credit Card',
      emoji: '💳',
      description: 'Ready to level up? Learn how to build credit responsibly and wisely!',
      color: 'from-orange-400 to-orange-600'
    };
  }

  if (personality === 'entrepreneur') {
    return {
      id: 'first-car',
      name: 'First Car',
      emoji: '🚗',
      description: 'Understanding big purchases and loans - essential for future entrepreneurs!',
      color: 'from-red-400 to-red-600'
    };
  }

  // Default recommendation
  return {
    id: 'bank-card',
    name: 'First Bank Card',
    emoji: '📱',
    description: 'A great next step for managing your money in the digital world!',
    color: 'from-purple-400 to-purple-600'
  };
}

interface OnboardingProps {
  onComplete: (answers: Record<string, string>, recommendedPath: string) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendedPath, setRecommendedPath] = useState<RecommendedPath | null>(null);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
    setAnswers({ ...answers, [currentScreen]: value });
  };

  const handleNext = () => {
    if (currentScreen < quizScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
      setSelectedAnswer(answers[currentScreen + 1] || null);
    } else {
      // Show recommendation screen
      const recommended = getRecommendedPath(answers);
      setRecommendedPath(recommended);
      setShowRecommendation(true);
    }
  };

  const handleStartJourney = () => {
    if (recommendedPath) {
      onComplete(answers, recommendedPath.id);
    }
  };

  const canProceed = selectedAnswer !== null;

  // Recommendation Screen
  if (showRecommendation && recommendedPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Success Badge */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="bg-gradient-to-r from-green-400 to-green-600 rounded-full p-4 shadow-2xl"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <h2 className="text-3xl text-center mb-4 text-gray-800">
              Your Personalized Path! 🎉
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Based on your answers, we recommend:
            </p>

            {/* Recommended Path Card */}
            <div className={`bg-gradient-to-br ${recommendedPath.color} rounded-2xl p-6 mb-6 text-white shadow-xl`}>
              <div className="text-center">
                <div className="text-6xl mb-3">{recommendedPath.emoji}</div>
                <h3 className="text-2xl mb-2">{recommendedPath.name}</h3>
                <p className="text-white/90">{recommendedPath.description}</p>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-blue-50 border-4 border-blue-200 rounded-2xl p-6 mb-4">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg text-blue-900 mb-2">Start Here First! 📚</h4>
                  <p className="text-sm text-blue-800">
                    Before diving into <span className="font-semibold">{recommendedPath.name}</span>, 
                    you'll need to complete <span className="font-semibold">"Just Starting to Learn"</span> to 
                    build your foundation. Don't worry - it's fun and you'll earn money along the way! 💰
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Preview */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-2xl">📚</span>
                <span>Start Here</span>
              </div>
              <ArrowRight className="w-4 h-4" />
              <div className="flex items-center gap-1">
                <span className="text-2xl">{recommendedPath.emoji}</span>
                <span>Then This!</span>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStartJourney}
            className="w-full py-6 rounded-2xl text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Begin My Journey! 🚀
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Let's build your financial future together!
          </p>
        </motion.div>
      </div>
    );
  }

  // Quiz Screens
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {quizScreens.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentScreen
                  ? 'w-8 bg-gradient-to-r from-blue-500 to-blue-600'
                  : index < currentScreen
                  ? 'w-2 bg-green-500'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-6"
          >
            {/* Question */}
            <h2 className="text-3xl text-center mb-8 text-gray-800">
              {quizScreens[currentScreen].question}
            </h2>

            {/* Answer Cards */}
            <div className="grid grid-cols-2 gap-4">
              {quizScreens[currentScreen].answers.map((answer) => (
                <motion.button
                  key={answer.value}
                  onClick={() => handleAnswerSelect(answer.value)}
                  className={`relative p-6 rounded-2xl border-4 transition-all duration-200 ${
                    selectedAnswer === answer.value
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Selection Indicator */}
                  {selectedAnswer === answer.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1"
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                  )}

                  {/* Emoji */}
                  <div className="text-5xl mb-3">{answer.emoji}</div>

                  {/* Label */}
                  <p className="text-sm text-gray-700 font-medium">
                    {answer.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-full py-6 rounded-2xl text-xl shadow-lg transition-all duration-200 ${
            canProceed
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next →
        </Button>

        {/* Helper Text */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Step {currentScreen + 1} of {quizScreens.length}
        </p>
      </div>
    </div>
  );
}