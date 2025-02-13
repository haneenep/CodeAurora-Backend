import userRepositories from "../../infrastructure/mongoose/repositories/userRepositories";
import { SignupUserCase } from "../../application//interface/useCases/signupUseCase";
import { SignupRequestDto } from "../../application/dtos/signupRequestDto";
import { Request, Response } from "express";
import { FindUserByEmailUseCase } from "../../application/interface/useCases/findUserByEmailUseCase";
import { MailService } from "../../service/mailService";
import { VerifyOtpUseCase } from "../../application/interface/useCases/verifyOtpUseCase";

export class UserController {

  static async register(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body, "from frontend");

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

      const userRepository = userRepositories;

      const registerUseCase = new SignupUserCase(userRepository);

      const newUser = await registerUseCase.execute(dto);

      res.status(200).json({
        success: true,
        message: "User Registered Successfully",
        newUser,
      });

    } catch (error: any) {

      res.status(500).json({ success: false, error: error.message });

    }
  }

  static async findingUserEmail(
    req: Request,
    res: Response
  ) : Promise<Response | any> {
    try {
      console.log(req.params, "params");

      const { id } = req.params;

      const userRepository = userRepositories;

      const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);

      const existingUser = await findUserByEmailUseCase.execute(id);

      if (existingUser) {
        return res.status(200).json({
          success: true,
          message: "This email is allready reqistered",
          user: existingUser,
        });
      }

      return res
        .status(200)
        .json({ succes: false, message: "This email is not registered" });

    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async SendVerificationEmail(req: Request, res: Response) {

    try {

      console.log(req.body,"body")

      const {email} = req.body;

      await MailService.sendVerificationMail(email);

      res.status(200).json({success: true, message: "OTP send successfully"})

    } catch (error: any) {
      
      res.status(500).json({success: false, error: error.message})
    }
  }

  static async OtpVerification(req: Request, res: Response): Promise<any> {

    try {

      console.log(req.body)

      const {email, otp} = req.body;

      const userRepository = userRepositories

      const verifyingUserOtp = new VerifyOtpUseCase(userRepository);

      const isVerified = await verifyingUserOtp.execute(email,otp);

      if(!isVerified){
        return res.status(404).json({success: false, message: "Otp verification failed"})
      }

      return res.status(200).json({success: true, message: "otp verified successfully"})

    } catch (error: any) {

      console.error(error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
      
    }
  }
}
