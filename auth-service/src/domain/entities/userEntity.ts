import { Types } from "mongoose";


export interface UserEntity {
    _id?: Types.ObjectId;
    userName: string;
    email: string;
    password: string;
    role: string;
    profileImage: string;
    isBlocked: boolean;
    github?: string;
    bio?: string;
    isAdmin?: boolean
    createdAt?: Date;
    updatedAt?: Date;
}