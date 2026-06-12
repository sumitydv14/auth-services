import jwt from 'jsonwebtoken';

export const generateAccessToken = (
    payload : {
        id: string;
        email: string;
        password?: string;
        role?: string;
    }
) => {
    return jwt.sign(
        payload, 
        process.env.JWT_SECRET!,
        { expiresIn: '15m', algorithm: 'HS256'}
    )
}

export const generateRefreshToken = (
    payload : {
        id: string;
        email: string;
        password: string;
        role?: string;
    }
)   => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        { expiresIn: '7d', algorithm: 'HS256' }
    )
}