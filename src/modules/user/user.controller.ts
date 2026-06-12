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

    getUserById = async (req: Request, res: Response) => {
         try {
            const userId = req.params.id as string
            const user = await this.service.getByUserId(userId)
            return res.status(200).json({
                success: true,
                data: user
            })
         } catch (error: unknown) {
                return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : String(error)
            });
         }
    }

    updateUserById = async (req: Request, res: Response) => {
         try {
            const {body} = req;
            const id = req.params.id as string
            const user = await this.service.updateUser(id, body)
            return res.status(200).json({
                success: true,
                data : user
            })
         } catch (error: unknown) {
                return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : String(error)
            });
         }
    }

    deletedUser = async (req: Request, res:Response) => {
        try {
           const id = req.params.id as string;
           await this.service.deleteUser(id)
           return res.status(200).json({
              success: true,
              message: 'User deleted successfully'
           })
        } catch(error: unknown) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : String(error)
            });
        }
        
    }
}