import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import GameSession from '../../../../models/GameSession';
import User from '../../../../models/User';

export async function POST(request) {
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
    
    const body = await request.json();
    const { gameType, sessionData, performance, feedback } = body;

    // Validate required fields
    if (!gameType || !sessionData || !performance) {
      return NextResponse.json(
        { message: 'Game type, session data, and performance are required' },
        { status: 400 }
      );
    }

    // Create game session
    const gameSession = new GameSession({
      userId,
      gameType,
      sessionData,
      performance,
      feedback: feedback || {}
    });

    await gameSession.save();

    // Update user progress
    const user = await User.findById(userId);
    if (user) {
      user.progress.totalSessions += 1;
      user.progress.totalTime += sessionData.duration || 0;
      user.progress.experience += Math.floor((sessionData.score || 0) / 10);
      
      // Level up logic
      const newLevel = Math.floor(user.progress.experience / 1000) + 1;
      if (newLevel > user.progress.currentLevel) {
        user.progress.currentLevel = newLevel;
      }
      
      await user.save();
    }

    return NextResponse.json({
      message: 'Game session saved successfully',
      sessionId: gameSession._id
    }, { status: 201 });

  } catch (error) {
    console.error('Save game session error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    
    const { searchParams } = new URL(request.url);
    const gameType = searchParams.get('gameType');
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    const query = { userId };
    if (gameType) {
      query.gameType = gameType;
    }
    
    const sessions = await GameSession.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'username profile.firstName profile.lastName');

    return NextResponse.json(sessions);

  } catch (error) {
    console.error('Get game sessions error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
