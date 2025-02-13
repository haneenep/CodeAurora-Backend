import { UserEntity } from "../entities";


export interface IUserRepository {
    create(data: UserEntity): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
}