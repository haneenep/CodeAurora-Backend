import { UserEntity } from "@/domain/entities";
import UserModel from "../model/userModel";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";
import { OTP } from "../model/otpModel";
import { comparePassword } from "../../../lib/http/bcrypt/comparePassword";


class UserRepository implements IUserRepository {

    async create(data: UserEntity): Promise<UserEntity | null> {

        try {
            
            const createUser = await UserModel.create(data);

            return createUser;

        } catch (error) {
            
            console.error(error);
            throw new Error("Error Creating User")
            
        }

    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        
        try {
            
            const user = await UserModel.findOne({ email });

            return user;
            
        } catch (error) {
            
            console.error(error);
            throw new Error("Error while Find User in this email ");
            
        }
    }

    async verifyOtp(email: string, otp: string): Promise<boolean | any> {
        
        try {
            
            const verifyOtp = await OTP.findOne({email,otp});

            console.log(verifyOtp,"verifyotp")

            if(!verifyOtp){
                return false;
            }

            return true;

        } catch (error) {
            
        }
    }

    async signin(data:{email: string, password: string}): Promise<UserEntity> {
        try {
            const user = await UserModel.findOne({email: data.email});

            if(!user){
                throw new Error("User not find in db");
            }

            const isMatch = await comparePassword(data.password, user.password);

            if(!isMatch){
                throw new Error("Password is not matching");
            }

            return user;

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default new UserRepository();