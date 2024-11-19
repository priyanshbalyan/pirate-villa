import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variables in production

export function middleware(req: Request) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    // Redirect to login page if no token is found
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, SECRET); // Verify token
    return NextResponse.next(); // Allow access
  } catch (err) {
    console.error('Invalid token:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard'], // Protect specific routes like `/dashboard`
};