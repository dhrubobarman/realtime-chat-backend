import e from 'express';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password has to be atlease 8 characters long')
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password has to be atlease 8 characters long'),
  confirm: z.string()
});
