import bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { Role } from '../../generated/prisma/client';

export class AuthService {
    private repository = new AuthRepository();

    async register(data: {
        name: string;
        email: string;
        password: string;
        role?: Role;
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

    async login(data: {
        email: string;
        password: string
    }) {
        const user = await this.repository.findUserByEmail(data.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        return {
            user,
            accessToken,
            refreshToken
        }
    }

    async getProfile(userId: string) {
        const user = await this.repository.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}