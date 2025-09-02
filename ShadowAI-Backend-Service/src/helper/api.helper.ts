import StatusCode from "http-status-codes";
import { Response } from "express";
import shadowAiLogger from "../libs/logger.libs";

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
    return res.status(statusCode).json({
      message,
      data,
      statusCode,
      error: false,
    });
  }
}

const getAPIHelperInstance = (): APIHelper => {
  return new APIHelper();
};

export default getAPIHelperInstance;
