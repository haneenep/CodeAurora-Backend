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
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String
        },
        isAdmin: {
            type: Boolean
        },
        profileImage: {
            type: String
        },
        bio: {
            type: String
        },
        github: {
            type: String
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        },
        status: {
            type: String,
            required: true,
            enum: ["active","blocked"],
            default: "active"
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

export default mongoose.model<UserEntity>("Users",UserSchema)