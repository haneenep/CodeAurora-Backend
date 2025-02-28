import { Router } from "express";
import { jwtMiddleWare } from "../../lib/common/middlewares/jwtMiddleware";
import {
  ChangePasswordController,
  ForgotPasswordcontroller,
  GoogleAuthController,
  LogoutController,
  RegisterController,
  ResetPasswordController,
  SigninController,
} from "../controller/auth";
import {
  BlockUserController,
  FindUserByEmailController,
  GetAllUserController,
  GetUserController,
  UpdateUserNameController,
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

userRouter.put("/update-name", UpdateUserNameController.updateUserName);

userRouter.delete("/logout", LogoutController.logout);

userRouter.get("/get-all-users", GetAllUserController.getAllUser);

userRouter.patch("/block-user/:userId", BlockUserController.blockUser);

userRouter.patch("/change-password", ChangePasswordController.changePassword);

export default userRouter;
