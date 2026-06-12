import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/authorize.middleware';

const userRouter = Router();
const userController = new UserController();
userRouter.get(
    "/users",
    authMiddleware,
    authorize(['ADMIN']), // Only allow admin role to access this route
    userController.getAllUsers
);
export default userRouter;