import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { config } from "dotenv";
import { UserPayload } from "@/types/authTypes";


config()

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

export const verifyToken = (token: string, secret: string): UserPayload | null => {
    try {
      return jwt.verify(token, secret) as UserPayload;
    } catch (error) {
      if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError
      ) {
        console.error("Error verifying token:", error.message);
        return null;
      }
      throw error;
    }
  };