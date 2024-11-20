import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variables in production

interface TokenPayload {
  email: string;
}

export function verifyToken(headers: Headers): TokenPayload {
  const authHeader = headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }

  const token = authHeader.split(' ')[1];
  return jwt.verify(token, SECRET) as TokenPayload;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}