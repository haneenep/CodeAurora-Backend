import { UpdateUserNameUseCase } from "../../../application/interface/useCases";
import { HttpStatus } from "../../../constants/HttpStatus";
import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { NextFunction, Request, Response } from "express";


export class UpdateUserNameController {
    static async updateUserName(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        try {
          console.log(req.body);
          const { userName, email } = req.body;
    
          const updateUserNameUseCase = new UpdateUserNameUseCase(userRepositories);
    
          const result = updateUserNameUseCase.execute(userName, email);
    
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