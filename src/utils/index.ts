import { compare, genSalt, hash } from 'bcrypt';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { env, TokenStructure } from '../types.env';
import { NextFunction, Request, Response } from 'express';

export const maxAge = 3 * 24 * 60 * 60 * 1000;
export const createToken = (email: string, id: string) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

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

export const generatePasswordHash = async (password: string) => {
  try {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  try {
    const match = await compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.log(error);
    return false;
  }
};
