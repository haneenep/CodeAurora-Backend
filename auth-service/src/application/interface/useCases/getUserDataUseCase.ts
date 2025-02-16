import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";

export class GetUserData{
    constructor(
        private UserRepository: IUserRepository
    ){}
    async execute(_id: string): Promise<UserEntity | null>{
        const isUser = await this.UserRepository.getUserData(_id);

        if(isUser){
            return isUser;
        }

        return null;
    }
}