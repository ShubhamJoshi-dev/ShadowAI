import StatusCode from "http-status-codes";
import { Response } from "express";
import shadowAiLogger from "../libs/logger.libs";
import { da } from "zod/v4/locales/index.cjs";
import { excludeObjectKey } from "../utils/common.utils";

class APIHelper {
  public async sendSuccessResponse<T>(
    res: Response,
    baseUrl: string,
    data: T,
    message: string,
    statusCode = StatusCode.ACCEPTED
  ) {
    shadowAiLogger.info(
      `Sending the Success Resposne to the API Endpoints: ${baseUrl} with the StatusCode: ${statusCode}`
    );
    if (typeof data === "object" && data && "x-correlation-id" in data) {
      return res.status(statusCode).json({
        message,
        [`x-correlation-id`]: data["x-correlation-id"],
        data: excludeObjectKey(data, ["x-correlation-id", "_id"]),
        statusCode,
        error: false,
      });
    } else {
      return res.status(statusCode).json({
        message,
        data,
        statusCode,
        error: false,
      });
    }
  }
}

const getAPIHelperInstance = (): APIHelper => {
  return new APIHelper();
};

export default getAPIHelperInstance;
