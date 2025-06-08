import mongoose from "mongoose";
import { env } from "./env";

export default async () => {

    try {
        
        const mongoUrl = env.MONGO_URI;

        if(!mongoUrl){
            throw new Error("mongodb connection string is not provided in problem service/env");
        }

        await mongoose.connect(mongoUrl);

        console.log("Mongodb connected successfully -----> problem service")

    } catch (error) {
        console.error("Data base connection failed");
        process.exit(1);
    }
}