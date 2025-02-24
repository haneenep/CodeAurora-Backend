import { HttpStatus } from "../../../constants/HttpStatus";
import userModel from "../../../infrastructure/mongoose/model/userModel";
import { NextFunction, Request, Response } from "express";

export class BlockUserController {
  static async blockUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.params, req.body);
    const { userId } = req.params;

    const { isBlocked } = req.body;

    try {
      const result = await userModel.findByIdAndUpdate(
        userId,
        { isBlocked },
        { new: true }
      );

      if (!result) {
        res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: "Failed to block user",
        });
        return;
      }

      console.log(result,"blocked")
      
      res.status(HttpStatus.OK).json({
        success: true,
        message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
