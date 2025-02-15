import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { config } from "dotenv";
import { generateAccessToken } from "@/utils/token";
import { ERROR_MESSAGES } from "@/constants/ErrorResponses";

config();

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

interface UserPayload {
  _id: string;
  email: string;
  role: string;
}

const verifyToken = (token: string, secret: string) => {
  console.log(token, secret, "kk");

  try {
    return jwt.verify(token, secret) as UserPayload;
  } catch (error) {
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      console.error("Error verifying token", error.message);
      return null;
    }
    throw error;
  }
};

export const jwtMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token, refresh_token } = req.cookies;

    let user: UserPayload | null = null;

    if (access_token) {
      user = verifyToken(
        access_token,
        process.env.ACCESS_TOKEN_SECRET as string
      );

      console.log(user);
    }

    if (!user && refresh_token) {
      user = verifyToken(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET as string
      );

      console.log(user, "refreh token");

      if (user) {
        const newAccessToken = generateAccessToken({
          _id: user._id,
          email: user.email,
          role: user.role,
        });

        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
      }
    }

    if (!user) {
      return res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }

    console.log(user, "user after set the jwt");

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in jwt middlewear", error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
