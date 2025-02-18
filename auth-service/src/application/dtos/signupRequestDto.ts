
export class SignupRequestDto {
    
    constructor(
        public userName: string,
        public email: string,
        public password: string,
        public role: string,
        public profileImage: string,
        public isBlocked: boolean,
        public bio: string,
        public isAdmin: boolean,
        public isGAuth: boolean
    ){}
}