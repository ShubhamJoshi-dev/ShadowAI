import { NextFunction, Request, Response } from "express";
import { UnknownAny } from "../types/types";
import { BadRequestException, DatabaseException } from "../exceptions";
import StatusCode from "http-status-codes";
import searchInstance from "../database/operations/select";
import tokenModel from "../database/entities/token.model";
import shadowAiLogger from "../libs/logger.libs";

async function validateRepeatedToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const searchModel = searchInstance();
    const token = req.headers['authorization'];

    const isTokenAvailable = await searchModel.search(
      "accessToken",
      token,
      tokenModel
    );

    if (isTokenAvailable) {
      throw new DatabaseException(
        StatusCode.CONTINUE,
        `The Token is Already Logout, Regenerating new Access Token`
      );
    }

    shadowAiLogger.info(`Token Validation Completed`);
    next();
  } catch (err: UnknownAny) {
    next(err);
  }
}

export default validateRepeatedToken;
