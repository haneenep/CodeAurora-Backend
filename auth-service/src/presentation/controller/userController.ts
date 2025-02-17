import userRepositories from "../../infrastructure/mongoose/repositories/userRepositories";
import { SignupUserCase } from "../../application//interface/useCases/signupUseCase";
import { SignupRequestDto } from "../../application/dtos/signupRequestDto";
import { NextFunction, Request, Response } from "express";
import { FindUserByEmailUseCase } from "../../application/interface/useCases/findUserByEmailUseCase";
import { MailService } from "../../service/mailService";
import { VerifyOtpUseCase } from "../../application/interface/useCases/verifyOtpUseCase";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import { HttpStatus } from "../../constants/HttpStatus";
import { ERROR_MESSAGES } from "../../constants/ErrorResponses";
import { SigninRequestDto } from "../../application/dtos/signinRequestDto";
import { SigninUseCase } from "../../application/interface/useCases/signinUseCase";
import { GetUserData } from "../../application/interface/useCases/getUserDataUseCase";
import { OAuth2Client } from "google-auth-library";
import { config } from "dotenv";
import { generateRandomString } from "../../lib/utils/generateRandomString";

config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
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

      if (!newUser) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: ERROR_MESSAGES.NOT_FOUND});
      } else {

        const accessToken = generateAccessToken({
          _id: String(newUser?._id),
          email: newUser?.email,
          role: newUser?.role,
        });
        
        const refreshToken = generateRefreshToken({
          _id: String(newUser?._id),
          email: newUser?.email,
          role: newUser?.role  
        });

        res.cookie("access_token",accessToken,{
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })

        res.cookie("refresh_token",refreshToken,{
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
  
        res.status(HttpStatus.CREATED).json({
          success: true,
          message: "User Registered Successfully",
          data: newUser,
        });

      }

    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async findingUserEmail(
    req: Request,
    res: Response
  ): Promise<Response | any> {
    try {
      console.log(req.params, "params");

      const { email } = req.params;

      const userRepository = userRepositories;

      const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);

      const existingUser = await findUserByEmailUseCase.execute(email);

      if (existingUser) {
        return res.status(200).json({
          success: true,
          message: "This email is allready reqistered",
          user: existingUser,
        });
      }

      return res
        .status(200)
        .json({ success: false, message: "This email is not registered" });

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
      console.log(req.body, "body");

      const { email } = req.body;

      await MailService.sendVerificationMail(email);

      res.status(200).json({ success: true, message: "OTP send successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async OtpVerification(req: Request, res: Response): Promise<any> {
    try {
      console.log(req.body);

      const { email, otp } = req.body;

      const userRepository = userRepositories;

      const verifyingUserOtp = new VerifyOtpUseCase(userRepository);

      const isVerified = await verifyingUserOtp.execute(email, otp);

      if (!isVerified) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid or expired otp" });
      }

      return res
        .status(200)
        .json({ success: true, message: "otp verified successfully" });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async signin(req: Request, res: Response): Promise<Response | any> {

    try {
      
      console.log(req.body,"login data");

      const { email, password } = req.body;

      const dto = new SigninRequestDto(email,password);

      const userRepository = userRepositories;

      const signinUseCase = new SigninUseCase(userRepository);

      try {
        const user = await signinUseCase.execute(dto);
  
        const access_token = generateAccessToken({
          _id: String(user?._id),
          email: user.email,
          role: user.role
        });
        const refresh_token = generateRefreshToken({
          _id: String(user?._id),
          email: user.email,
          role: user.role
        });
  
        res.cookie("access_token", access_token, {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        });
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        });
  
        console.log(user,'sigined');
  
        return res.status(200).json({success: true, message: "successfully logined user", data: user})
        
      } catch (error: any) {

          return res.status(404).json({success: false, message: error.message || "Invalid email or password"});

      }

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR})
    }
  }

  static async getUserData(req: Request, res: Response, next: NextFunction):Promise<any> {
    console.log(req.user,"request user");
    try {
      
      if(!req.user){
        throw new Error("Authentication required: No user found")
      }

      const {_id} = req.user;

      const userRepository = userRepositories

      const getUserUseCase = new GetUserData(userRepository);

      const isUser = await getUserUseCase.execute(_id);

      console.log(isUser)

      if(!isUser){
        return res.status(404).json({
          success: false,
          message: "No user data"
        });
      }

      return res.status(200).json({
        success: true,
        data: isUser,
        message: "gotten userdata successfully"
      })


    } catch (error) {
      console.log("Error while getting user",error)
      next(error)
    }
  }

  static async googleAuthentication(req: Request, res: Response): Promise<any>{

    try {
      
      const { credential} = req.body;

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();

      if(!payload || !payload.email){
        return res.status(404).json({
          success: false,
          message: "Ivalid Google token or No Email address"
        });
      }

      console.log(payload,"payload")

      const findUserByEmailUseCase = await new FindUserByEmailUseCase(userRepositories);

      const existingUser = await findUserByEmailUseCase.execute(payload.email);

      console.log(existingUser,"existingusersrr")

      if(!existingUser){
        const signupData = {
          email: payload.email,
          password: `${generateRandomString()}`,
          userName: payload.given_name
        }

        console.log(signupData,"gsignup")

        return res.status(200).json({
          success: true,
          existingUser: false,
          data: signupData,
          message: "User Google Login"
        })

      } else {

        const access_token = generateAccessToken({
          _id: String(existingUser?._id),
          email: existingUser.email,
          role: existingUser.role
        });
        const refresh_token = generateRefreshToken({
          _id: String(existingUser?._id),
          email: existingUser.email,
          role: existingUser.role
        });
  
        res.cookie("access_token", access_token, {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        });
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        });

        return res.status(200).json({
          success: true,
          existingUser: true,
          data: existingUser,
          message: "Google Login successfully"
        })
      }

    } catch (error) {
      console.log(error,"error while authenticating with google");
      res.status(500).json({
        message: "something happened logging gauth"
      });
    }
  }
}
