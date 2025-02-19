import { HttpStatus } from "../../../constants/HttpStatus";
import { VerifyOtpUseCase } from "../../../application/interface/useCases";
import userRepositories from "../../../infrastructure/mongoose/repositories/userRepositories";
import { Request, Response } from "express";

export class VerfiyingOtpController {
  static async OtpVerification(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      const { email, otp } = req.body;

      const verifyingUserOtp = new VerifyOtpUseCase(userRepositories);

      const isVerified = await verifyingUserOtp.execute(email, otp);

      if (!isVerified) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ success: false, message: "Invalid or expired otp" });
        return;
      }

      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "otp verified successfully" });
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
