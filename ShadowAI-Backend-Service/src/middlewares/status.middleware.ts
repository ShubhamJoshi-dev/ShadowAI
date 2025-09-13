import { Request, Response, NextFunction } from "express";
import { UnknownAny } from "../types/types";
import searchInstance from "../database/operations/select";
import userProfileModel from "../database/entities/userProfile.model";
import { DatabaseException } from "../exceptions";
import { HTTP_STATUS } from "../constant/httpStatus.constant";
import shadowAiLogger from "../libs/logger.libs";

async function verifyDeactivatedAndDeleted(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const searchQuery = searchInstance();

    const userId = req.user.userId;

    const userDocuments = await searchQuery.search(
      "userId",
      userId,
      userProfileModel
    );

    const isDeactivatedStatus = userDocuments._doc.isDeactivated;
    const isDeletedStatus = userDocuments._doc.isDeleted;

    switch (true) {
      case isDeactivatedStatus: {
        throw new DatabaseException(
          HTTP_STATUS.DATABASE_ERROR.CODE,
          `The User Has been Deactivated`
        );
      }
      case isDeletedStatus: {
        throw new DatabaseException(
          HTTP_STATUS.DATABASE_ERROR.CODE,
          `The User Has been Deleted`
        );
      }
    }
    shadowAiLogger.info(
      `The User is not Deactivated and Deleted, Processing the Request`
    );
    next();
  } catch (err: UnknownAny) {
    next(err);
  }
}

export default verifyDeactivatedAndDeleted;
