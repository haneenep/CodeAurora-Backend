import { ChangePasswordUseCase } from "../../../application/interface/useCases/changePasswordUseCase";
import { HttpStatus } from "../../../constants/HttpStatus";
import { NextFunction, Request, Response } from "express";
import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { validateRequest } from "../../../lib/common/middlewares/validationMiddleware";
import { passwordChangeSchema } from "../../../lib/validation";

export class ChangePasswordController {

    static validateChangePassword = validateRequest(passwordChangeSchema)

    static async changePassword(req: Request, res: Response, next: NextFunction): Promise<void>{

        try {

            console.log(req.body,"chagnepassword")
            
            const { currentPassword, newPassword, email} = req.body;

            if(!email){
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: "user not found"
                });
                return;
            }

            if (!currentPassword || !newPassword) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "currentPassword and newPassword are required"
                });
                return;
            }

            const changePasswordUseCase = new ChangePasswordUseCase(userRepositories);

            const result = await changePasswordUseCase.execute(email, currentPassword, newPassword);

            if(!result){
                res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: "user password changing failed"
                });
                return;
            }
            
            res.status(HttpStatus.OK).json({
                success: true,
                message: "user password successfully changed"
            });

        } catch (error) {
            next(error)
        }
    }
}