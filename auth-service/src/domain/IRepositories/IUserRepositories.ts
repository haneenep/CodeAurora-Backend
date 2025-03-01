import { UserEntity } from "../entities";


export interface IUserRepository {
    create(data: UserEntity): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
    signin(data:{email: string, password: string}): Promise<UserEntity>
    getUserData(_id: string): Promise<UserEntity | null>
    resetPassword(email: string, password: string): Promise<UserEntity>
    editUserProfile(userName: string, email: string, profile: string): Promise<UserEntity>;
    changePassword(email: string, currPassword: string, newPassword: string): Promise<UserEntity>
}