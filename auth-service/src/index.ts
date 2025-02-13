import express, {Application, json, NextFunction, Request, Response} from 'express';
import database from './infrastructure/config/database';
import userRouter from './presentation/routes/userRoutes';
import { config } from 'dotenv';

config();

class App {

    private readonly app : Application;
    private readonly PORT: number;

    constructor() {
        
        this.app = express();
        this.PORT = Number(process.env.PORT) | 3001;
        
        this.initializeMiddlewears();
        this.initializeRoutes();
        this.initializeDatabase();
        this.initialzieErrorHandling();
    }

    private initializeMiddlewears(): void {
        this.app.use(express.json({ limit: "10mb"}));
        this.app.use(express.urlencoded({extended: true, limit: "10mb"}));
    }

    private initializeRoutes(): void {
        this.app.use('/',userRouter);
    }

    private initializeDatabase(): void {
        database();
    }

    private initialzieErrorHandling(): void {
        this.app.use(
          (err: Error, req: Request, res: Response, next: NextFunction): void => {
            console.error(err);
            res.status(500).json({ error: "internal server Error" });
          }
        );
      }

    public listen(): void {
        this.app.listen(this.PORT,() => {
            console.log(`auth server running on http://localhost:${this.PORT}`)
        })
    }

}

const app = new App();

app.listen();