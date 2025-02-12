import express, { Application } from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import { config } from "dotenv";

config();

const app : Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions: cors.CorsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
}

app.use(cors(corsOptions))

const routes = [
  {
    path: "/auth",
    target: String(process.env.AUTH_SERVICE),
    changeOrigin: true
  }
]

routes.forEach((route) => app.use(route.path, proxy(route.target)));

const PORT : number = Number(process.env.PORT);

app.listen(PORT,() : void =>  {
  console.log(`api-gateway is running on http://localhost${PORT}`)
})