import { HttpStatus } from "../../../constants/HttpStatus";
import { MailService } from "../../../service/mailService";
import { Request, Response } from "express";


export class SendOtpMailController {
    static async SendOTPVerificationEmail(req: Request, res: Response) {
        try {
          console.log(req.body, "body");
    
          const { email } = req.body;
    
          await MailService.sendVerificationMail(email);
    
          res.status(HttpStatus.CREATED).json({ success: true, message: "OTP send successfully" });
        } catch (error: any) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
        }
      }
}