import searchInstance from "../../database/operations/select";
import userModel from "../../database/entities/user.model";
import { DatabaseException } from "../../exceptions";
import { HTTP_STATUS } from "../../constant/httpStatus.constant";
import { IAPIResponse } from "../../interface/api.interface";
import { excludeObjectKey } from "../../utils/common.utils";
import userProfileModel from "../../database/entities/userProfile.model";
import shadowAiLogger from "../../libs/logger.libs";

async function getUserProfileService(userId: string): Promise<IAPIResponse> {
  const searchQuery = searchInstance();
  const userDocs = await searchQuery.searchPopulate(
    "userId",
    userId,
    userProfileModel,
    "userId"
  );
  if (!userDocs) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The User Does not Exists on the System`
    );
  }
  const newPayload = {};
  Object.assign(newPayload, userDocs._doc);
  Object.assign(newPayload, userDocs._doc.userId._doc);

  if ("userId" in newPayload) {
    shadowAiLogger.info("Deleting the User ID From the Profile Service");
    delete newPayload["userId"];
  }

  return {
    data: excludeObjectKey(newPayload, [
      "password",
      "passHashKey",
      "passIv",
      "createdAt",
      "updatedAt",
      "__v",
    ]),
    message: `The User Data Fetch Successfully`,
  };
}

export { getUserProfileService };
