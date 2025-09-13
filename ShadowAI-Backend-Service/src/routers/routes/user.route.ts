import { Router } from "express";
import { userRouteConfig } from "../../config/api.config";
import { verifyAuthToken } from "../../middlewares/auth.middleware";
import {
  deactivatedUser,
  editUserProfile,
  getUserProfile,
  removeImage,
  uploadPostController,
} from "../../controller/user.controller";
import validateRepeatedToken from "../../middlewares/tokenValidator.middleware";
import upload from "../../config/multer.config";
import verifyDeactivatedAndDeleted from "../../middlewares/status.middleware";

const userRouter = Router();

userRouter.get(
  userRouteConfig["getUserProfile"],
  verifyAuthToken,
  validateRepeatedToken,
  verifyDeactivatedAndDeleted,
  getUserProfile
);

userRouter.post(
  userRouteConfig["uploadImage"],
  verifyAuthToken,
  validateRepeatedToken,
  verifyDeactivatedAndDeleted,
  upload.single("upload"),
  uploadPostController
);

userRouter.patch(
  userRouteConfig["editUserProfile"],
  verifyAuthToken,
  validateRepeatedToken,
  verifyDeactivatedAndDeleted,
  editUserProfile
);

userRouter.patch(
  userRouteConfig["deactivatedUser"],
  verifyAuthToken,
  validateRepeatedToken,
  deactivatedUser
);

userRouter.patch(
  userRouteConfig["removeImage"],
  verifyAuthToken,
  validateRepeatedToken,
  removeImage
);

export default userRouter;
