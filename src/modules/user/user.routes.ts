import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/authorize.middleware';
import { validateRequest } from '../../middlewares/validate.middleware';
import { updateUserSchema } from './user.validation';

const userRouter = Router();
const userController = new UserController();
userRouter.get(
    "/users",
    authMiddleware,
    authorize(['ADMIN']), // Only allow admin role to access this route
    userController.getAllUsers
);

userRouter.get(
    "/user/:id",
    authMiddleware,
    userController.getUserById
)

userRouter.patch(
    "/user/:id",
    authMiddleware,
    validateRequest(updateUserSchema),
    userController.updateUserById   
)
userRouter.delete(
    '/user/:id',
    authMiddleware,
    authorize(['ADMIN']),
    userController.deletedUser
)
export default userRouter;