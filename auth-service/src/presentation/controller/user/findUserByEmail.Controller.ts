import { HttpStatus } from "../../../constants/HttpStatus";
import { FindUserByEmailUseCase } from "../../../application/interface/useCases";
import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { Request, Response } from "express";



export class FindUserByEmailController {
    static async findingUserByEmail(
        req: Request,
        res: Response
      ): Promise<void> {
        try {
          console.log(req.params, "params");
    
          const { email } = req.params;
    
          const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepositories);
    
          const existingUser = await findUserByEmailUseCase.execute(email);
    
          if (existingUser) {
            res.status(HttpStatus.OK).json({
              success: true,
              message: "This email is allready reqistered",
              user: existingUser,
            });
            return;
          }
    
           res
            .status(HttpStatus.OK)
            .json({ success: false, message: "This email is not registered" });
            return;

        } catch (error: any) {
          console.error(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error.message,
          });
        }
      }
}