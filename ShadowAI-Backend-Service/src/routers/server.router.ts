import { Application } from "express";
import { baseApiConfig } from "../config/api.config";
import healthRouter from "./routes/health.route";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import { errorHandler } from "../middlewares/error.middleware";

async function initalizeRoutes(app: Application) {
  app.use(baseApiConfig["base"], [healthRouter, authRouter, userRouter]);
  app.use(errorHandler);
}

export default initalizeRoutes;
