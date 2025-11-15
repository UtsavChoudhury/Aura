import { useState } from 'react';
import { TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';

interface Item {
  id: string;
  name: string;
  emoji: string;
  price: number;
  description: string;
  color: string;
}

interface Investment {
  years: number;
  conservative: number;
  moderate: number;
  aggressive: number;
}

const items: Item[] = [
  {
    id: 'phone',
    name: 'New iPhone',
    emoji: '📱',
    price: 1000,
    description: 'Latest smartphone',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'makeup',
    name: 'Makeup Set',
    emoji: '💄',
    price: 250,
    description: 'Full makeup collection',
    color: 'from-pink-400 to-rose-600'
  },
  {
    id: 'clothes',
    name: 'Shopping Spree',
    emoji: '👗',
    price: 300,
    description: 'New wardrobe',
    color: 'from-pink-400 to-purple-600'
  },
  {
    id: 'console',
    name: 'Gaming Console',
    emoji: '🎮',
    price: 500,
    description: 'Xbox or PlayStation',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'sneakers',
    name: 'Designer Sneakers',
    emoji: '👟',
    price: 200,
    description: 'Nike or Jordans',
    color: 'from-orange-400 to-red-600'
  },
  {
    id: 'airpods',
    name: 'AirPods Pro',
    emoji: '🎧',
    price: 250,
    description: 'Wireless earbuds',
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'laptop',
    name: 'Laptop',
    emoji: '💻',
    price: 1500,
    description: 'MacBook or gaming',
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 'watch',
    name: 'Smart Watch',
    emoji: '⌚',
    price: 400,
    description: 'Apple Watch',
    color: 'from-slate-400 to-blue-600'
  },
];

const calculateInvestment = (price: number, years: number, returnRate: number): number => {
  return price * Math.pow(1 + returnRate, years);
};

const getWhatYouCouldBuy = (amount: number): string[] => {
  if (amount < 200) return ['🍕 Pizza party!'];
  if (amount < 500) return ['🍕 Pizza party!', '🎬 Movie tickets', '👟 New shoes'];
  if (amount < 1000) return ['🍕 Pizza party!', '🎬 Movie tickets', '👟 New shoes', '🎮 Gaming console'];
  if (amount < 2000) return ['🍕 Pizza party!', '🎬 Movie tickets', '👟 New shoes', '🎮 Gaming console', '📱 New phone'];
  if (amount < 5000) return ['🍕 Pizza party!', '🎬 Movie tickets', '👟 New shoes', '🎮 Gaming console', '📱 New phone', '🚴 Mountain bike', '💻 Laptop'];
  if (amount < 10000) return ['🍕 Pizza party!', '📱 New phone', '🚴 Mountain bike', '💻 Gaming laptop', '🏍️ Motorcycle', '✈️ Dream vacation'];
  if (amount < 20000) return ['🚗 Used car', '🏍️ Motorcycle', '💻 Gaming setup', '✈️ Europe trip', '📚 College semester abroad', '💍 Nice jewelry'];
  if (amount < 50000) return ['🚗 New car', '🏠 House down payment', '💍 Engagement ring', '🎓 Year of college', '✈️ World tour', '🚤 Boat'];
  if (amount < 100000) return ['🏠 House down payment', '🎓 Full college tuition abroad', '🚗 Luxury car', '💼 Start a business', '🌴 Beach house down payment', '🚁 Private pilot license'];
  return ['🏠 Full house payment', '🏢 Investment property', '🎓 Graduate school abroad fully paid', '💼 Start multiple businesses', '🌍 Retire early fund', '🚀 Generational wealth'];
};

const getTransformationStage = (years: number): { emoji: string; message: string } => {
  if (years <= 1) return { emoji: '🌱', message: 'Just planted the seed!' };
  if (years <= 3) return { emoji: '🌿', message: 'Growing nicely!' };
  if (years <= 5) return { emoji: '🌳', message: 'Getting bigger!' };
  if (years <= 10) return { emoji: '🎄', message: 'Looking great!' };
  if (years <= 20) return { emoji: '🌲', message: 'Wow, so tall!' };
  if (years <= 30) return { emoji: '🏔️', message: 'Mountain of money!' };
  return { emoji: '🚀', message: 'To the moon!' };
};

export function FutureMe() {
  const [selectedItem, setSelectedItem] = useState<Item>(items[0]);
  const [years, setYears] = useState<number>(10);

  const conservative = calculateInvestment(selectedItem.price, years, 0.05); // 5% return
  const moderate = calculateInvestment(selectedItem.price, years, 0.08); // 8% return
  const aggressive = calculateInvestment(selectedItem.price, years, 0.12); // 12% return

  const transformation = getTransformationStage(years);
  const couldBuy = getWhatYouCouldBuy(moderate);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>Time Travel to Your Future!</span>
          </div>
          <h2 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Future Me Simulator! ⏰✨
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            See what your money could become if you invest instead of spend! Choose an item and watch your future grow! 🚀
          </p>
        </div>

        {/* Grid Item Selector with Radio Buttons */}
        <div className="mb-12">
          <h3 className="text-3xl text-center text-gray-800 mb-6">What are you thinking of buying? 🤔</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {items.map((item) => (
              <label
                key={item.id}
                className={`cursor-pointer transform hover:scale-105 transition-all border-4 rounded-3xl p-6 text-center shadow-lg block ${
                  selectedItem.id === item.id
                    ? 'border-blue-500 shadow-2xl ring-4 ring-blue-300 bg-gradient-to-br from-blue-50 to-purple-50'
                    : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-blue-50'
                }`}
              >
                <input
                  type="radio"
                  name="item-selector"
                  value={item.id}
                  checked={selectedItem.id === item.id}
                  onChange={() => setSelectedItem(item)}
                  className="sr-only"
                />
                <div className="text-6xl mb-3">{item.emoji}</div>
                <div className="text-xl text-gray-900 mb-2">{item.name}</div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="text-2xl text-blue-600 mb-2">${item.price}</div>
                {selectedItem.id === item.id && (
                  <div className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                    ✓ Selected
                  </div>
                )}
              </label>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6">Click any item to see how much it could grow if you invested instead! 💰</p>
        </div>

        {/* Time Slider */}
        <Card className="mb-8 border-4 border-blue-400 shadow-2xl bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-3xl text-gray-900 mb-2">⏰ Fast Forward Time!</div>
              <p className="text-lg text-gray-600">Slide to see your future wealth!</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-2">{transformation.emoji}</div>
                  <div className="text-2xl text-blue-600">{years} Years</div>
                  <p className="text-gray-600">{transformation.message}</p>
                </div>
                <div className="flex-1 mx-8">
                  <Slider
                    value={[years]}
                    onValueChange={(value) => setYears(value[0])}
                    min={1}
                    max={40}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-2">🎯</div>
                  <div className="text-2xl text-blue-600">Year {years}</div>
                  <p className="text-gray-600">Your target!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-4 border-blue-300 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="text-center">
              <div className="text-5xl mb-3">🐢</div>
              <CardTitle className="text-2xl text-blue-700">Safe & Steady</CardTitle>
              <p className="text-blue-600">5% per year</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl text-blue-700 mb-2">${conservative.toFixed(0)}</div>
              <div className="text-xl text-blue-600 mb-4">
                +${(conservative - selectedItem.price).toFixed(0)} profit! 🎉
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-gray-700 mb-2">Your ${selectedItem.price} grew to:</p>
                <div className="text-2xl text-blue-700">{(conservative / selectedItem.price).toFixed(1)}x</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-purple-400 shadow-2xl bg-gradient-to-br from-purple-50 to-purple-100 transform scale-105">
            <CardHeader className="text-center">
              <div className="text-5xl mb-3">🚀</div>
              <CardTitle className="text-2xl text-purple-700">Balanced Growth</CardTitle>
              <p className="text-purple-600">8% per year</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-5xl text-purple-700 mb-2">${moderate.toFixed(0)}</div>
              <div className="text-xl text-purple-600 mb-4">
                +${(moderate - selectedItem.price).toFixed(0)} profit! 🎊
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-gray-700 mb-2">Your ${selectedItem.price} grew to:</p>
                <div className="text-3xl text-purple-700">{(moderate / selectedItem.price).toFixed(1)}x</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-green-300 shadow-xl bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="text-center">
              <div className="text-5xl mb-3">⚡</div>
              <CardTitle className="text-2xl text-green-700">Super Growth</CardTitle>
              <p className="text-green-600">12% per year</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl text-green-700 mb-2">${aggressive.toFixed(0)}</div>
              <div className="text-xl text-green-600 mb-4">
                +${(aggressive - selectedItem.price).toFixed(0)} profit! 🚀
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-gray-700 mb-2">Your ${selectedItem.price} grew to:</p>
                <div className="text-2xl text-green-700">{(aggressive / selectedItem.price).toFixed(1)}x</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What You Could Buy */}
        <Card className="border-4 border-blue-400 shadow-2xl bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
                💰 What Could You Buy With ${moderate.toFixed(0)}? 💰
              </div>
              <p className="text-lg text-gray-600">If you invested instead of buying {selectedItem.name}...</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {couldBuy.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center border-4 border-blue-200 transform hover:scale-105 transition-all"
                >
                  <div className="text-5xl mb-2">{item.split(' ')[0]}</div>
                  <p className="text-gray-700">{item.substring(item.indexOf(' ') + 1)}</p>
                </div>
              ))}
            </div>

            {moderate > 10000 && (
              <div className="mt-8 text-center p-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl">
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-3xl text-white mb-2">WOW! You could buy ALL of these!</div>
                <p className="text-white text-xl">That's the power of investing! 💪✨</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Educational Message */}
        <Card className="mt-8 border-4 border-blue-400 bg-gradient-to-r from-blue-100 to-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="text-6xl">💡</div>
              <div>
                <div className="text-2xl text-gray-900 mb-3">The Big Lesson! 📚</div>
                <p className="text-lg text-gray-700 mb-3">
                  Every time you spend ${selectedItem.price} on {selectedItem.name.toLowerCase()}, you're choosing NOT to have ${moderate.toFixed(0)} in {years} years! That's called <span className="text-blue-600">opportunity cost</span>! 🤔
                </p>
                <p className="text-lg text-gray-700 mb-3">
                  This doesn't mean you should never buy fun things! 🎮 But it helps you make smart choices about what REALLY matters to you! ✨
                </p>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                  <p className="text-gray-800">
                    <span className="text-blue-600">Pro Tip:</span> Start investing early, even small amounts, and watch your future self say "Thank you!" 🙏💰
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}