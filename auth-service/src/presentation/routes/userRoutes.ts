import {Router} from "express"
import { UserController } from "../controller/userController";
import { jwtMiddleWare } from "../../lib/common/middlewares/jwtMiddleware";

const userRouter = Router();

// const userController = new UserController();


userRouter.post('/signup',UserController.register);

userRouter.get('/find-email/:id',UserController.findingUserEmail);

userRouter.post('/email-verification',UserController.SendVerificationEmail);

userRouter.post('/verify-otp',UserController.OtpVerification);

userRouter.post('/signin', UserController.signin);

userRouter.get('/get-userdata',jwtMiddleWare,UserController.getUserData)

export default userRouter;