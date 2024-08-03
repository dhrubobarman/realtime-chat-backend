import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './types.env';
import { env } from './types.env';
import mongoose from 'mongoose';
import authRouter from './routes/AuthRoute';

const app = express();

app.use(
  cors({
    origin: [env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);

const server = app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});

mongoose
  .connect(env.DATABASE_URL)
  .then(() => {
    console.log('Database connection successfull');
  })
  .catch((e) => {
    console.log('Database connection failed');
    console.log(e.message);
  });
