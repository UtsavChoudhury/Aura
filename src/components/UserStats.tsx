import { Trophy, Star, DollarSign } from 'lucide-react';
import { useGame } from '../App';

export function UserStats() {
  const { money, xp, level } = useGame();
  
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-end gap-4">
        {/* Money */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border-2 border-green-300 flex items-center gap-2">
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-full p-1">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Money</p>
            <div className="text-green-600">€{money}</div>
          </div>
        </div>

        {/* Level */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border-2 border-blue-300 flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-full p-1">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Level</p>
            <div className="text-blue-600">{level}</div>
          </div>
        </div>

        {/* XP Points */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border-2 border-blue-400 flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-1">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-600">XP</p>
            <div className="text-blue-600">{xp}</div>
          </div>
        </div>
      </div>
    </div>
  );
}