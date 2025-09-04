import { Router } from "express";
import { authRouteConfig, baseApiConfig } from "../../config/api.config";
import {
  loginController,
  logoutController,
  signupController,
} from "../../controller/auth.controller";
import { verify } from "jsonwebtoken";
import { verifyAuthToken } from "../../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post(authRouteConfig["signup"], signupController);

authRouter.post(authRouteConfig["login"], loginController);

authRouter.post(authRouteConfig["logout"],verifyAuthToken, logoutController);

export default authRouter;
