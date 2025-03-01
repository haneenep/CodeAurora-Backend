import { EditUserProfileUseCase } from "../../../application/interface/useCases";
import { HttpStatus } from "../../../constants/HttpStatus";
import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { NextFunction, Request, Response } from "express";


export class EditUserProfileController {
    static async editUserProfile(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        try {
          console.log(req.body);
          const { userName, email, profile } = req.body;
    
          const editUserProfileUseCase = new EditUserProfileUseCase(userRepositories);
    
          const result = editUserProfileUseCase.execute(userName, email, profile);
    
          if (!result) {
            res.status(HttpStatus.UNAUTHORIZED).json({
              success: false,
              message: "username updation is failed",
            });
          }
    
          res.status(HttpStatus.CREATED).json({
            success: true,
            data: result,
            message: "username updated",
          });
        } catch (error) {
          next(error);
        }
      }
}