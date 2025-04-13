import express, {Application} from "express";
import morgan from "morgan";
import path from "path"

import { errorHandler, invalidRouteHandler } from "./infrastructure/middlewares/errorHandler";

import db from "./infrastructure/config/db";
import { validateEnv } from "./utils/validateEnv";
import { env } from "./infrastructure/config";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, '../.env') });

//* importing routes
import problemRouter from "./presentation/routes/problem.routes";

class App {
    private readonly app: Application;

    constructor(){

        this.app = express();
        validateEnv()

        this.initializeMiddlewears();
        this.initializeRoutes();
        this.initializeDataBase();
        this.initializeErrorHandling();
    }

    private initializeMiddlewears(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(morgan('combined'));
    }

    private initializeDataBase(): void {
        db()
    }
    
    private initializeRoutes(): void {
        this.app.use('/', problemRouter);
    }

    private initializeErrorHandling(): void {
        // handles invalid req
        this.app.use(invalidRouteHandler);
        // global error handler
        this.app.use(errorHandler);
    }

    public listen(): void {
        this.app.listen(env.PORT,() => {
            console.log(`problem server running on http://localhost:${env.PORT}`)
        })
    }
}

const app = new App();

app.listen()