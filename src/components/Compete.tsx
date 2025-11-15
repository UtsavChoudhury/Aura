import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Trophy, TrendingUp, Medal, Users, Target, Flame, Crown, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { useGame } from '../App';
import { motion } from 'motion/react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  portfolioValue: number;
  returns: number;
  returnsPercent: number;
  streak: number;
  level: number;
}

export function Compete() {
  const { level, portfolioValue, portfolioReturns, portfolioReturnsPercent } = useGame();
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends' | 'challenges'>('leaderboard');

  // Mock friends data - in a real app, this would come from a backend
  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Emma Chen',
      avatar: '👩',
      portfolioValue: 2847,
      returns: 347,
      returnsPercent: 13.9,
      streak: 12,
      level: 6
    },
    {
      id: '2',
      name: 'Marcus Silva',
      avatar: '👨',
      portfolioValue: 3521,
      returns: 521,
      returnsPercent: 17.4,
      streak: 8,
      level: 7
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      avatar: '👧',
      portfolioValue: 1982,
      returns: 182,
      returnsPercent: 10.1,
      streak: 5,
      level: 5
    },
    {
      id: '4',
      name: 'Alex Kumar',
      avatar: '🧑',
      portfolioValue: 4105,
      returns: 805,
      returnsPercent: 24.4,
      streak: 15,
      level: 8
    },
    {
      id: '5',
      name: 'Lily Zhang',
      avatar: '👩',
      portfolioValue: 2234,
      returns: 234,
      returnsPercent: 11.7,
      streak: 7,
      level: 6
    },
    {
      id: '6',
      name: 'Jordan Taylor',
      avatar: '🧒',
      portfolioValue: 1654,
      returns: 154,
      returnsPercent: 10.3,
      streak: 3,
      level: 4
    }
  ]);

  // Add current user to the mix
  const currentUser: Friend = {
    id: 'user',
    name: 'You',
    avatar: '😊',
    portfolioValue: portfolioValue,
    returns: portfolioReturns,
    returnsPercent: portfolioReturnsPercent,
    streak: 4,
    level: level
  };

  // Create full leaderboard
  const allParticipants = [...friends, currentUser].sort((a, b) => b.returnsPercent - a.returnsPercent);
  
  // Get user rank
  const userRank = allParticipants.findIndex(p => p.id === 'user') + 1;

  // Get top 3 for podium
  const topThree = allParticipants.slice(0, 3);

  // Active challenges
  const challenges = [
    {
      id: '1',
      title: 'Weekly Winner',
      description: 'Highest returns this week',
      prize: '€50 bonus',
      endsIn: '3 days',
      participants: 24,
      icon: '🏆',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: '2',
      title: 'Diversification Master',
      description: 'Most balanced portfolio',
      prize: '100 XP',
      endsIn: '5 days',
      participants: 18,
      icon: '🎯',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: '3',
      title: 'Comeback King',
      description: 'Best recovery from losses',
      prize: '€25 bonus',
      endsIn: '1 day',
      participants: 31,
      icon: '📈',
      color: 'from-green-400 to-green-600'
    }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return <span className="text-gray-500">#{rank}</span>;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            <Trophy className="w-5 h-5" />
            <span>Compete & Win!</span>
          </div>
          <h2 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            🏆 Investment Competition
          </h2>
          <p className="text-xl text-gray-700">
            Challenge friends and climb the leaderboard!
          </p>
        </div>

        {/* User Stats Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-4 border-purple-300 shadow-2xl mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-6xl mb-2">🏅</div>
                <div className="text-4xl mb-1">#{userRank}</div>
                <p className="text-white/90">Your Rank</p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-2">💰</div>
                <div className="text-4xl mb-1">€{portfolioValue.toFixed(0)}</div>
                <p className="text-white/90">Portfolio</p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-2">
                  {portfolioReturns >= 0 ? '📈' : '📉'}
                </div>
                <div className={`text-4xl mb-1 ${portfolioReturns >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                  {portfolioReturns >= 0 ? '+' : ''}€{portfolioReturns.toFixed(2)}
                </div>
                <p className="text-white/90">Returns</p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-2">🔥</div>
                <div className="text-4xl mb-1">4 🔥</div>
                <p className="text-white/90">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-2 shadow-lg">
          <Button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-6 rounded-xl text-lg transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Trophy className="w-5 h-5 mr-2" />
            Leaderboard
          </Button>
          <Button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-6 rounded-xl text-lg transition-all ${
              activeTab === 'friends'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Friends
          </Button>
          <Button
            onClick={() => setActiveTab('challenges')}
            className={`flex-1 py-6 rounded-xl text-lg transition-all ${
              activeTab === 'challenges'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Target className="w-5 h-5 mr-2" />
            Challenges
          </Button>
        </div>

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            {/* Podium */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl text-center mb-6 text-gray-800">
                🏆 Top Performers
              </h3>
              <div className="flex items-end justify-center gap-4 mb-8">
                {/* 2nd Place */}
                {topThree[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 max-w-[200px]"
                  >
                    <Card className="bg-gradient-to-br from-gray-200 to-gray-400 border-4 border-gray-300 shadow-lg">
                      <CardContent className="pt-6 text-center">
                        <div className="text-6xl mb-2">{topThree[1].avatar}</div>
                        <div className="text-xl mb-1">{topThree[1].name}</div>
                        <div className="text-3xl mb-1 text-gray-800">
                          {topThree[1].returnsPercent >= 0 ? '+' : ''}{topThree[1].returnsPercent.toFixed(1)}%
                        </div>
                        <Medal className="w-8 h-8 text-gray-600 mx-auto mt-2" />
                        <div className="text-sm text-gray-700 mt-2">2nd Place</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 max-w-[220px] -mt-8"
                  >
                    <Card className="bg-gradient-to-br from-yellow-300 to-yellow-600 border-4 border-yellow-400 shadow-2xl">
                      <CardContent className="pt-6 text-center">
                        <Crown className="w-10 h-10 text-yellow-900 mx-auto mb-2" />
                        <div className="text-7xl mb-2">{topThree[0].avatar}</div>
                        <div className="text-2xl mb-1 text-yellow-900">{topThree[0].name}</div>
                        <div className="text-4xl mb-1 text-yellow-900">
                          {topThree[0].returnsPercent >= 0 ? '+' : ''}{topThree[0].returnsPercent.toFixed(1)}%
                        </div>
                        <div className="text-lg text-yellow-900 mt-2">👑 Champion</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 max-w-[200px]"
                  >
                    <Card className="bg-gradient-to-br from-orange-300 to-orange-500 border-4 border-orange-400 shadow-lg">
                      <CardContent className="pt-6 text-center">
                        <div className="text-6xl mb-2">{topThree[2].avatar}</div>
                        <div className="text-xl mb-1 text-orange-900">{topThree[2].name}</div>
                        <div className="text-3xl mb-1 text-orange-900">
                          {topThree[2].returnsPercent >= 0 ? '+' : ''}{topThree[2].returnsPercent.toFixed(1)}%
                        </div>
                        <Medal className="w-8 h-8 text-orange-700 mx-auto mt-2" />
                        <div className="text-sm text-orange-900 mt-2">3rd Place</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Full Leaderboard */}
            <Card className="shadow-xl">
              <CardContent className="pt-6">
                <h3 className="text-2xl mb-4 text-gray-800">📊 Full Rankings</h3>
                <div className="space-y-3">
                  {allParticipants.map((participant, index) => {
                    const rank = index + 1;
                    const isUser = participant.id === 'user';
                    
                    return (
                      <motion.div
                        key={participant.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-4 p-4 rounded-xl ${
                          isUser
                            ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-blue-400'
                            : 'bg-gray-50 hover:bg-gray-100'
                        } transition-all`}
                      >
                        {/* Rank */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}>
                          {getRankIcon(rank)}
                        </div>

                        {/* Avatar & Name */}
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-4xl">{participant.avatar}</div>
                          <div>
                            <div className={`text-lg ${isUser ? 'font-bold' : ''}`}>
                              {participant.name}
                              {isUser && <span className="ml-2 text-blue-600">⭐</span>}
                            </div>
                            <div className="text-sm text-gray-600">Level {participant.level}</div>
                          </div>
                        </div>

                        {/* Portfolio Value */}
                        <div className="text-right">
                          <div className="text-lg">€{participant.portfolioValue.toFixed(0)}</div>
                          <div className="text-sm text-gray-600">Portfolio</div>
                        </div>

                        {/* Returns */}
                        <div className="text-right">
                          <div className={`text-lg flex items-center gap-1 ${
                            participant.returnsPercent >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {participant.returnsPercent >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                            {participant.returnsPercent >= 0 ? '+' : ''}{participant.returnsPercent.toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">Returns</div>
                        </div>

                        {/* Streak */}
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-orange-600">
                            <Flame className="w-5 h-5" />
                            <span className="text-lg">{participant.streak}</span>
                          </div>
                          <div className="text-sm text-gray-600">Streak</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="space-y-6">
            <Card className="shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl text-gray-800">👥 Your Friends</h3>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    + Invite Friends
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {friends.map((friend) => {
                    const friendRank = allParticipants.findIndex(p => p.id === friend.id) + 1;
                    const comparison = portfolioReturnsPercent - friend.returnsPercent;
                    
                    return (
                      <Card key={friend.id} className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-blue-400 transition-all">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="text-5xl">{friend.avatar}</div>
                            <div className="flex-1">
                              <div className="text-xl mb-1">{friend.name}</div>
                              <div className="text-sm text-gray-600">Rank #{friendRank} • Level {friend.level}</div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm ${getRankBadge(friendRank)}`}>
                              #{friendRank}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-gray-600">Portfolio</div>
                              <div className="text-xl">€{friend.portfolioValue.toFixed(0)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Returns</div>
                              <div className={`text-xl ${friend.returnsPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {friend.returnsPercent >= 0 ? '+' : ''}{friend.returnsPercent.toFixed(1)}%
                              </div>
                            </div>
                          </div>

                          {/* Comparison */}
                          <div className={`p-3 rounded-xl text-center ${
                            comparison > 0 
                              ? 'bg-green-100 text-green-800' 
                              : comparison < 0 
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {comparison > 0 && (
                              <span>🎉 You're ahead by {Math.abs(comparison).toFixed(1)}%!</span>
                            )}
                            {comparison < 0 && (
                              <span>📈 They're ahead by {Math.abs(comparison).toFixed(1)}%</span>
                            )}
                            {comparison === 0 && (
                              <span>🤝 You're tied!</span>
                            )}
                          </div>

                          <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                            Challenge {friend.name.split(' ')[0]}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <Card className="shadow-xl">
              <CardContent className="pt-6">
                <h3 className="text-2xl mb-6 text-gray-800">🎯 Active Challenges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`bg-gradient-to-br ${challenge.color} text-white border-4 border-white shadow-xl hover:scale-105 transition-transform`}>
                        <CardContent className="pt-6 text-center">
                          <div className="text-6xl mb-3">{challenge.icon}</div>
                          <h4 className="text-2xl mb-2">{challenge.title}</h4>
                          <p className="text-white/90 mb-4">{challenge.description}</p>
                          
                          <div className="bg-white/20 backdrop-blur rounded-xl p-3 mb-4">
                            <div className="text-sm text-white/80 mb-1">Prize</div>
                            <div className="text-xl">{challenge.prize}</div>
                          </div>

                          <div className="flex justify-between text-sm mb-4">
                            <div>
                              <div className="text-white/80">Participants</div>
                              <div className="text-lg">{challenge.participants}</div>
                            </div>
                            <div>
                              <div className="text-white/80">Ends In</div>
                              <div className="text-lg">{challenge.endsIn}</div>
                            </div>
                          </div>

                          <Button className="w-full bg-white text-gray-800 hover:bg-gray-100">
                            Join Challenge
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create Custom Challenge */}
            <Card className="shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="pt-6 text-center">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl mb-2 text-gray-800">Create Your Own Challenge</h3>
                <p className="text-gray-600 mb-6">
                  Challenge specific friends to a custom investing competition!
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-6 text-lg">
                  <Award className="w-5 h-5 mr-2" />
                  Create Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}