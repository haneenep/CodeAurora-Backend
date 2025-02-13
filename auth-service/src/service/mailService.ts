import { OTP } from "../infrastructure/mongoose/model/otpModel";
import { sendMail } from "../config/nodemailer";
import generateOtp from "../utils/generateOtp";


export class MailService {
    
    static async sendVerificationMail(email: string) {

        try {
            
            const otp = generateOtp();

            await OTP.create({
                email,
                otp
            })

            console.log(otp,"otp");
    
            await sendMail(email, otp);

        } catch (error) {

            console.error(error);
                  
        }
    }
}