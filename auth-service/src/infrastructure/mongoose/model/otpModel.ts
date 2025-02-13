import { IOtp } from "@/domain/entities/otpEntity";
import mongoose, { Schema } from "mongoose";

const OTPSchema : Schema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true
        },
        OTP: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            expires: 180,
            default: Date.now
        }
    },
    {
        timestamps : true
    }
)

export const OTP = mongoose.model<IOtp>("otp",OTPSchema);

