import e, { NextFunction, Request, Response } from "express";
import { UnknownAny } from "../types/types";
import shadowAiLogger from "../libs/logger.libs";
import {
  deactivatedUserService,
  editUserProfileService,
  getUserProfileService,
  removeImageService,
  uploadProfileService,
} from "../services/user/user.service";
import getAPIHelperInstance from "../helper/api.helper";
import mapZodError from "../mapper/zod.mapper";
import userProfileSchema from "../validation/user.validation";
import { IUserProfile } from "../interface/user.interface";
import { ZodError } from "zod";
import StatusCode from "http-status-codes";
import { da } from "zod/v4/locales/index.cjs";

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
async function uploadPostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const apiInstance = getAPIHelperInstance();
    const username = req.user.username;
    const userId = req.user.userId;
    const url = req.originalUrl;
    const correlation_id = req.correlationId;
    const filepath = req.file?.path;
    const apiResponse = await uploadProfileService(
      username as string,
      filepath as string,
      userId as string,
      correlation_id as string
    );
    const { data, message } = apiResponse;
    apiInstance.sendSuccessResponse(res, message, data, url);
  } catch (err: UnknownAny) {
    shadowAiLogger.error(
      `Error While Uploading the Post through the Upload Post Controller`
    );
    next(err);
  }
}

async function editUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiInstance = getAPIHelperInstance();
  try {
    const userId = req.user.userId;
    const baseUrl = req.originalUrl;
    const content = await userProfileSchema.parseAsync(req.body);
    const apiResponse = await editUserProfileService(
      content as Partial<IUserProfile>,
      userId as string
    );
    const { data, message } = apiResponse;
    apiInstance.sendSuccessResponse(res, baseUrl, data, message);
  } catch (err: UnknownAny) {
    if (err instanceof ZodError) {
      const mappedError = mapZodError(err.issues as Array<any>);
      apiInstance.sendErrorResponse(res, mappedError, StatusCode.BAD_REQUEST);
    }
    shadowAiLogger.error(
      `Error while editing the user Profile , Due To : ${JSON.stringify(err)}`
    );
    next(err);
  }
}

async function deactivatedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const apiInstance = getAPIHelperInstance();
    const baseUrl = req.originalUrl;
    const userId = req.user.userId;
    const queryContent = req.query;
    const apiPayload = await deactivatedUserService(userId, queryContent);
    if (apiPayload) {
      const { data, message } = apiPayload;
      apiInstance.sendSuccessResponse(res, baseUrl, data, message);
    }
  } catch (err: UnknownAny) {
    shadowAiLogger.error(
      `Error while deactivating the user profile, Due To : ${JSON.stringify(
        err
      )}`
    );
    next(err);
  }
}

async function removeImage(req: Request, res: Response, next: NextFunction) {
  try {
    const apiInstance = getAPIHelperInstance();
    const baseURL = req.originalUrl;
    const userId = req.user.userId;
    const apiPayload = await removeImageService(userId);
    const { data, message } = apiPayload;
    apiInstance.sendSuccessResponse(res, baseURL, data, message);
  } catch (err: UnknownAny) {
    shadowAiLogger.error(
      `Error while Removing the Image from the User Profile, Due To : ${err}`
    );
    next(err);
  }
}

export {
  getUserProfile,
  uploadPostController,
  editUserProfile,
  deactivatedUser,
  removeImage,
};
