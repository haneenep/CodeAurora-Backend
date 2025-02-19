import { SignupRequestDto } from "../../../application/dtos";
import { SignupUserCase } from "../../../application/interface/useCases";
import { ERROR_MESSAGES } from "../../../constants/ErrorResponses";
import { HttpStatus } from "../../../constants/HttpStatus";
import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { AuthHelper } from "../../../lib/utils/authHelpers";
import { Request, Response } from "express";

export class RegisterController {
  static async register(req: Request, res: Response): Promise<void> {
    try {

      const dto = new SignupRequestDto(req.body);

      const registerUseCase = new SignupUserCase(userRepositories);

      const newUser = await registerUseCase.execute(dto);

      if (!newUser) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ success: false, message: ERROR_MESSAGES.NOT_FOUND });
        return;
      }

      AuthHelper.setAuthCookies(res, newUser);

      res.status(HttpStatus.CREATED).json({
        success: true,
        message: "User Registered Successfully",
        data: newUser,
      });
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        error: error.message,
      });
    }
  }
}
