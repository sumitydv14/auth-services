import prisma from  "../../config/prisma";

export class UserRepository {
     async getallUsers() {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
     }
}
 