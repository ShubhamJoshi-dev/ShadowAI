import { Application } from "express";
import { baseApiConfig } from "../config/api.config";
import healthRouter from "./routes/health.route";

async function initalizeRoutes(app: Application) {
  app.use(baseApiConfig["base"], [healthRouter]);
}

export default initalizeRoutes;
