import { Router } from 'express';
import { getUserInfo, login, signup, updateProfile } from '../controllers';
import { verifyToken } from '../middleware/AuthMiddleware';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/user-info', verifyToken, getUserInfo);
authRouter.patch('/update-profile', verifyToken, updateProfile);

export default authRouter;
