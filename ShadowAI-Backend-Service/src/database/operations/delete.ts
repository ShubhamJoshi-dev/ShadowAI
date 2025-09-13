import shadowAiLogger from "../../libs/logger.libs";
import imageModel from "../entities/image.model";
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

  public async delete(key: string, value: any, model: any) {
    const deletePayload = await model.deleteOne({
      [`${key}`]: value,
    });
    return deletePayload;
  }
}

const deleteInstance = () => {
  return new DeleteOperation();
};

export default deleteInstance;
