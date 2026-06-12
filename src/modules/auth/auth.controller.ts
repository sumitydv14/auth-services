import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export class AuthController {
   async register(req: Request, res: Response) {
    console.log('Received registration data:', req.body);
        try {
            const user = await authService.register(req.body);
            console.log('Registered user:', user);
            res.status(201).json({
                success: true,
                data: user
            });
        } catch (error: unknown) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : String(error)
            });
        }
   }

   async login(req: Request, res: Response) {
        try {
            const result = await authService.login(req.body);
            res.status(200).json({
                success: true,
                data: result
            })
        } catch (error: unknown) {
             res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : String(error)
             })
        }
   }

   async getProfile(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
            }

            const user = await authService.getProfile(userId);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error: unknown) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : String(error)
            });
        }
   }
}