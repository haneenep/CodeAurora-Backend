import { ResetPassword } from "../../../application/interface/useCases";
import { HttpStatus } from "../../../constants/HttpStatus";
import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { hashPassword } from "../../../lib/http/bcrypt/hashPassword";
import { verifyForgotPasswordToken } from "../../../lib/http/jwt/verifyForgotPasswordToken";
import { NextFunction, Request, Response } from "express";


export class ResetPasswordController {

    static async resetPassword(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        try {
          const { token, password } = req.body;
    
          const isVerified: any = await verifyForgotPasswordToken(token);
    
          if (!isVerified) {
            res.status(HttpStatus.NOT_FOUND).json({
              success: false,
              data: {},
              message: "Invalid token or expired token",
            });
            return;
          }
          console.log(isVerified, "verify tttoken");
    
          const hash = await hashPassword(password);
    
          const resetPasswordUseCase = new ResetPassword(userRepositories);
    
          const result = await resetPasswordUseCase.execute(isVerified.email, hash);
    
          if (!result) {
            throw new Error("reseting password failed");
          }
    
          res.status(HttpStatus.OK).json({
            success: true,
            data: result,
            message: "password reseted",
          });
        } catch (error) {
          next(error);
        }
      }
}