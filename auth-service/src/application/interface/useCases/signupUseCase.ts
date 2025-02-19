import { SignupRequestDto } from "../../../application/dtos/signupRequestDto";
import { UserEntity } from "@/domain/entities";
import { IUserRepository } from "@/domain/IRepositories/IUserRepositories";
import { hashPassword } from "../../../lib/http/bcrypt/hashPassword";

export class SignupUserCase {
  constructor(private UserRepository: IUserRepository) {}
  
  async execute(signupDto: SignupRequestDto): Promise<UserEntity | null> {
    const { data } = signupDto;

    const hashedPassword = await hashPassword(data.password);

    const userData = { ...data, password: hashedPassword, role: "user" };

    return await this.UserRepository.create(userData);
  }
}
