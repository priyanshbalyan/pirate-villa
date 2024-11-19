import { NextResponse } from 'next/server';
import { openDb } from '~/lib/db';
import { generateToken } from '~/lib/auth';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { email, password }: { email: string; password: string } = await req.json();

  try {
    const db = await openDb();
    const user = await db.get<{ email: string; password: string }>(
      'SELECT * FROM users WHERE email = ?',
      email
    );

    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken({ email });
      return NextResponse.json({ token });
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}