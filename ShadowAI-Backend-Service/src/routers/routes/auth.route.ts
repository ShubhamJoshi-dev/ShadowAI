import { Router } from "express";
import { authRouteConfig, baseApiConfig } from "../../config/api.config";
import {
  forgetPassword,
  loginController,
  logoutController,
  resetPassword,
  signupController,
  updatePasswordController,
} from "../../controller/auth.controller";
import { verifyAuthToken } from "../../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post(authRouteConfig["signup"], signupController);

authRouter.post(authRouteConfig["login"], loginController);

authRouter.post(authRouteConfig["logout"], verifyAuthToken, logoutController);

authRouter.post(authRouteConfig["forgetPassword"], forgetPassword);

authRouter.post(authRouteConfig["resetPassword"].concat("/:id"), resetPassword);

authRouter.post(
  authRouteConfig["updatePassword"],
  verifyAuthToken,
  updatePasswordController
);

export default authRouter;
