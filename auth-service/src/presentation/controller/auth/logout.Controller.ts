import { HttpStatus } from "../../../constants/HttpStatus";
import { NextFunction, Request, Response } from "express";



export class LogoutController {

    static async logout (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const cookieOption: any = {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 0
            };

            res.cookie("access_token","", cookieOption);
            res.cookie("refresh_token","", cookieOption);
            res.status(HttpStatus.NO_CONTENT).json({})
        } catch (error) {
            next(error);
        }
    }
}