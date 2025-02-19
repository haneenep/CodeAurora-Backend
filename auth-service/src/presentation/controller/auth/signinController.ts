import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { SigninRequestDto } from "../../../application/dtos/signinRequestDto";
import { Request, Response } from "express";
import { SigninUseCase } from "../../../application/interface/useCases";
import { AuthHelper } from "../../../lib/utils/authHelpers";
import { HttpStatus } from "../../../constants/HttpStatus";
import { ERROR_MESSAGES } from "../../../constants/ErrorResponses";



export class SigninController {
    static async signin(req: Request, res: Response): Promise<void> {
        try {
    
          const { email, password } = req.body;
    
          const dto = new SigninRequestDto(email, password);
    
          const signinUseCase = new SigninUseCase(userRepositories);
    
          try {
            const user = await signinUseCase.execute(dto);
    
            AuthHelper.setAuthCookies(res, user)
    
            res.status(HttpStatus.OK).json({
              success: true,
              message: "successfully logged in user",
              data: user,
            });
            return;

          } catch (error: any) {
            res.status(HttpStatus.NOT_FOUND).json({
              success: false,
              message: error.message || "Invalid email or password",
            });
            return;
          }
        } catch (error) {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
            return;
        }
      }
}