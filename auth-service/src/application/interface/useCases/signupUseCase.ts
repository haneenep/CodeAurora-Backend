
import { SignupRequestDto } from "../../../application/dtos/signupRequestDto";
import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";

export class SignupUserCase {
    constructor(
        private UserRepository : IUserRepository
    ) {}
    async execute(data: SignupRequestDto): Promise<UserEntity | null>{

        const existingUser = await this.UserRepository.findByEmail(data.email);

        if(existingUser){
            throw new Error("This user email is allready registered in db");
        }

        return await this.UserRepository.create(data);
    }
}