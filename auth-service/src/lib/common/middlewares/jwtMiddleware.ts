import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { generateAccessToken, verifyToken } from "../../http/jwt/token";
import { ERROR_MESSAGES } from "../../../constants/ErrorResponses";
import { UserPayload } from "../../../types/authTypes";

config();

export const jwtMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { access_token, refresh_token } = req.cookies;

    let user: UserPayload | null = null;

    // Verify access token
    if (access_token) {
      console.log("access token:", access_token);
      user = await verifyToken(access_token, process.env.ACCESS_TOKEN_SECRET!);
      console.log("User from accesstkn", user);
    }

    // If access token is invalid or expired, try refresh token
    if (!user && refresh_token) {
      console.log("refresh token fnd", refresh_token);
      user = await verifyToken(refresh_token, process.env.REFRESH_TOKEN_SECRET!);
      console.log("User from refreshtkn", user);

      if (user) {
        // Generate a new access token
        const newAccessToken = generateAccessToken({
          _id: user._id,
          email: user.email,
          role: user.role,
        });

        // Set the new access token in cookies
        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        console.log("New access token generated:", newAccessToken);
      }
    }

    // If no user is found, return 401
    if (!user) {
      console.log("User is unauthorized");
      res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
      return;
    }

    console.log("User authenticated successfully:", user);
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in JWT middleware:", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};