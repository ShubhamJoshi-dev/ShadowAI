import searchInstance from "../../database/operations/select";
import userModel from "../../database/entities/user.model";
import { DatabaseException } from "../../exceptions";
import { HTTP_STATUS } from "../../constant/httpStatus.constant";
import { IAPIResponse } from "../../interface/api.interface";
import { excludeObjectKey } from "../../utils/common.utils";

async function getUserProfileService(userId: string): Promise<IAPIResponse> {
  const searchQuery = searchInstance();
  const userDocs = await searchQuery.search("_id", userId, userModel);
  if (!userDocs) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The User Does not Exists on the System`
    );
  }
  return {
    data: excludeObjectKey(userDocs._doc, [
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
