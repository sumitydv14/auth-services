import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { loginSchema, registerSchema } from './auth.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
    "/register",
    validateRequest(registerSchema),
    authController.register);

authRouter.post(
    "/login", 
    validateRequest(loginSchema), 
    authController.login
);

authRouter.get(
    "/profile",
    authMiddleware,
    authController.getProfile
)

export default authRouter;
