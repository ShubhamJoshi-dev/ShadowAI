import userModel from "../database/entities/user.model";
import userProfileModel from "../database/entities/userProfile.model";
import imageModel from "../database/entities/image.model";
import tokenModel from "../database/entities/token.model";
import deleteInstance from "../database/operations/delete";
import searchInstance from "../database/operations/select";
import shadowAiLogger from "../libs/logger.libs";
import { UnknownAny } from "../types/types";
import passwordTokenModel from "../database/entities/passwordToken.model";

async function flushAllRecords() {
  try {
    const allModels = [
      userModel,
      userProfileModel,
      imageModel,
      tokenModel,
      passwordTokenModel,
    ];
    const indexModels = [
      "userModel",
      "userProfileModel",
      "imageModel",
      "tokenModel",
      "passwordTokenModel",
    ];
    const deleteModels = deleteInstance();
    const searchModel = searchInstance();

    for (let i = 0; i < allModels.length; i++) {
      const model = allModels[i];
      const isAlreadyFlush = await searchModel.searchAll(model);
      if (Array.isArray(isAlreadyFlush) && isAlreadyFlush.length > 0) {
        shadowAiLogger.info(
          `The ${indexModels[i]} is going to Delete All Record From Database`
        );
        await deleteModels.deleteAll(model);
      } else {
        shadowAiLogger.info(
          `The Model : ${indexModels[i]} Has Already been Flushed`
        );
        continue;
      }
    }
    shadowAiLogger.info(
      `All the Record Has been Deleted For All Model : ${allModels.length}`
    );
  } catch (err: UnknownAny) {
    shadowAiLogger.error(
      `Error Flushing all the record from the Database, Error : ${err}`
    );
    throw err;
  }
}

export default flushAllRecords;
