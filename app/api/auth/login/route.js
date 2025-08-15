import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last active
    user.lastActive = new Date();
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Generate simple token (in production, use JWT)
    const token = Buffer.from(`${user._id}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      message: 'Login successful',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
