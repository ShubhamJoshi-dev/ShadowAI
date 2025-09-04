import { NextFunction, Request, Response } from "express";
import { UnauthorizedException, ValidationException } from "../exceptions";
import { StatusCodes } from "http-status-codes";
import getJsonWebTokenInstance from "../helper/jsonwebtoken.helper";
import shadowAiLogger from "../libs/logger.libs";
import { checkAndAssign } from "../utils/common.utils";
import { de } from "zod/v4/locales/index.cjs";
import { JwtPayload } from "jsonwebtoken";
import searchInstance from "../database/operations/select";
import tokenModel from "../database/entities/token.model";

declare global {
  namespace Express {
    interface Request {
      correlationId: any;
      user: any;
      token: any;
    }
  }
}
async function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const jwtinstance = getJsonWebTokenInstance();
    const searchquery= searchInstance()
    let token = req.headers["authorization"] ?? req.headers.authorization;
    
    if (!token) {
      throw new UnauthorizedException(
        StatusCodes.UNAUTHORIZED,
        `No token present on headers`
      );
    }

    const hasBearer = token.startsWith("Bearer");
    if (hasBearer) {
      token = token.split(" ")[1] as string;
    }
    
    const decodepayload = await jwtinstance.verifyAccessToken(token);

    const checkEmpty = Object.entries(decodepayload).length > 0;

    if (!checkEmpty) {
      throw new ValidationException(StatusCodes.BAD_REQUEST, `Empty Payload`);
    }
    const correlationId = req.headers["x-correlation-id"];

    if (!correlationId) {
      throw new UnauthorizedException(
        StatusCodes.UNAUTHORIZED,
        `No x-corelation-id present on headers`
      );
    }
    const payloadtocheck= Object.seal({
        token:token,
        user_id:decodepayload.userId,
        x_correlation_id:correlationId
        
    })
    const searchtoken=await searchquery.searchtwo(payloadtocheck,tokenModel)
    shadowAiLogger.info(searchtoken)
    if (searchtoken) {
      throw new ValidationException(StatusCodes.BAD_REQUEST, `You are logged out`);
    }
    checkAndAssign(req, [
      {
        key: "correlationId",
        value: correlationId,
      },
      {
        key: "token",
        value: token,
      },
      {
        key: "user",
        value: decodepayload as any,
      },
    ]);
    

    next();
  } catch (err) {
    next(err);
  }
}
export { verifyAuthToken };
