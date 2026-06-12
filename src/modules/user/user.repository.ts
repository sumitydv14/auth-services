import prisma from  "../../config/prisma";

export class UserRepository {
     async getallUsers(page: number, limit: number, search?:string) {
        return prisma.user.findMany({
            where: {
            ...(search && {
                name: {
                contains: search,
                mode: "insensitive",
                },
            }),
            },
            skip: (page - 1) * limit,
            take: limit,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
     }

     async findUserById(id: string) {
        return prisma.user.findUnique({
             where: { id },
             select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
             }
        });
     }

     async updateUser(id: string, data: {
        name?: string;
        email?: string;
        role?: string;
     }) {
        return prisma.user.update({
            where: { id },
            data : {
                isDeleted: true
            }
        });
     }

     async deleteUser(id: string) {
        return prisma.user.delete({
            where: { id }
        });
     }
}
 