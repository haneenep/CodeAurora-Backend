import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";



export class UpdateUserNameUseCase {
    constructor(
        private UserRepository: IUserRepository
    ){}
    async execute(userName: string, email: string): Promise<UserEntity>{
        return await this.UserRepository.updateUserName(userName, email)
    }
}