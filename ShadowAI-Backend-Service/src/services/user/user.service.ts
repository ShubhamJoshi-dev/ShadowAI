import searchInstance from "../../database/operations/select";
import userModel from "../../database/entities/user.model";
import { DatabaseException } from "../../exceptions";
import { HTTP_STATUS } from "../../constant/httpStatus.constant";
import { IAPIResponse } from "../../interface/api.interface";
import { excludeObjectKey } from "../../utils/common.utils";
import userProfileModel from "../../database/entities/userProfile.model";
import shadowAiLogger from "../../libs/logger.libs";
import { StatusCodes } from "http-status-codes";
import createInstance from "../../database/operations/create";
import imageModel from "../../database/entities/image.model";
import filehelperinstance from "../../helper/filestream.helper";
import updateInstance from "../../database/operations/update";
import cryptohelper from "../../helper/crypto.helper";
import { IUserProfile } from "../../interface/user.interface";

async function getUserProfileService(userId: string): Promise<IAPIResponse> {
  const searchQuery = searchInstance();
  const imageCrypto = cryptohelper();
  const userDocs = await searchQuery.searchPopulateTwo(
    "userId",
    userId,
    userProfileModel,
    "userId",
    "imageId"
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

  const userImageDocs = userDocs.imageId._doc;

  const decodedImage64 = await imageCrypto.decryptKeys(
    userImageDocs.image,
    userImageDocs.ImageKey,
    userImageDocs.imageIv
  );
  Object.assign(newPayload, {
    image: decodedImage64,
  });

  if ("userId" in newPayload) {
    shadowAiLogger.info("Deleting the User ID From the Profile Service");
    delete newPayload["userId"];
  }
  if ("imageId" in newPayload) {
    shadowAiLogger.info("Deleting the Image ID From the Profile Service");
    delete newPayload["imageId"];
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
async function uploadProfileService(
  username: string,
  body: string,
  userID: string,
  correlation_id: string
) {
  const searchQuery = searchInstance();
  const createQuery = createInstance();
  const updatequery = updateInstance();
  const imageCryptoInstance = cryptohelper();
  const filehelper = filehelperinstance();
  const searchuser = await searchQuery.search("username", username, userModel);

  if (!searchuser) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `The username: ${username} you provided does not  exists on system `
    );
  }

  const givebaseresult = await filehelper.givebase64(body);

  const { iv, key, text } = await imageCryptoInstance.encryptKeys(
    givebaseresult
  );

  const savetoimage = Object.seal({
    image: text,
    imageIv: iv,
    ImageKey: key,
  });

  const savetoimageDatabase = await createQuery.create(savetoimage, imageModel);

  const imageid = savetoimageDatabase._id;

  const updatedPayload = Object.seal({
    imageId: imageid,
  });
  await updatequery.updateandreturn(
    "userId",
    userID,
    updatedPayload,
    userProfileModel
  );
  Object.assign(savetoimageDatabase._doc, {
    "x-correlation-id": correlation_id,
  });
  return {
    data: {
      image: savetoimageDatabase._doc.image,
      imageKeyIv: `${savetoimageDatabase._doc.ImageKey} + ${savetoimageDatabase._doc.imageIv}`,
    },
    message: "Image saved to database",
  };
}

async function editUserProfileService(
  content: Partial<IUserProfile>,
  userId: string
): Promise<IAPIResponse> {
  const searchQuery = searchInstance();
  const createQuery = createInstance();

  const deepCopyProfilePayload = JSON.parse(JSON.stringify(content));

  const userDocs = await searchQuery.search("userId", userId, userProfileModel);

  if (!userDocs) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The User is not Linked With any User Profile Model`
    );
  }

  console.log(userDocs);

  return {
    data: "",
    message: " ",
  };
}

export { getUserProfileService, uploadProfileService, editUserProfileService };
