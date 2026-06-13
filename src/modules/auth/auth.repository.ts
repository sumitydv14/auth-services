import prisma from "../../config/prisma";

export class AuthRepository {
    async findUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    async createUser(data:{
        name: string;
        email: string;
        password: string;
        role?: 'USER' | 'ADMIN';
    }) {
        return prisma.user.create({
            data
        })
    }

    async findUserById(id: string) {
        return prisma.user.findUnique({
            where: { id },
            select : {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,

            }
        });
    }
}

