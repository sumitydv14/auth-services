import { Router, RequestHandler } from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { registerSchema } from './auth.validation';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
    "/register",
    validateRequest(registerSchema),
    authController.register);

export default authRouter;
