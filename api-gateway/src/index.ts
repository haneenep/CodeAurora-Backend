import express, { Application } from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import { config } from "dotenv";
import { validateEnv } from "./utils/validateEnv";
import { env } from "./utils/configEnv";

config();
validateEnv()

const app : Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  env.FRONTEND_URL
]

const corsOptions: cors.CorsOptions = {
  origin: function(origin, callback) {
    if(allowedOrigins.includes(origin as string)){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true
}

app.use(cors(corsOptions))

const routes = [
  {
    path: "/auth",
    target: env.AUTH_SERVICE,
    changeOrigin: true
  },
  {
    path: "/problem",
    target: env.PROBLEM_SERVICE
  },
    {
    path: "/notification",
    target: env.NOTIFICATION_SERVICE,
  }
]

routes.forEach((route) => app.use(route.path, proxy(route.target)));

const PORT : number = Number(env.PORT);

app.listen(PORT,() : void =>  {
  console.log(`api-gateway is running on http://localhost${PORT}`)
})