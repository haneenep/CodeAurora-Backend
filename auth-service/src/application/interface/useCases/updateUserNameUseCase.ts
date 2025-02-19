import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";



export class UpdateUserProfileUseCase {
    constructor(
        private UserRepository: IUserRepository
    ){}
    async execute(userName: string, email: string): Promise<UserEntity>{
        return await this.UserRepository.updateUserProfile(userName, email)
    }
}