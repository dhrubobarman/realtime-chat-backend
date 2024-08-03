import { Router } from 'express';
import { getUserInfo, login, signup } from '../controllers';
import { verifyToken } from '../utils';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/userInfo', verifyToken, getUserInfo);

export default authRouter;
