import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    jwt.verify(token, SECRET);
    return NextResponse.json({ message: 'This is secure data.' });
  } catch (err) {
    console.error('Token verification error:', err);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}