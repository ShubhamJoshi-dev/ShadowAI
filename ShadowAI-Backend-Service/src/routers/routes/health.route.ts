import { Router } from "express";
import { healthApiConfig } from "../../config/api.config";
import { getHealthController } from "../../controller/health.controller";

const healthRouter = Router();

healthRouter.get(healthApiConfig["getHealth"], getHealthController);

export default healthRouter;
