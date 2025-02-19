import { Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../http/jwt/token";
import { UserEntity } from "@/domain/entities";

export class AuthHelper {
  static setAuthCookies(
    res: Response,
    user: UserEntity
  ): void {
    const accessToken = generateAccessToken({
      _id: String(user._id),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      _id: String(user._id),
      email: user.email,
      role: user.role,
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
}
