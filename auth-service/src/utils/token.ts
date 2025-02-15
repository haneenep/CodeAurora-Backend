import jwt from "jsonwebtoken";
import { config } from "dotenv";


config()

interface UserPayload{
    _id: string;
    email: string;
    role: string;
}

export const generateAccessToken = (payload: UserPayload) => {
    
    const { _id, email, role} = payload;

    const newPayload = {_id, email, role};

    return jwt.sign(
        newPayload,
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1m"}
    );
};

export const generateRefreshToken = (payload: UserPayload) => {
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "15d"}
    );
};