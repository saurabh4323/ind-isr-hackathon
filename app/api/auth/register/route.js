import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { username, email, password, firstName, lastName, age, condition, recoveryStage, injuryDate } = body;

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email or username already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      profile: {
        firstName,
        lastName,
        age: parseInt(age) || undefined,
        condition,
        recoveryStage,
        injuryDate: injuryDate ? new Date(injuryDate) : undefined
      }
    });

    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Generate simple token (in production, use JWT)
    const token = Buffer.from(`${user._id}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      message: 'User created successfully',
      user: userResponse,
      token
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
