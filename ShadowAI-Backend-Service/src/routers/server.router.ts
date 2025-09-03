import { Application } from "express";
import { baseApiConfig } from "../config/api.config";
import healthRouter from "./routes/health.route";
import authRouter from "./routes/auth.route";

async function initalizeRoutes(app: Application) {
  app.use(baseApiConfig["base"], [healthRouter]);
  app.use(baseApiConfig["base"], [authRouter]);
}

export default initalizeRoutes;
