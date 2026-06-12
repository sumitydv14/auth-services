import logger from "../../utils/logger";
import { UserRepository } from "./user.repository";

export class UserService {
    private repository = new UserRepository()
    async getAllUsers(page=1, limit=10) {
        try {
            const users = await this.repository.getallUsers(page, limit);
            return users;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }

    async getByUserId(id: string) {
         try {
            const user = await  this.repository.findUserById(id);
            if(!user) {
                throw new Error("User not found");
            }
            return user
         } catch(error) {
            throw new Error('User no fount')
         }
    }

    async updateUser(id: string, data: {
        name?:string,
        email?: string,
    }) {
        logger.info(
        `User updated: ${id}`
        );
        return this.repository.updateUser(id, data)
    }

    async deleteUser(id: string) {
        logger.warn(
        `User deleted: ${id}`
        );
        return this.repository.deleteUser(id)
    }
};