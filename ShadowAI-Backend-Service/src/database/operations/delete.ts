import shadowAiLogger from "../../libs/logger.libs";
import userModel from "../entities/user.model";

class DeleteOperation {
  public async deleteAll(model: any) {
    const deleteResult = await model.deleteMany({});
    return deleteResult;
  }
}

const deleteInstance = () => {
  return new DeleteOperation();
};

export default deleteInstance;
