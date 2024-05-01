import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/mongoose';
import { User } from '@/mongoose/schema';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req:NextRequest) {
  const { email, password } = await req.json();

  try {
    await connectDB();
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: 'Details not found, please sign up' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Password not matched' });
    }

    const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET || '');
    const response = NextResponse.json({ message: 'Successfully signed in' });
    cookies().set({
      name: 'token',
      value: token,
      secure: true,
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
