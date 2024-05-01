import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
import { connectDB } from '@/mongoose';
import { User } from '@/mongoose/schema';
import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';

export async function POST(req:NextRequest) {
  const {email, password } = await req.json();

  try {
    await connectDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({email, password:password });
    const result = await newUser.save();

    // const token = jwt.sign({ email: result.email }, process.env.JWT_SECRET || 'mysupercodewith');
    cookies().set({
      name: 'token',
      value: newUser.email,
      secure: true,
    });

    return  NextResponse.json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}