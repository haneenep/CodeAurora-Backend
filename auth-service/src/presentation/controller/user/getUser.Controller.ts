import { HttpStatus } from "../../../constants/HttpStatus";
import { GetUserData } from "../../../application/interface/useCases";
import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { NextFunction, Request, Response } from "express";



export class GetUserController {

    static async getUserData(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        
        try {
          if (!req.user) {
            throw new Error("Authentication required: No user found");
          }
    
          const { _id } = req.user;
    
          const getUserUseCase = new GetUserData(userRepositories);
    
          const isUser = await getUserUseCase.execute(_id);
    
          console.log(isUser);
    
          if (!isUser) {
            res.status(HttpStatus.NOT_FOUND).json({
              success: false,
              message: "No user data",
            });
            return;
          }
    
          res.status(HttpStatus.OK).json({
            success: true,
            data: isUser,
            message: "gotten userdata successfully",
          });
          
        } catch (error) {
          console.log("Error while getting user", error);
          next(error);
        }
      }
}