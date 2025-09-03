import { Router } from "express";
import { authRouteConfig, baseApiConfig } from "../../config/api.config";
import {
  loginController,
  logoutController,
  signupController,
} from "../../controller/auth.controller";

const authRouter = Router();

authRouter.post(authRouteConfig["signup"], signupController);

authRouter.post(authRouteConfig["login"], loginController);

authRouter.post(authRouteConfig["logout"], logoutController);

export default authRouter;
