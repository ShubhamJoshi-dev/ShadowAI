import shadowAiLogger from "../../libs/logger.libs";
import userModel from "../entities/user.model";

class DeleteOperation {
  public async deleteAll(model: any) {
    const deleteResult = await model.deleteMany({});
    return deleteResult;
  }

  public async deleteUserAndUserProfile(
    userId: string,
    userModel: any,
    userProfileModel: any
  ) {
    const isPromiseDeletd = await Promise.allSettled([
      userModel.deleteOne({
        _id: userId,
      }),
      userProfileModel.deleteOne({
        userId: userId,
      }),
    ]);
    return isPromiseDeletd;
  }
}

const deleteInstance = () => {
  return new DeleteOperation();
};

export default deleteInstance;
