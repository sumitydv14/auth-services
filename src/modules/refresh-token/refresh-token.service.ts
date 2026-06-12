import jwt from "jsonwebtoken";
import { RefreshTokenRepository } from "./refresh-token.repository";
import { generateAccessToken } from "../../utils/jwt";

export class RefreshTokenService {
  private repository = new RefreshTokenRepository();

  async refreshToken(token: string) {
    const existingToken = await this.repository.findRefreshToken(token);
    console.log('Existing token:', existingToken);
    if (!existingToken) {
      throw new Error('Invalid refresh token');
    }
    if(existingToken.expiresAt < new Date()) {
        await this.repository.deleteRefreshToken(token);
        throw new Error('Refresh token has expired');
    }

    const decodedToken = jwt.verify(
        existingToken.token, 
        process.env.JWT_REFRESH_SECRET!
    ) as { 
        id: string;
        email: string;
        role: string;
    };
    
    return generateAccessToken({
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
    });
  }

  async logout(token: string) {
    const existingToken = await this.repository.findRefreshToken(token);
    if (!existingToken) {
        throw new Error('Invalid refresh token');
    }
    await this.repository.deleteRefreshToken(token);
     return { success: true, message: 'Logged out successfully' };
    }
   
}