import { UserEntity } from "@/domain/entities";
import UserModel from "../model/userModel";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";


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
}

export default new UserRepository();