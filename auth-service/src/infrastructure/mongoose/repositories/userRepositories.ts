import { UserEntity } from "@/domain/entities";
import UserModel from "../model/userModel";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";
import { OTP } from "../model/otpModel";
import { comparePassword } from "../../../lib/http/bcrypt/comparePassword";
import { hashPassword } from "../../../lib/http/bcrypt/hashPassword";


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
            throw new Error("Error Finding User by email ");
            
        }
    }

    async verifyOtp(email: string, otp: string): Promise<boolean | any> {
        
        try {
            
            const verifyOtp = await OTP.findOne({email,otp});

            console.log(verifyOtp,"verifyotp")

            if(!verifyOtp){
                return false;
            }

            await OTP.deleteOne({ email, otp })

            return true;

        } catch (error: any) {
            throw new Error("error veryfying otp:" +error.message)
        }
    }

    async signin(data:{email: string, password: string}): Promise<UserEntity> {
        try {
            const user = await UserModel.findOne({email: data.email});

            if(!user){
                throw new Error("User not found");
            }

            const isMatch = await comparePassword(data.password, user.password);

            if(!isMatch){
                throw new Error("Incorrect Password");
            }

            return user;

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getUserData(_id: string): Promise<UserEntity | null> {
        try {
            
            const user = await UserModel.findById(_id);

            if(!user){
                return null;
            }

            return user;

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

     async resetPassword(email: string, password: string): Promise<UserEntity> {
         try {
            
            const isUpdatePassword = await UserModel.findOneAndUpdate(
                {email},
                {password},
                {new: true}
            )

            if(!isUpdatePassword){
                throw new Error("password updation failed")
            }

            return isUpdatePassword;

         } catch (error: any) {
            throw new Error(error.message)
         }
     }

     async updateUserName(userName: string, email: string): Promise<UserEntity> {
         try {
            
            const updateName = await UserModel.findOneAndUpdate(
                {email},
                {userName},
                {new: true}
            );

            if(!updateName){
                throw new Error("username updation failed");
            }

            return updateName;

         } catch (error: any) {
            throw new Error(error.message)
         }
     }

     async changePassword(email: string, currPassword: string, newPassword: string): Promise<UserEntity> {
        try {

            const user = await UserModel.findOne({email});

            if(!user){
                throw new Error("user not found in db");
            }
            
            const isMatch = await comparePassword(currPassword, user?.password);

            if(!isMatch){
                throw new Error("users current password is not matching")
            };

            const hashedPassword = await hashPassword(newPassword);

            const updatePassword = await UserModel.findOneAndUpdate(
                {email},
                {password: hashedPassword},
                {new: true}
            );

            if(!updatePassword){
                throw new Error("user password updation failed");
            };

            return updatePassword;

        } catch (error: any) {
            throw new Error(error.message)
        }
     }
}

export default new UserRepository();