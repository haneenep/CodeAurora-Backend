import { OTP as OtpEntity } from "@/domain/entities/otpEntity";
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
            expires: "3min",
            default: Date.now
        }
    },
    {
        timestamps : true
    }
)

export const OTP = mongoose.model<OtpEntity>("otp",OTPSchema);

