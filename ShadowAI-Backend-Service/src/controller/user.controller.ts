import { NextFunction, Request, Response } from "express";
import { UnknownAny } from "../types/types";
import shadowAiLogger from "../libs/logger.libs";
import { getUserProfileService } from "../services/user/user.service";
import getAPIHelperInstance from "../helper/api.helper";

async function getUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const apiInstance = getAPIHelperInstance();
    const userId = req.user.userId;
    const apiPayload = await getUserProfileService(userId);
    const { data, message } = apiPayload;
    if (!Object.keys(data).includes("x-correlation-id")) {
      data["x-correlation-id"] = req.correlationId;
    }
    apiInstance.sendSuccessResponse(res, message, data, req.originalUrl);
  } catch (err: UnknownAny) {
    shadowAiLogger.error(`Error getting the User Profile , Due To ${err}`);
    next(err);
  }
}

export default getUserProfile;
