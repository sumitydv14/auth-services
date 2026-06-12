import { UserRepository } from "./user.repository";

export class UserService {
    private repository = new UserRepository()
    async getAllUsers() {
        try {
            const users = await this.repository.getallUsers();
            return users;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }
};