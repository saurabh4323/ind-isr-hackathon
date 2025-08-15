'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Gamepad2, 
  Target, 
  Brain, 
  Zap, 
  Activity, 
  Star,
  Play,
  Clock,
  TrendingUp
} from 'lucide-react';

export default function Games() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Games', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'hand', name: 'Hand & Arm', icon: <Activity className="w-5 h-5" /> },
    { id: 'leg', name: 'Leg & Balance', icon: <Target className="w-5 h-5" /> },
    { id: 'cognitive', name: 'Cognitive', icon: <Brain className="w-5 h-5" /> },
    { id: 'reaction', name: 'Reaction', icon: <Zap className="w-5 h-5" /> }
  ];

  const games = [
    {
      id: 'hand-coordination',
      name: 'Hand Coordination',
      category: 'hand',
      description: 'Improve fine motor skills and hand-eye coordination through precise movements',
      difficulty: 'Easy',
      duration: '5-10 min',
      rating: 4.8,
      players: 1250,
      image: '/api/placeholder/300/200',
      features: ['Precision Training', 'Real-time Feedback', 'Progress Tracking']
    },
    {
      id: 'balance-training',
      name: 'Balance Training',
      category: 'leg',
      description: 'Enhance stability and balance through controlled movements and exercises',
      difficulty: 'Medium',
      duration: '8-15 min',
      rating: 4.6,
      players: 980,
      image: '/api/placeholder/300/200',
      features: ['Stability Focus', 'Adaptive Difficulty', 'Performance Metrics']
    },
    {
      id: 'memory-challenge',
      name: 'Memory Challenge',
      category: 'cognitive',
      description: 'Boost cognitive function and memory through engaging pattern recognition',
      difficulty: 'Medium',
      duration: '6-12 min',
      rating: 4.7,
      players: 1100,
      image: '/api/placeholder/300/200',
      features: ['Pattern Recognition', 'Cognitive Training', 'Brain Exercise']
    },
    {
      id: 'reaction-time',
      name: 'Reaction Time',
      category: 'reaction',
      description: 'Improve reflexes and reaction speed through quick response challenges',
      difficulty: 'Hard',
      duration: '4-8 min',
      rating: 4.5,
      players: 750,
      image: '/api/placeholder/300/200',
      features: ['Speed Training', 'Reflex Development', 'Quick Thinking']
    },
    {
      id: 'finger-dexterity',
      name: 'Finger Dexterity',
      category: 'hand',
      description: 'Enhance finger movement and dexterity for fine motor control',
      difficulty: 'Easy',
      duration: '5-10 min',
      rating: 4.9,
      players: 890,
      image: '/api/placeholder/300/200',
      features: ['Fine Motor Skills', 'Finger Control', 'Precision Training']
    },
    {
      id: 'gait-training',
      name: 'Gait Training',
      category: 'leg',
      description: 'Improve walking patterns and stride consistency through guided exercises',
      difficulty: 'Hard',
      duration: '10-20 min',
      rating: 4.4,
      players: 650,
      image: '/api/placeholder/300/200',
      features: ['Walking Patterns', 'Stride Analysis', 'Movement Quality']
    },
    {
      id: 'attention-training',
      name: 'Attention Training',
      category: 'cognitive',
      description: 'Enhance focus and concentration through sustained attention exercises',
      difficulty: 'Medium',
      duration: '7-15 min',
      rating: 4.6,
      players: 820,
      image: '/api/placeholder/300/200',
      features: ['Focus Training', 'Concentration', 'Mental Stamina']
    },
    {
      id: 'coordination-master',
      name: 'Coordination Master',
      category: 'hand',
      description: 'Master complex hand-eye coordination through multi-tasking challenges',
      difficulty: 'Hard',
      duration: '8-15 min',
      rating: 4.3,
      players: 580,
      image: '/api/placeholder/300/200',
      features: ['Multi-tasking', 'Complex Movements', 'Advanced Skills']
    }
  ];

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rehabilitation Games
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of engaging games designed to make your rehabilitation 
            journey fun and effective. Each game is tailored to specific recovery needs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:text-green-600'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Game Image */}
              <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <Gamepad2 className="w-16 h-16 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">{game.name}</p>
                </div>
              </div>

              {/* Game Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {game.description}
                </p>

                {/* Game Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{game.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{game.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{game.players}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {game.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Play Button */}
                <Link
                  href={`/games/${game.id}`}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Play Now</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Games Message */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No games found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later for new games.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;re constantly adding new games and features. Let us know what type of 
              rehabilitation game would help you most.
            </p>
            <button className="btn-secondary">
              Request New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
