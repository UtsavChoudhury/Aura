import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Heart, Target, Award } from 'lucide-react';

interface Story {
  id: string;
  name: string;
  age: number;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  challenge: string;
  solution: string;
  outcome: string;
  saved: number;
  months: number;
  quote: string;
}

const allStories: Story[] = [
  // Female stories
  {
    id: 'f1',
    name: 'Emma',
    age: 16,
    avatar: '👧',
    gender: 'female',
    challenge: 'I was spending all my babysitting money on clothes and makeup. Every time I saw a sale, I couldn\'t resist!',
    solution: 'Created a "fun budget" using Aura\'s budgeting tools. I set aside 30% for shopping and saved the rest.',
    outcome: 'Now I still enjoy shopping guilt-free, but I\'ve saved €850 for a laptop I really need!',
    saved: 850,
    months: 6,
    quote: 'I learned that saying no to one thing means saying yes to something better later!'
  },
  {
    id: 'f2',
    name: 'Sofia',
    age: 17,
    avatar: '👩',
    gender: 'female',
    challenge: 'Shopping with friends was my weakness. I felt pressure to buy things I didn\'t even want just to fit in.',
    solution: 'Started using the "24-hour rule" - waiting a day before any purchase. Also found friends who supported my savings goals!',
    outcome: 'Saved €1,200 in 8 months and actually feel more confident about my choices now.',
    saved: 1200,
    months: 8,
    quote: 'Real friends support your dreams, not your impulse buys! 💕'
  },
  {
    id: 'f3',
    name: 'Lily',
    age: 15,
    avatar: '👧',
    gender: 'female',
    challenge: 'Online shopping was too easy. One-click purchases were destroying my savings goals.',
    solution: 'Removed saved payment info from all apps and set up a "wish list" system instead.',
    outcome: 'Went from spending €200/month on random stuff to saving €600 in 4 months!',
    saved: 600,
    months: 4,
    quote: 'Delete those payment methods! Future you will thank you 🎯'
  },
  {
    id: 'f4',
    name: 'Zara',
    age: 16,
    avatar: '👩',
    gender: 'female',
    challenge: 'I loved treating my friends to coffee and snacks, but it was draining my wallet.',
    solution: 'Set a monthly "social spending" budget and suggested free hangout alternatives like parks and movie nights at home.',
    outcome: 'Still have amazing friendships but saved €450 while doing it!',
    saved: 450,
    months: 3,
    quote: 'Being generous doesn\'t mean going broke! There\'s a balance 💚'
  },

  // Male stories
  {
    id: 'm1',
    name: 'Alex',
    age: 17,
    avatar: '👦',
    gender: 'male',
    challenge: 'Gaming purchases were killing my budget. New skins, battle passes, and loot boxes added up fast!',
    solution: 'Set a strict €30/month gaming budget and started earning free rewards through gameplay.',
    outcome: 'Cut gaming expenses by 70% and saved €940 for a new gaming PC!',
    saved: 940,
    months: 7,
    quote: 'Now I game smarter, not broker! 🎮'
  },
  {
    id: 'm2',
    name: 'Marcus',
    age: 16,
    avatar: '👨',
    gender: 'male',
    challenge: 'Constantly upgrading my phone and tech gadgets. Always wanted the latest model!',
    solution: 'Learned about depreciation and started buying one-year-old flagship phones instead.',
    outcome: 'Saved €800 in one purchase and put it toward investing in stocks!',
    saved: 800,
    months: 1,
    quote: 'Last year\'s tech is still amazing tech! 📱'
  },
  {
    id: 'm3',
    name: 'Jordan',
    age: 17,
    avatar: '👦',
    gender: 'male',
    challenge: 'Eating out with friends every day after school. Fast food seemed cheap but added up.',
    solution: 'Started meal prepping on Sundays and only eating out on Fridays as a treat.',
    outcome: 'Saved €520 in 4 months and actually feel healthier too!',
    saved: 520,
    months: 4,
    quote: 'Meal prep Sundays = Money saved Mondays! 🥗'
  },
  {
    id: 'm4',
    name: 'Ryan',
    age: 16,
    avatar: '👨',
    gender: 'male',
    challenge: 'Car modifications were my obsession. Every paycheck went to making my car look cooler.',
    solution: 'Created a priority list and delayed gratification. Focused on one upgrade per quarter.',
    outcome: 'Still have a cool car but also saved €1,500 for college!',
    saved: 1500,
    months: 10,
    quote: 'My future is cooler than my car! 🚗'
  },
  {
    id: 'm5',
    name: 'Jake',
    age: 15,
    avatar: '👦',
    gender: 'male',
    challenge: 'Sneaker collecting got out of control. Had 30 pairs but was broke!',
    solution: 'Set a rule: sell one pair before buying a new one. Started a sneaker resale side hustle.',
    outcome: 'Now profit from my hobby! Made €650 in 3 months.',
    saved: 650,
    months: 3,
    quote: 'Turn your hobby into a hustle! 👟'
  },

  // Gender-neutral stories
  {
    id: 'n1',
    name: 'Sam',
    age: 16,
    avatar: '🧑',
    gender: 'other',
    challenge: 'Subscription services were bleeding me dry. Music, streaming, apps - I had 12 subscriptions!',
    solution: 'Did a subscription audit and kept only 3 essentials. Shared family plans with siblings.',
    outcome: 'Freed up €85/month which turned into €850 savings in 10 months!',
    saved: 850,
    months: 10,
    quote: 'Cancel what you don\'t use. It\'s that simple! 🎵'
  },
  {
    id: 'n2',
    name: 'Taylor',
    age: 17,
    avatar: '🧑',
    gender: 'other',
    challenge: 'Concert and event tickets were my weakness. FOMO had me spending hundreds per month.',
    solution: 'Limited myself to 2 events per month and volunteered at venues for free entry.',
    outcome: 'Still see amazing shows but saved €1,100 in 6 months!',
    saved: 1100,
    months: 6,
    quote: 'Experience smart, not expensive! 🎤'
  },
  {
    id: 'n3',
    name: 'Casey',
    age: 16,
    avatar: '🧒',
    gender: 'other',
    challenge: 'Art supplies and craft materials were expensive but necessary for my passion.',
    solution: 'Started buying in bulk, using coupons, and selling finished artwork online.',
    outcome: 'Hobby became profitable! Made €920 while still creating.',
    saved: 920,
    months: 5,
    quote: 'Invest in your passion, but make it pay back! 🎨'
  }
];

interface SuccessStoriesProps {
  userGender?: string;
}

export function SuccessStories({ userGender = 'prefer-not-to-say' }: SuccessStoriesProps) {
  // Filter and sort stories based on user gender
  const getFilteredStories = () => {
    if (userGender === 'prefer-not-to-say' || userGender === 'other') {
      // Show all stories in balanced way
      return allStories;
    }

    if (userGender === 'female') {
      // Mostly female stories, few male stories
      const femaleStories = allStories.filter(s => s.gender === 'female');
      const maleStories = allStories.filter(s => s.gender === 'male').slice(0, 2);
      const neutralStories = allStories.filter(s => s.gender === 'other').slice(0, 1);
      return [...femaleStories, ...maleStories, ...neutralStories];
    }

    if (userGender === 'male') {
      // Mostly male stories, few female stories
      const maleStories = allStories.filter(s => s.gender === 'male');
      const femaleStories = allStories.filter(s => s.gender === 'female').slice(0, 2);
      const neutralStories = allStories.filter(s => s.gender === 'other').slice(0, 1);
      return [...maleStories, ...femaleStories, ...neutralStories];
    }

    return allStories;
  };

  const stories = getFilteredStories();

  const getGenderMessage = () => {
    if (userGender === 'female') {
      return 'Stories from young women like you who mastered their money! 💪';
    }
    if (userGender === 'male') {
      return 'Stories from young men like you who conquered their finances! 💪';
    }
    return 'Inspiring stories from young people just like you! 💪';
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            <Award className="w-5 h-5" />
            <span>Real Success Stories</span>
          </div>
          <h2 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
            🌟 You Can Do This Too!
          </h2>
          <p className="text-xl text-gray-700">
            {getGenderMessage()}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-400 to-green-600 border-4 border-green-300 shadow-xl">
            <CardContent className="pt-6 text-center text-white">
              <div className="text-6xl mb-2">💰</div>
              <div className="text-4xl mb-1">
                €{stories.reduce((sum, s) => sum + s.saved, 0).toLocaleString()}
              </div>
              <p className="text-green-100">Total Saved</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-blue-300 shadow-xl">
            <CardContent className="pt-6 text-center text-white">
              <div className="text-6xl mb-2">👥</div>
              <div className="text-4xl mb-1">{stories.length}</div>
              <p className="text-blue-100">Success Stories</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-400 to-purple-600 border-4 border-purple-300 shadow-xl">
            <CardContent className="pt-6 text-center text-white">
              <div className="text-6xl mb-2">⭐</div>
              <div className="text-4xl mb-1">
                {Math.round(stories.reduce((sum, s) => sum + s.saved, 0) / stories.length)}
              </div>
              <p className="text-purple-100">Avg. Savings (€)</p>
            </CardContent>
          </Card>
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border-4 border-gray-200 shadow-xl hover:shadow-2xl transition-shadow h-full">
                <CardContent className="pt-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-6xl">{story.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl text-gray-900">{story.name}</h3>
                        <span className="text-gray-600">({story.age})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>Saved €{story.saved}</span>
                        </div>
                        <div className="text-gray-600">in {story.months} months</div>
                      </div>
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm">
                        😰 The Challenge
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{story.challenge}"</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        The Solution
                      </div>
                    </div>
                    <p className="text-gray-700">{story.solution}</p>
                  </div>

                  {/* Outcome */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        The Result
                      </div>
                    </div>
                    <p className="text-gray-700">{story.outcome}</p>
                  </div>

                  {/* Quote */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-800 italic">{story.quote}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-blue-400 shadow-2xl">
            <CardContent className="pt-8 pb-8">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-3xl text-white mb-4">Your Story Could Be Next!</h3>
              <p className="text-xl text-white/90 mb-6">
                These are real strategies from real teens. Start your own success story today!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <div className="bg-white text-blue-600 px-6 py-3 rounded-xl">
                  <div className="text-2xl mb-1">Start Learning</div>
                  <div className="text-sm text-gray-600">Complete lessons to earn money</div>
                </div>
                <div className="bg-white text-blue-600 px-6 py-3 rounded-xl">
                  <div className="text-2xl mb-1">Set Your Budget</div>
                  <div className="text-sm text-gray-600">Create your spending plan</div>
                </div>
                <div className="bg-white text-blue-600 px-6 py-3 rounded-xl">
                  <div className="text-2xl mb-1">Watch It Grow</div>
                  <div className="text-sm text-gray-600">Track your savings progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
