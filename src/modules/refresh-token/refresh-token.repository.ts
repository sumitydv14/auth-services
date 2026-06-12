import prisma from "../../config/prisma";

export class RefreshTokenRepository {
     async createRefreshToken(data: {
        token: string;
        userId: string;
        expiresAt: Date;
     }) {
        return prisma.refreshToken.create({
            data
        });
     }

     async findRefreshToken(token: string) {
        return prisma.refreshToken.findUnique({
            where: { token },
            include: {
                user: true
            }
        })
     }

     async deleteRefreshToken(token: string) {
        return prisma.refreshToken.delete({
            where: { token }
        });
     }
     
}