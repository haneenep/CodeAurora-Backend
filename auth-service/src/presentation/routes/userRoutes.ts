import {Router} from "express"
import { UserController } from "../controller/userController";

const userRouter = Router();

const userController = new UserController();


userRouter.post('/signup',UserController.register.bind(userController));

userRouter.get('/find-email/:id',UserController.findingUserEmail.bind(userController));

userRouter.post('/email-verification',UserController.SendVerificationEmail.bind(userController));

userRouter.post('/verify-otp',UserController.OtpVerification.bind(userController));

export default userRouter;