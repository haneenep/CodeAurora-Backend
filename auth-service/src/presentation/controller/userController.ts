

import userRepositories from "../../infrastructure/mongoose/repositories/userRepositories";
import { SignupUserCase } from "../../application//interface/useCases/signupUseCase";
import { SignupRequestDto } from "../../application/dtos/signupRequestDto";
import { Request, Response } from "express";

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {

      console.log(req.body,"from frontend")

      const {
        userName,
        email,
        password,
        role,
        profileImage,
        isBlocked,
        isAdmin,
        github,
        bio,
      } = req.body;

      const dto = new SignupRequestDto(
        userName,
        email,
        password,
        role,
        profileImage,
        isBlocked,
        isAdmin,
        github,
        bio
      );

      const userRepository = userRepositories

      const registerUseCase = new SignupUserCase(userRepository);

      const newUser = registerUseCase.execute(dto);

      res.status(200).json({success: true, message: "User Registered Successfully",newUser});

    } catch (error: any) {
        res.status(404).json({success: false, error: error.message})
    }
  }

  static async findingUserEmail(req: Request, res: Response): Promise<void> {

    try {
        
        console.log(req.params,'params',req.body);

    } catch (error) {
        
        console.log(error);
        
    }
}
}