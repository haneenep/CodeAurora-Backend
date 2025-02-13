import { ObjectId } from "mongoose";


export interface OTP {
    _id: ObjectId;
    email: string;
    otp: string;
    createdAt: Date;
}