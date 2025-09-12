import { NextFunction, Request, Response } from "express";
import { UnknownAny } from "../types/types";
import shadowAiLogger from "../libs/logger.libs";
import { getUserProfileService, uploadProfileService } from "../services/user/user.service";
import getAPIHelperInstance from "../helper/api.helper";
import mapZodError from "../mapper/zod.mapper";

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
async function uploadPostController(req: Request, res: Response, next: NextFunction) {
  try {
    const apiInstance = getAPIHelperInstance();
    const username =req.user.username 
    const userId= req.user.userId
    const url= req.originalUrl
    const correlation_id= req.correlationId
    const filepath = req.file?.path
    const apiResponse = await uploadProfileService(
      username as string,
      filepath as string,
      userId as string,
      correlation_id as string
    );
    const { data, message } = apiResponse;
    apiInstance.sendSuccessResponse(res,message, data ,url);
  } catch (err: UnknownAny) {
    shadowAiLogger.error(
      `Error While Uploading the Post through the Upload Post Controller`
    );
    next(err);
  }
}

export {getUserProfile,uploadPostController} ;
