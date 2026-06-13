/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register User
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               name:
 *                 type: string
 *
 *               email:
 *                 type: string
 *
 *               password:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User Login
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               email:
 *                 type: string
 *
 *               password:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get User Profile
 *
 *     security:
 *       - bearerAuth: []
 *
 *     tags:
 *       - Authentication
 *
 *     responses:
 *       200:
 *         description: User profile
 */

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
