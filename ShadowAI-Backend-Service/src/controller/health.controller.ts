import { NextFunction, Request, Response } from "express";
import { UnknownAny } from "../types/types";
import { getHealthService } from "../services/health/health.services";
import shadowAiLogger from "../libs/logger.libs";
import BaseController from "./base.controller";

const baseInstance = new BaseController();

async function getHealthController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiInstance = baseInstance.getAPIInstance();
  const apiUrl = req.originalUrl;
  try {
    const { data, message } = await getHealthService();
    apiInstance.sendSuccessResponse(res, apiUrl, data, message);
  } catch (err: UnknownAny) {
    shadowAiLogger.error(
      `Error in the Getting Health Controller, Due To : ${JSON.stringify(err)}`
    );
    next(err);
  }
}

export { getHealthController };
