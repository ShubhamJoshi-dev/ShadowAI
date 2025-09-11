import { Router } from "express";
import { userRouteConfig } from "../../config/api.config";
import { verifyAuthToken } from "../../middlewares/auth.middleware";
import getUserProfile from "../../controller/user.controller";
import validateRepeatedToken from "../../middlewares/tokenValidator.middleware";
import upload from "../../config/multer.config";

const userRouter = Router();

userRouter.get(
  userRouteConfig["getUserProfile"],
  verifyAuthToken,
  validateRepeatedToken,
  getUserProfile
);

userRouter.post(
  userRouteConfig["uploadImage"],
  upload.single("upload"),

)

export default userRouter;
