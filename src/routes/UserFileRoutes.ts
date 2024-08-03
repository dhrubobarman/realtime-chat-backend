import { Router } from 'express';
import { verifyToken } from '../middleware/AuthMiddleware';
import { deleteFile, uploadFile } from '../controllers';

const userfileRouter = Router();

userfileRouter.put('/', verifyToken, uploadFile);
userfileRouter.delete('/', verifyToken, deleteFile);

export default userfileRouter;
