import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import GameSession from '../../../../models/GameSession';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Decode simple token (in production, verify JWT)
    const decoded = Buffer.from(token, 'base64').toString();
    const [userId] = decoded.split(':');
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();
    
    // Get user data
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get recent game sessions for streak calculation
    const recentSessions = await GameSession.find({ userId })
      .sort({ createdAt: -1 })
      .limit(30);

    // Calculate current streak
    let currentStreak = 0;
    if (recentSessions.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let currentDate = today;
      for (let i = 0; i < 30; i++) {
        const hasSession = recentSessions.some(session => {
          const sessionDate = new Date(session.createdAt);
          sessionDate.setHours(0, 0, 0, 0);
          return sessionDate.getTime() === currentDate.getTime();
        });
        
        if (hasSession) {
          currentStreak++;
        } else {
          break;
        }
        
        currentDate.setDate(currentDate.getDate() - 1);
      }
    }

    // Calculate average score
    let averageScore = 0;
    if (recentSessions.length > 0) {
      const totalScore = recentSessions.reduce((sum, session) => sum + (session.sessionData.score || 0), 0);
      averageScore = Math.round(totalScore / recentSessions.length);
    }

    // Get game type distribution
    const gameTypeStats = await GameSession.aggregate([
      { $match: { userId: user._id } },
      { $group: { _id: '$gameType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get weekly progress
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklySessions = await GameSession.find({
      userId: user._id,
      createdAt: { $gte: oneWeekAgo }
    });

    const weeklyStats = {
      sessions: weeklySessions.length,
      totalTime: weeklySessions.reduce((sum, session) => sum + (session.sessionData.duration || 0), 0),
      averageScore: weeklySessions.length > 0 
        ? Math.round(weeklySessions.reduce((sum, session) => sum + (session.sessionData.score || 0), 0) / weeklySessions.length)
        : 0
    };

    const stats = {
      totalSessions: user.progress.totalSessions,
      totalTime: user.progress.totalTime,
      currentStreak,
      averageScore,
      level: user.progress.currentLevel,
      experience: user.progress.experience,
      gameTypeDistribution: gameTypeStats,
      weeklyStats,
      achievements: user.progress.achievements || [],
      lastActive: user.lastActive
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Get user stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
