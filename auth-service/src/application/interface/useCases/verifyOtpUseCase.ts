import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";


export class VerifyOtpUseCase {
    constructor(
        private UserRepository: IUserRepository
    ){}

    async execute(email: string, otp: string): Promise<boolean | null> {

        return await this.UserRepository.verifyOtp(email,otp)
    }
    
}