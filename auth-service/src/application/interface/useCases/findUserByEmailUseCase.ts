
import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";

export class FindUserByEmailUseCase {
    constructor(
        private UserRepository : IUserRepository
    ) {}
    async execute(email: string): Promise<UserEntity | null>{

        const existingUser = await this.UserRepository.findByEmail(email);

        console.log(existingUser,"existinguser");

        if(existingUser){
            return (existingUser);
        }

        return null;
    }
}