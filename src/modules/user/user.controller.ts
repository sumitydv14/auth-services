import { Request, Response } from 'express';
import { UserService } from "./user.service";

export class UserController {
     private service = new UserService();

     getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.service.getAllUsers();
           return res.status(200).json({
                success: true,
                data: users
            });
        } catch (error: unknown) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : String(error)
            });
        }   
    }
}