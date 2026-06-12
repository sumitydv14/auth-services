import { Request, Response } from 'express';
import { RefreshTokenService } from './refresh-token.service';

export class RefreshTokenController {
    private service = new RefreshTokenService();
    public refreshToken = async (req: Request, res: Response) => {
        try {
            const { refreshToken  } = req.body;
            if (!refreshToken || typeof refreshToken !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token is required and must be a string'
                });
            }
            const accessToken  = await this.service.refreshToken(refreshToken);
            res.status(200).json({
                success: true,
                data:  { accessToken } 
            });
        }
        catch (error: unknown) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : String(error)
            });
        }
        
    } 
    
    public logout = async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken || typeof refreshToken !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token is required and must be a string'
                });
            }
            const result = await this.service.logout(refreshToken);
            res.status(200).json({
                success: true,
                data: result
            });
        }
        catch (error: unknown) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : String(error)
            });
        }
    }
}