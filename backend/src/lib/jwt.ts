import jwt from 'jsonwebtoken';
import { ENV } from '../config';

interface UserPayload {
  id: string;
  email: string;
}

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, ENV.AUTH_TOKEN, {
    expiresIn: '24h',
  });
}

export function verifyToken(token: string): UserPayload {
  try {
    return jwt.verify(token, ENV.AUTH_TOKEN) as UserPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
} 