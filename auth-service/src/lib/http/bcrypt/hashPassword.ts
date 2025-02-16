import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {

    try {
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        if(!hashPassword){
            throw new Error("while hashing some error")
        }

        return hashPassword;

    } catch (error : any) {
        throw new Error(error.message)
    }
}