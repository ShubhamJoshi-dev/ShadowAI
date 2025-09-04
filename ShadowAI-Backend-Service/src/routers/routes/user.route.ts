import { Router } from "express";
import { userRouteConfig } from "../../config/api.config";
import { verifyAuthToken } from "../../middlewares/auth.middleware";
import getUserProfile from "../../controller/user.controller";

const userRouter = Router();

userRouter.get(
  userRouteConfig["getUserProfile"],
  verifyAuthToken,
  getUserProfile
);

export default userRouter;
