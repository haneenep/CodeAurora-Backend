import { UserEntity } from "@/domain/entities";
import mongoose, { Schema } from "mongoose";


const UserSchema : Schema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user","admin"],
            default: "user"
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profileImage: {
            type: String
        },
        bio: {
            type: String
        },
        isGAuth: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        },
        status: {
            type: Boolean,
            required: true,
            default: true
        },
        subscriptionType: {
            type: String,
            required: true,
            enum: ["free","premium"],
            default: "free"
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<UserEntity>("User",UserSchema)