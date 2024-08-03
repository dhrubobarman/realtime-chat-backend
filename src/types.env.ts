import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envVariables = z.object({
  PORT: z.string(),
  JWT_SECRET: z.string(),
  ORIGIN: z.string(),
  DATABASE_URL: z.string()
});

export type TokenStructure = {
  id: string;
  email: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export const env = envVariables.parse(process.env);

envVariables.parse(process.env);
