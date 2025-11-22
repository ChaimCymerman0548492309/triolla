// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET missing');
}

export const extractUserFromCookie = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = { id: decoded.id };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
