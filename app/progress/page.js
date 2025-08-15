'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target, 
  Trophy,
  Activity,
  Clock,
  Award,
  LineChart,
  PieChart
} from 'lucide-react';

export default function Progress() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [progressData, setProgressData] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      fetchProgressData();
    }
  }, [user, loading, router]);

  const fetchProgressData = async () => {
    try {
      setLoadingStats(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProgressData(data);
      }
    } catch (error) {
      console.error('Failed to fetch progress data:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading progress data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const timeframes = [
    { id: 'week', name: 'This Week', days: 7 },
    { id: 'month', name: 'This Month', days: 30 },
    { id: 'quarter', name: 'This Quarter', days: 90 }
  ];

  const mockWeeklyData = [
    { day: 'Mon', sessions: 2, time: 25, score: 85 },
    { day: 'Tue', sessions: 1, time: 15, score: 78 },
    { day: 'Wed', sessions: 3, time: 35, score: 92 },
    { day: 'Thu', sessions: 0, time: 0, score: 0 },
    { day: 'Fri', sessions: 2, time: 20, score: 88 },
    { day: 'Sat', sessions: 1, time: 12, score: 75 },
    { day: 'Sun', sessions: 2, time: 28, score: 90 }
  ];

  const mockGameTypeData = [
    { name: 'Hand Coordination', sessions: 15, avgScore: 87 },
    { name: 'Balance Training', sessions: 12, avgScore: 82 },
    { name: 'Memory Challenge', sessions: 8, avgScore: 79 },
    { name: 'Reaction Time', sessions: 6, avgScore: 75 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Progress
          </h1>
          <p className="text-gray-600">
            Track your rehabilitation journey and celebrate your achievements
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-100">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {timeframe.name}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {progressData?.totalSessions || 0}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((progressData?.totalTime || 0) / 60)}m
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {progressData?.currentStreak || 0} days
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {progressData?.level || 1}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-green-500" />
              Weekly Activity
            </h3>
            <div className="space-y-4">
              {mockWeeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.sessions / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{day.sessions} sessions</div>
                    <div className="text-xs text-gray-500">{day.time} min</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Type Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-blue-500" />
              Game Performance
            </h3>
            <div className="space-y-4">
              {mockGameTypeData.map((game, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-purple-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-900">{game.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{game.sessions} sessions</div>
                    <div className="text-xs text-gray-500">Avg: {game.avgScore}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
            Progress Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Experience Progress */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Experience</span>
                <span className="text-gray-900">{progressData?.experience || 0} XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((progressData?.experience || 0) % 1000) / 10}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {1000 - ((progressData?.experience || 0) % 1000)} XP to next level
              </p>
            </div>

            {/* Weekly Goal */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Weekly Goal</span>
                <span className="text-gray-900">5 sessions</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(((progressData?.weeklyStats?.sessions || 0) / 5) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {progressData?.weeklyStats?.sessions || 0} of 5 sessions completed
              </p>
            </div>

            {/* Average Score */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Average Score</span>
                <span className="text-gray-900">{progressData?.averageScore || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressData?.averageScore || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Based on recent sessions
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Recent Achievements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressData?.achievements?.slice(0, 6).map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{achievement}</h4>
                  <p className="text-xs text-gray-600">Earned recently</p>
                </div>
              </div>
            ))}
            
            {(!progressData?.achievements || progressData.achievements.length === 0) && (
              <div className="col-span-full text-center py-8">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h4>
                <p className="text-gray-600">Complete more sessions to earn achievements!</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Keep Up the Great Work!</h2>
            <p className="text-lg mb-6 opacity-90">
              Your consistent effort is showing results. Continue with your rehabilitation 
              routine to unlock more achievements and track your progress.
            </p>
            <button 
              onClick={() => router.push('/games')}
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Play More Games
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
