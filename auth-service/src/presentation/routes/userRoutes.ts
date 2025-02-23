import { Router } from "express";
import { jwtMiddleWare } from "../../lib/common/middlewares/jwtMiddleware";
import {
  ForgotPasswordcontroller,
  GoogleAuthController,
  LogoutController,
  RegisterController,
  ResetPasswordController,
  SigninController,
} from "../controller/auth";
import {
  FindUserByEmailController,
  GetAllUserController,
  GetUserController,
  UpdateUserProfileController,
} from "../controller/user";
import {
  SendOtpMailController,
  VerfiyingOtpController,
} from "../controller/otp";


const userRouter = Router();


userRouter.post("/signup", RegisterController.register);

userRouter.get(
  "/find-email/:email",
  FindUserByEmailController.findingUserByEmail
);

userRouter.post(
  "/email-verification",
  SendOtpMailController.SendOTPVerificationEmail
);

userRouter.post("/verify-otp", VerfiyingOtpController.OtpVerification);

userRouter.post("/signin", SigninController.signin);

userRouter.get("/get-userdata", jwtMiddleWare, GetUserController.getUserData);

userRouter.post("/google-auth", GoogleAuthController.googleAuthentication);

userRouter.post(
  "/forgot-password-mail",
  ForgotPasswordcontroller.forgotPasswordMail
);

userRouter.post("/reset-password", ResetPasswordController.resetPassword);

userRouter.put("/user-profile", UpdateUserProfileController.updateUserProfile);

userRouter.delete('/logout', LogoutController.logout);

userRouter.get('/get-all-users', GetAllUserController.getAllUser);

export default userRouter;
