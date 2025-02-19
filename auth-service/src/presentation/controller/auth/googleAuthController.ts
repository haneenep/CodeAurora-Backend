import { FindUserByEmailUseCase } from "../../../application/interface/useCases";
import { HttpStatus } from "../../../constants/HttpStatus";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { generateRandomString } from "../../../lib/utils/generateRandomString";
import { AuthHelper } from "../../../lib/utils/authHelpers";




export class GoogleAuthController {
    private static readonly client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    static async googleAuthentication(req: Request, res: Response): Promise<void> {
        try {
          const { credential } = req.body;
    
          const ticket = await this.client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
          });
    
          const payload = ticket.getPayload();
    
          if (!payload || !payload.email) {
            res.status(HttpStatus.NOT_FOUND).json({
              success: false,
              message: "Ivalid Google token or No Email address",
            });
            return;
          }
    
          console.log(payload, "payload");
    
          const findUserByEmailUseCase = new FindUserByEmailUseCase(
            userRepositories
          );
    
          const existingUser = await findUserByEmailUseCase.execute(payload.email);
    
          if (!existingUser) {
            const signupData = {
              email: payload.email,
              password: `${generateRandomString()}`,
              userName: payload.given_name,
            };
    
            console.log(signupData, "gsignup");
    
            res.status(HttpStatus.CREATED).json({
              success: true,
              existingUser: false,
              data: signupData,
              message: "User Google Login",
            });
            return;
          }
            
            AuthHelper.setAuthCookies(res, existingUser)
    
            res.status(HttpStatus.OK).json({
              success: true,
              existingUser: true,
              data: existingUser,
              message: "Google Login successfully",
            });

        } catch (error) {
          console.log(error, "error while authenticating with google");
          res.status(500).json({
            message: "something happened logging gauth",
          });
        }
      }
}