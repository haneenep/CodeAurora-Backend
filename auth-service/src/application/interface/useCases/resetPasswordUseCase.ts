import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";



export class ResetPassword {
    constructor(
        private UserRepository: IUserRepository
    ){}
    async execute(email: string, password: string): Promise<UserEntity>{
        return await this.UserRepository.resetPassword(email, password);
    }
}