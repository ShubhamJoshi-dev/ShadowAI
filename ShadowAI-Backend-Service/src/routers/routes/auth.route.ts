import { Router } from "express";
import { authRouteConfig, baseApiConfig } from "../../config/api.config";
import { loginController, logoutController, signupController } from "../../controller/auth.controller";


const authRouter= Router()

authRouter.post(
    baseApiConfig["base"].concat(authRouteConfig["signup"]),
    signupController    
)

authRouter.post(
    baseApiConfig["base"].concat(authRouteConfig["login"]),
    loginController
)

authRouter.post(
    baseApiConfig["base"].concat(authRouteConfig["logout"]),
    logoutController
)

export default authRouter