import { Messages } from "../../constants/constantMessages";
import { HttpStatus } from "../../constants/httpStatus";
import { HttpError } from "../../utils/httpError";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode =
    err instanceof HttpError
      ? err.statusCode
      : HttpStatus.INTERNAL_SERVER_ERROR;
  let message = err instanceof HttpError ? err.message : Messages.SERVER_ERROR;

  console.error("unHandled Error:", err);

  res.status(statusCode).json({ error: message });
};

export const invalidRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new HttpError(HttpStatus.NOT_FOUND, Messages.INVALID_REQUEST));
};
