import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";



export class EditUserProfileUseCase {
    constructor(
        private UserRepository: IUserRepository
    ){}
    async execute(userName: string, email: string, profile: string): Promise<UserEntity>{
        return await this.UserRepository.editUserProfile(userName, email, profile)
    }
}