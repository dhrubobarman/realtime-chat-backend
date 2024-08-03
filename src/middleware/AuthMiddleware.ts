import { compare, genSalt, hash } from 'bcrypt';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { env, TokenStructure } from '../types.env';
import { NextFunction, Request, Response } from 'express';

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.cookies.jwt;
    if (!token) return response.status(401).json({ message: 'Unauthorized' });
    jwt.verify(token, env.JWT_SECRET, async (error: VerifyErrors | null, payload: any) => {
      if (error) return response.status(403).json({ message: 'Token is not valid' });
      request.user = {
        id: payload.id,
        email: payload.email
      };
      next();
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};
