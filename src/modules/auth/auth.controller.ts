import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export class AuthController {
   async register(req: Request, res: Response) {
        try {
            const user = await authService.register(req.body);
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
}