import { Router } from "express";
import { userRouteConfig } from "../../config/api.config";
import { verifyAuthToken } from "../../middlewares/auth.middleware";
import getUserProfile from "../../controller/user.controller";
import validateRepeatedToken from "../../middlewares/tokenValidator.middleware";

const userRouter = Router();

userRouter.get(
  userRouteConfig["getUserProfile"],
  verifyAuthToken,
  validateRepeatedToken,
  getUserProfile
);

export default userRouter;
