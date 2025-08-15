'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Trophy, 
  Gamepad2, 
  BarChart3, 
  Target, 
  TrendingUp, 
  Calendar,
  Play,
  Award,
  Clock,
  Activity,
  Zap,
  User
} from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalTime: 0,
    currentStreak: 0,
    averageScore: 0,
    level: 1,
    experience: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      // Fetch user stats from API
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const recentGames = [
    { id: 1, name: 'Hand Coordination', score: 85, date: '2024-01-15' },
    { id: 2, name: 'Balance Training', score: 92, date: '2024-01-14' },
    { id: 3, name: 'Memory Challenge', score: 78, date: '2024-01-13' }
  ];

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first game session', earned: true },
    { id: 2, name: 'Week Warrior', description: 'Play for 7 consecutive days', earned: true },
    { id: 3, name: 'High Scorer', description: 'Achieve a score above 90', earned: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.profile?.firstName || user.username}!
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to continue your rehabilitation journey?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(stats.totalTime / 60)}m</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{stats.currentStreak} days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Level</p>
                <p className="text-2xl font-bold text-gray-900">{stats.level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Start New Session */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Start New Session</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/games/hand-coordination" className="game-card">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Hand Coordination</h3>
                      <p className="text-sm text-gray-600">Improve fine motor skills</p>
                    </div>
                  </div>
                </Link>

                <Link href="/games/balance" className="game-card">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Balance Training</h3>
                      <p className="text-sm text-gray-600">Enhance stability</p>
                    </div>
                  </div>
                </Link>

                <Link href="/games/memory" className="game-card">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Gamepad2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Memory Challenge</h3>
                      <p className="text-sm text-gray-600">Boost cognitive function</p>
                    </div>
                  </div>
                </Link>

                <Link href="/games/reaction" className="game-card">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Reaction Time</h3>
                      <p className="text-sm text-gray-600">Improve reflexes</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentGames.map((game) => (
                  <div key={game.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Play className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{game.name}</h3>
                        <p className="text-sm text-gray-600">{game.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-green-600">{game.score}%</p>
                      <p className="text-sm text-gray-500">Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Progress & Achievements */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Overview</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Experience</span>
                    <span className="text-gray-900">{stats.experience} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.experience % 1000) / 10}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {1000 - (stats.experience % 1000)} XP to next level
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Weekly Goal</span>
                    <span className="text-sm font-medium text-green-600">5 sessions</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((stats.totalSessions / 5) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {achievement.earned ? (
                        <Award className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-sm font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-xs ${
                        achievement.earned ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/progress" className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Progress
                </Link>
                <Link href="/achievements" className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                  <Trophy className="w-4 h-4 mr-2" />
                  All Achievements
                </Link>
                <Link href="/profile" className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
