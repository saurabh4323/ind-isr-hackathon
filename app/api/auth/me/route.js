import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

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
    
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(userResponse);

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
