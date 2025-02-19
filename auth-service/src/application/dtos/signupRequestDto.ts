export class SignupRequestDto {
  constructor(
    public readonly data: {
      userName: string;
      email: string;
      password: string;
      role: string;
      isAdmin: boolean;
      profileImage: string;
      bio: string;
      isGAuth: boolean;
      isBlocked: boolean;
      status: boolean;
    }
  ) {}
}
