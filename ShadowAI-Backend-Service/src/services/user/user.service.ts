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
import filehelperinstance from "../../utils/filestream.helper";
import updateInstance from "../../database/operations/update";

async function getUserProfileService(userId: string): Promise<IAPIResponse> {
  const searchQuery = searchInstance();
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
  Object.assign(newPayload, userDocs.imageId._doc);
  

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
  username:string,
  body:string,
  userID:string
){
  const searchQuery = searchInstance();
  const createQuery= createInstance();
  const updatequery= updateInstance()
  const filehelper= filehelperinstance();
  const searchuser= await searchQuery.search('username',username,userModel)
  
  if(!searchuser){
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
       `The username: ${username} you provided does not  exists on system `
    )
  }
  shadowAiLogger.info(body)
  const givebaseresult= await filehelper.givebase64(body)
  const savetoimage= Object.seal({
    image:givebaseresult
  })

  const savetoimageDatabase= await createQuery.create(savetoimage,imageModel)
  const imageid= savetoimageDatabase._id
  const updatedPayload= Object.seal({
    imageId:imageid
  })
  const updatetouserProfile= await updatequery.updateandreturn('userId',userID,updatedPayload,userProfileModel)
  return{
    data:savetoimageDatabase,
    message:'Image saved to database'
  }
}
export { getUserProfileService,uploadProfileService };
