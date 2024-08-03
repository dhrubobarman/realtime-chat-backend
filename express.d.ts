import { Request, ResBody } from 'express';
import { TokenStructure } from './src/types.env';

// @types/express/index.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: TokenStructure;
    }
  }
}
