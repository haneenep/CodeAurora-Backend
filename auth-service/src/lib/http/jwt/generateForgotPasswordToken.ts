import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

export const generateForgotPasswordToken = (payload: {email: string}): string => {

    const secret = process.env.FORGOT_PASSWORD_SECRET;

    if(!secret){
        throw new Error("There is no FORGOT_PASSWORD_SECRET in environement varible");
    }

    try {
        
        return jwt.sign(
            payload, secret, {
                expiresIn: "15m"
            }
        );
    } catch (error) {
        console.error(error,"error generating forgotpassword token");;
        throw new Error("Error generating forgot password token")
        
    }
}