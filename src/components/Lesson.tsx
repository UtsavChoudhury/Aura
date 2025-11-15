import image_2860af584c2e69ad5f4672762edae54ae8c60dee from 'figma:asset/2860af584c2e69ad5f4672762edae54ae8c60dee.png';
import image_2860af584c2e69ad5f4672762edae54ae8c60dee from 'figma:asset/2860af584c2e69ad5f4672762edae54ae8c60dee.png';
import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Star, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Question {
  id: number;
  type: 'mcq' | 'input';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  emoji: string;
}

interface LessonData {
  id: string;
  title: string;
  emoji: string;
  money: number;
  xp: number;
  questions: Question[];
}

interface LessonProps {
  lessonData: LessonData;
  onComplete: () => void;
  onBack: () => void;
}

export function Lesson({ lessonData, onComplete, onBack }: LessonProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = lessonData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / lessonData.questions.length) * 100;

  const handleSubmit = () => {
    const correct = selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < lessonData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
      setIsCorrect(false);
    } else {
      setCompleted(true);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  if (completed) {
    const percentage = (score / lessonData.questions.length) * 100;
    const isPassed = percentage >= 70;

    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-4 border-blue-400 shadow-2xl">
          <CardContent className="pt-12 pb-12 text-center">
            {isPassed ? (
              <>
                <div className="text-8xl mb-6">🎉</div>
                <h2 className="text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  Lesson Complete!
                </h2>
                <ImageWithFallback 
                  src={image_2860af584c2e69ad5f4672762edae54ae8c60dee}
                  alt="Moominpappa celebrating"
                  className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-blue-400"
                />
                <p className="text-2xl text-gray-700 mb-6">
                  Great job! You scored {score} out of {lessonData.questions.length}!
                </p>
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-5xl mb-2">💰</div>
                      <div className="text-3xl text-green-600">+€{lessonData.money}</div>
                      <p className="text-gray-600">Money Earned</p>
                    </div>
                    <div>
                      <div className="text-5xl mb-2">⭐</div>
                      <div className="text-3xl text-blue-600">+{lessonData.xp} XP</div>
                      <p className="text-gray-600">Experience Gained</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xl px-12 py-8 rounded-2xl"
                >
                  Continue Journey! <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </>
            ) : (
              <>
                <div className="text-8xl mb-6">😅</div>
                <h2 className="text-4xl mb-4 text-gray-800">
                  Keep Practicing!
                </h2>
                <p className="text-2xl text-gray-700 mb-6">
                  You scored {score} out of {lessonData.questions.length}. You need 70% to pass.
                </p>
                <Button
                  onClick={onBack}
                  className="bg-gradient-to-r from-gray-500 to-gray-700 text-white text-xl px-12 py-8 rounded-2xl"
                >
                  Try Again Later
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <Button onClick={onBack} variant="outline" className="rounded-xl">
            ← Back
          </Button>
          <div className="text-gray-700">
            Question {currentQuestion + 1} of {lessonData.questions.length}
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <Star className="w-5 h-5" />
            <span>{score} correct</span>
          </div>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Moominpappa Helper */}
      <div className="flex items-center gap-4 mb-6 bg-white/90 rounded-2xl p-4 border-2 border-blue-200">
        <ImageWithFallback 
          src={image_2860af584c2e69ad5f4672762edae54ae8c60dee}
          alt="Moominpappa"
          className="w-20 h-20 rounded-full border-4 border-blue-400"
        />
        <div className="flex-1">
          <div className="text-blue-600 mb-1">Moominpappa says:</div>
          <p className="text-gray-700">"Take your time and think carefully! You've got this!" 🎩</p>
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-4 border-blue-400 shadow-2xl mb-6">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200">
          <CardTitle className="text-2xl">
            <span className="text-4xl mr-3">{question.emoji}</span>
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {question.type === 'mcq' ? (
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                  className={`w-full text-left p-5 rounded-xl border-4 transition-all text-lg ${
                    showResult
                      ? option === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === option
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                      : selectedAnswer === option
                      ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                      : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && option === question.correctAnswer && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                    {showResult && selectedAnswer === option && option !== question.correctAnswer && (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <Input
                type="text"
                value={selectedAnswer}
                onChange={(e) => !showResult && setSelectedAnswer(e.target.value)}
                disabled={showResult}
                placeholder="Type your answer here..."
                className={`text-xl py-6 border-4 ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-blue-300'
                }`}
              />
              {showResult && !isCorrect && (
                <p className="text-green-600 mt-3 text-lg">
                  ✓ Correct answer: <span className="font-semibold">{question.correctAnswer}</span>
                </p>
              )}
            </div>
          )}

          {showResult && (
            <div className={`mt-6 p-5 rounded-xl border-4 ${
              isCorrect ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'
            }`}>
              <div className="flex items-start gap-3">
                <div className="text-3xl">{isCorrect ? '🎉' : '💡'}</div>
                <div>
                  <div className="text-xl mb-2">
                    {isCorrect ? 'Correct!' : 'Not quite right, but that\'s okay!'}
                  </div>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-end">
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xl px-12 py-8 rounded-2xl disabled:opacity-50"
          >
            Check Answer
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white text-xl px-12 py-8 rounded-2xl"
          >
            {currentQuestion < lessonData.questions.length - 1 ? 'Next Question' : 'See Results'} 
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}