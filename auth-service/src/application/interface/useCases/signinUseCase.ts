import { SigninRequestDto } from "@/application/dtos/signinRequestDto";
import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";

export class SigninUseCase {
    constructor(
        private UserRepository: IUserRepository
    ){}
    async execute(data: SigninRequestDto): Promise<UserEntity> {
        return await this.UserRepository.signin(data);
    }
}