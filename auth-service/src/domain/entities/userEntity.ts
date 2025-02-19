import { Types } from "mongoose";


export interface UserEntity {
    _id?: Types.ObjectId;
    userName: string;
    email: string;
    password: string;
    role?: string;
    isAdmin?: boolean;
    profileImage?: string;
    bio?: string;
    isGAuth?: boolean;
    isBlocked?: boolean;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}