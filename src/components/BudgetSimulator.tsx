import image_2860af584c2e69ad5f4672762edae54ae8c60dee from 'figma:asset/2860af584c2e69ad5f4672762edae54ae8c60dee.png';
import image_2860af584c2e69ad5f4672762edae54ae8c60dee from 'figma:asset/2860af584c2e69ad5f4672762edae54ae8c60dee.png';
import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Sparkles, TrendingUp, AlertCircle, CheckCircle, PiggyBank, ShoppingCart, Landmark, Home, Zap, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BudgetCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  percentage: number;
  recommendedMin: number;
  recommendedMax: number;
}

export function BudgetSimulator() {
  const [totalAmount, setTotalAmount] = useState<string>('500');
  const [started, setStarted] = useState(false);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: 'savings',
      name: 'Savings & Emergency Fund',
      icon: PiggyBank,
      color: 'from-green-400 to-green-600',
      percentage: 20,
      recommendedMin: 20,
      recommendedMax: 30
    },
    {
      id: 'essentials',
      name: 'Essentials (Food, Bills)',
      icon: Home,
      color: 'from-blue-400 to-blue-600',
      percentage: 50,
      recommendedMin: 40,
      recommendedMax: 60
    },
    {
      id: 'leisure',
      name: 'Fun & Entertainment',
      icon: Heart,
      color: 'from-purple-400 to-purple-600',
      percentage: 15,
      recommendedMin: 10,
      recommendedMax: 20
    },
    {
      id: 'investing',
      name: 'Investing & Future',
      icon: TrendingUp,
      color: 'from-orange-400 to-orange-600',
      percentage: 10,
      recommendedMin: 5,
      recommendedMax: 15
    },
    {
      id: 'tax',
      name: 'Tax Reserve',
      icon: Landmark,
      color: 'from-red-400 to-red-600',
      percentage: 5,
      recommendedMin: 0,
      recommendedMax: 25
    }
  ]);

  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0);
  const amount = parseFloat(totalAmount) || 0;

  const updateCategory = (id: string, newPercentage: number) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, percentage: newPercentage } : cat
    ));
  };

  const getMoominpappaFeedback = () => {
    if (Math.abs(totalPercentage - 100) > 1) {
      return {
        type: 'error',
        icon: AlertCircle,
        message: `Oops! You've allocated ${totalPercentage.toFixed(1)}% of your money. We need to get to exactly 100%! Try adjusting the sliders. 🎯`,
        color: 'from-red-400 to-red-600'
      };
    }

    const savings = categories.find(c => c.id === 'savings')!;
    const essentials = categories.find(c => c.id === 'essentials')!;
    const leisure = categories.find(c => c.id === 'leisure')!;
    const investing = categories.find(c => c.id === 'investing')!;

    // Check if savings is too low
    if (savings.percentage < 15) {
      return {
        type: 'warning',
        icon: AlertCircle,
        message: `I'm a bit worried! Your savings are only ${savings.percentage}%. Try to save at least 20% for emergencies and future goals! 💰`,
        color: 'from-yellow-400 to-orange-500'
      };
    }

    // Check if leisure is too high
    if (leisure.percentage > 25) {
      return {
        type: 'warning',
        icon: AlertCircle,
        message: `${leisure.percentage}% on fun is quite a lot! Life is about balance - maybe save a bit more for your future self? 🎈`,
        color: 'from-yellow-400 to-orange-500'
      };
    }

    // Check if essentials are too low
    if (essentials.percentage < 35) {
      return {
        type: 'warning',
        icon: AlertCircle,
        message: `Only ${essentials.percentage}% for essentials might be cutting it close! Make sure you can cover rent, food, and bills comfortably! 🏠`,
        color: 'from-yellow-400 to-orange-500'
      };
    }

    // Check if investing
    if (investing.percentage >= 5) {
      return {
        type: 'excellent',
        icon: CheckCircle,
        message: `Brilliant! You're investing ${investing.percentage}% in your future! You're saving ${savings.percentage}% too. That's the spirit of a true money master! 🌟`,
        color: 'from-green-400 to-green-600'
      };
    }

    // Good overall balance
    if (savings.percentage >= 20 && essentials.percentage >= 40 && leisure.percentage <= 20) {
      return {
        type: 'great',
        icon: CheckCircle,
        message: `Excellent balance! You're saving ${savings.percentage}%, covering essentials, and having fun too! This is how smart people budget! 🎉`,
        color: 'from-blue-400 to-blue-600'
      };
    }

    return {
      type: 'good',
      icon: Sparkles,
      message: `Not bad! You're on the right track. Consider the 50/30/20 rule: 50% essentials, 30% wants, 20% savings! 💡`,
      color: 'from-blue-400 to-blue-600'
    };
  };

  const feedback = started ? getMoominpappaFeedback() : null;

  const handleStart = () => {
    if (amount > 0) {
      setStarted(true);
    }
  };

  const handleReset = () => {
    setCategories([
      {
        id: 'savings',
        name: 'Savings & Emergency Fund',
        icon: PiggyBank,
        color: 'from-green-400 to-green-600',
        percentage: 20,
        recommendedMin: 20,
        recommendedMax: 30
      },
      {
        id: 'essentials',
        name: 'Essentials (Food, Bills)',
        icon: Home,
        color: 'from-blue-400 to-blue-600',
        percentage: 50,
        recommendedMin: 40,
        recommendedMax: 60
      },
      {
        id: 'leisure',
        name: 'Fun & Entertainment',
        icon: Heart,
        color: 'from-purple-400 to-purple-600',
        percentage: 15,
        recommendedMin: 10,
        recommendedMax: 20
      },
      {
        id: 'investing',
        name: 'Investing & Future',
        icon: TrendingUp,
        color: 'from-orange-400 to-orange-600',
        percentage: 10,
        recommendedMin: 5,
        recommendedMax: 15
      },
      {
        id: 'tax',
        name: 'Tax Reserve',
        icon: Landmark,
        color: 'from-red-400 to-red-600',
        percentage: 5,
        recommendedMin: 0,
        recommendedMax: 25
      }
    ]);
  };

  const getCategoryFeedback = (category: BudgetCategory) => {
    if (category.percentage < category.recommendedMin) {
      return { text: 'Too low', color: 'text-red-600' };
    }
    if (category.percentage > category.recommendedMax) {
      return { text: 'Too high', color: 'text-orange-600' };
    }
    return { text: 'Good!', color: 'text-green-600' };
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>AI Budget Coach</span>
          </div>
          <h2 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Budget Simulator with Moominpappa! 🎯
          </h2>
          <p className="text-xl text-gray-700">
            Learn to budget like a pro with guidance from your AI money mentor!
          </p>
        </div>

        {/* Input Amount Section */}
        {!started ? (
          <Card className="bg-white border-4 border-blue-300 shadow-2xl mb-8">
            <CardContent className="pt-8">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <ImageWithFallback 
                    src={image_2860af584c2e69ad5f4672762edae54ae8c60dee}
                    alt="Moominpappa - Your budget guide"
                    className="w-32 h-32 mx-auto rounded-full border-4 border-blue-400 shadow-xl mb-4"
                  />
                  <h3 className="text-3xl mb-4 text-gray-900">
                    Welcome! Let's Budget Together!
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    I'm Moominpappa, and I'll help you learn how to budget your money wisely!
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="block text-xl text-gray-900">
                    How much money do you want to budget?
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">€</span>
                    <Input
                      type="number"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                      className="text-3xl h-16 text-center border-4 border-blue-300"
                      placeholder="500"
                      min="0"
                    />
                  </div>
                  <Button
                    onClick={handleStart}
                    disabled={!amount || amount <= 0}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-6 text-xl"
                  >
                    Start Budgeting! 🚀
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Moominpappa Feedback */}
            {feedback && (
              <Card className={`bg-gradient-to-r ${feedback.color} text-white border-4 border-white shadow-2xl mb-8 transform hover:scale-105 transition-transform`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <ImageWithFallback 
                      src={image_2860af584c2e69ad5f4672762edae54ae8c60dee}
                      alt="Moominpappa"
                      className="w-20 h-20 rounded-full border-4 border-white flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <feedback.icon className="w-6 h-6" />
                        <h3 className="text-2xl">Moominpappa says:</h3>
                      </div>
                      <p className="text-xl leading-relaxed">{feedback.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Budget Summary */}
            <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white border-4 border-blue-300 shadow-2xl mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-5xl mb-2">💰</div>
                    <div className="text-4xl mb-1">€{amount.toFixed(2)}</div>
                    <p className="text-blue-100">Total Budget</p>
                  </div>
                  <div>
                    <div className="text-5xl mb-2">📊</div>
                    <div className={`text-4xl mb-1 ${Math.abs(totalPercentage - 100) < 1 ? 'text-green-200' : 'text-red-200'}`}>
                      {totalPercentage.toFixed(1)}%
                    </div>
                    <p className="text-blue-100">Allocated</p>
                  </div>
                  <div>
                    <div className="text-5xl mb-2">
                      {Math.abs(totalPercentage - 100) < 1 ? '✅' : '⏳'}
                    </div>
                    <div className="text-4xl mb-1">
                      €{((100 - totalPercentage) * amount / 100).toFixed(2)}
                    </div>
                    <p className="text-blue-100">Remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget Categories */}
            <div className="space-y-6 mb-8">
              {categories.map(category => {
                const Icon = category.icon;
                const categoryAmount = (category.percentage * amount / 100);
                const categoryFeedback = getCategoryFeedback(category);

                return (
                  <Card key={category.id} className="bg-white border-4 border-blue-200 shadow-xl">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xl text-gray-900">{category.name}</h4>
                              <p className="text-sm text-gray-500">
                                Recommended: {category.recommendedMin}% - {category.recommendedMax}%
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl text-gray-900">{category.percentage}%</div>
                            <div className="text-xl text-gray-700">€{categoryAmount.toFixed(2)}</div>
                            <div className={`text-sm font-semibold ${categoryFeedback.color}`}>
                              {categoryFeedback.text}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Slider
                            value={[category.percentage]}
                            onValueChange={(value) => updateCategory(category.id, value[0])}
                            max={100}
                            step={1}
                            className="cursor-pointer"
                          />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleReset}
                className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-8 py-6 text-xl"
              >
                Reset Budget
              </Button>
              <Button
                onClick={() => setStarted(false)}
                variant="outline"
                className="border-4 border-blue-400 text-blue-700 px-8 py-6 text-xl"
              >
                Change Amount
              </Button>
            </div>

            {/* Achievement Section */}
            {Math.abs(totalPercentage - 100) < 1 && feedback?.type === 'excellent' && (
              <Card className="bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-yellow-300 shadow-2xl mt-8">
                <CardContent className="pt-6 text-center">
                  <div className="text-7xl mb-4">🏆</div>
                  <h3 className="text-3xl text-white mb-2">Budget Master!</h3>
                  <p className="text-xl text-white">
                    Wow! You've created an excellent budget! Moominpappa is proud of you! 🎉
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </section>
  );
}