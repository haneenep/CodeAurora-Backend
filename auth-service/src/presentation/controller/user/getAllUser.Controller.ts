import { HttpStatus } from "../../../constants/HttpStatus";
import { NextFunction, Request, Response } from "express";
import userModel from "../../../infrastructure/mongoose/model/userModel";

export class GetAllUserController {
  static async getAllUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log("getalllusersss", req.query);
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const search = req.query.search as string;

      const skip = (page - 1) * limit;

      const query: any = { role: "user" };

      if(search){
        query.$or = [
            {userName: {$regex: search, $options: "i"}},
            {email: {$regex: search, $options: "i"}}
        ];
      };

      console.log(query,"query")

      const totalUsers = await userModel.countDocuments(query);

      const totalPages = Math.ceil(totalUsers / limit);

      const result = await userModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .select("-password")
        .lean();

      console.log(result);

      res.status(HttpStatus.OK).json({
        success: true,
        data: result,
        totalPages,
        total: totalUsers,
        message: "successfully fetched all users",
      });
    } catch (error) {
      next(error);
    }
  }
}
