import nodemailer from "nodemailer"
import { config } from "dotenv"
import otpPage from "../utils/otpPage";

config();


export const sendMail = async (receiverEmail: string, OTP: string) => {

    // mail transporter create
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    transporter.verify((err) => {
        if(err){
            throw new Error
        } else {
            console.log("Mail is working successfully")
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: receiverEmail,
        subject: `CodeAurora - a problem solving platform`,
        html: otpPage(OTP)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email was sent to ${receiverEmail}: ${info.messageId}`);
}