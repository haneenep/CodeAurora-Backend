import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { FindUserByEmailUseCase } from "../../../application/interface/useCases";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../constants/HttpStatus";
import { generateForgotPasswordToken } from "../../../lib/http/jwt/generateForgotPasswordToken";
import { MailService } from "../../../service/mailService";


export class ForgotPasswordcontroller {
    static async forgotPasswordMail(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        try {
          console.log(req.body, "email");
          const { email } = req.body;
    
          const findUserByEmailUseCase = new FindUserByEmailUseCase(
            userRepositories
          );
    
          const result = await findUserByEmailUseCase.execute(email);
    
          if (result?.isGAuth) {
            res.status(HttpStatus.OK).json({
              success: true,
              data: result,
              isGAuth: true,
              message: "This User is Logged in google",
            });
            return;
          }
    
          const token = await generateForgotPasswordToken({ email });
    
          console.log(token, "tokeeeen");
    
          if (!token) {
            throw new Error("Token is empty");
          }
    
          const userName = result?.userName;
    
          if (!userName) {
            throw new Error("No username is provided");
          }
    
          await MailService.sendForgotPasswordMail(email, token, result?.userName);
    
          res.status(HttpStatus.OK).json({
            success: true,
            data: {},
            message: "reset password mail produced",
          });
        } catch (error) {
          next(error);
        }
      }
}