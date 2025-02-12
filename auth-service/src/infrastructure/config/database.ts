import mongoose from "mongoose";
import { config } from "dotenv";
config();

export default async () => {

    try {
        
        const mongoUrl = process.env.MONGO_URI;
    
        if(!mongoUrl){
            throw new Error("mongodb connection string is not provided in env");
        }
    
        await mongoose.connect(mongoUrl);

        console.log("Mongodb connected successfully ----> auth service")

    } catch (error : any) {

        console.error("Database connection failed");
        process.exit(1);
        
    }

}