import { resetPasswordPage } from "../utils/resetPasswordPage";
import { sendEmail } from ".././config/nodemailer";
import { OTP } from "../infrastructure/mongoose/model/otpModel";
import generateOtp from "../utils/generateOtp";
import otpPage from "../utils/otpPage";


export class MailService {
    
    static async sendVerificationMail(email: string) {

        try {
            
            const otp = generateOtp();

            await OTP.create({
                email,
                otp
            })

            console.log(otp,"otp");
    
            await sendEmail(email, "CodeAurora - Your OTP for verification", otpPage(otp));

        } catch (error) {

            console.error(error,"some error while sending otp to mail");
                  
        }
    }

    static async sendForgotPasswordMail(email: string,token: string, userName: string) {

        try {

            const subject = "CodeAurora - Password Reset Request"
            const htmlContent = resetPasswordPage(`${process.env.CLIENT_URL}/forgot-password?token=${token}`,userName)

            await sendEmail(email, subject, htmlContent);

        } catch (error) {

            console.error(error,"some error while sending reset link to mail");
                  
        }
    }
}