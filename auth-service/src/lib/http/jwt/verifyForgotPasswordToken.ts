import jwt from "jsonwebtoken";

export const verifyForgotPasswordToken = async (token: string) => {

    const secret = process.env.FORGOT_PASSWORD_SECRET;

    if(!secret){
        throw new Error("There is no FORGOT_PASSWORD_SECRET in environment varible");
    };

    try {
        
        const decoded = await jwt.verify(
            token, secret
        );

        return decoded;

    } catch (error: any) {
        throw new Error("Invalid or expired token")
    }
}