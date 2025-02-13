
import { SignupRequestDto } from "../../../application/dtos/signupRequestDto";
import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";

export class SignupUserCase {
    constructor(
        private UserRepository : IUserRepository
    ) {}
    async execute(data: SignupRequestDto): Promise<UserEntity | null>{

        return await this.UserRepository.create(data);

    }
}   