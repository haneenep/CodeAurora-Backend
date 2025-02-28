import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";



export class ChangePasswordUseCase{
    constructor(private UserRepository: IUserRepository){}
    async execute(email: string, currPassword: string, newPassword: string): Promise<UserEntity>{

        return await this.UserRepository.changePassword(email, currPassword, newPassword);
    }
}