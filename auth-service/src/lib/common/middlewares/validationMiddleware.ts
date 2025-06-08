import Joi from "joi";
import { HttpStatus } from "../../../constants/HttpStatus";
import { NextFunction, Request, Response } from "express";


export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {

        const {error} = schema.validate(req.body, {abortEarly: false});

        if(error){
            console.log("validation errrrorrrr")
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: "validation failed",
                errors: error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message
                }))
            })
            return;
        }

        next()
    }
}