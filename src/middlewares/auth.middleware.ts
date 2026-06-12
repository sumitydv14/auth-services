import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// export interface AuthenticatedRequest extends Request {
//     user?: {
//         id: number | string;
//         email: string;
//         role?: string;
//     };
// }

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authMiddleware = (
     req: Request,
     res: Response,
     next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({
            success: false,
            message: 'Authorization header missing'
         })
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
}