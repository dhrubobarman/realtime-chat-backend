import { Request, ResBody } from 'express';
import { TokenStructure } from './types.env';

export declare namespace Express {
  interface Request {
    user?: TokenStructure;
    body: {
      // Replace with your custom type
      user?: TokenStructure;
      // Add more properties as needed
    };
  }
}

declare global {
  // namespace Express {
  //   interface Request {
  //     userId?: string;
  //     userEmail?: string;
  //   }
  // }
  export interface Request {
    user: any;
  }
}
