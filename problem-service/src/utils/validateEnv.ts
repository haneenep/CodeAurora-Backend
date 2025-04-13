import { env } from "../infrastructure/config"


export const validateEnv = () => {
    if(!env.PORT){
        throw new Error("PORT is not provided in the env")
    }
    if(!env.MONGO_URI){
        throw new Error("MONGO_URI is not provided in the env")
    }
    if(!env.GEMINI_API_KEY){
        throw new Error("GEMINI_API_KEY is not provided in the env")
    }
}