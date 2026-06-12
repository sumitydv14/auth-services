import bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';

export class AuthService {
    private repository = new AuthRepository();

    async register(data: {
        name: string;
        email: string;
        password: string;
    }) {
        const existingUser = await this.repository.findUserByEmail(data.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.repository.createUser({
            ...data,
            password: hashedPassword
        });
    }
}