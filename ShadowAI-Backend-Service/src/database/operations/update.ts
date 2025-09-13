import userProfileModel from "../entities/userProfile.model";

class UpdateOperation {
  public async updateOperation<T>(
    key: string,
    value: T,
    updatePayload: object,
    model: any
  ) {
    const updateResult = await model.updateOne(
      {
        [`${key}`]: value,
      },
      {
        ...updatePayload,
      }
    );
    return updateResult;
  }
  public async updateandreturn<T>(
    key: string,
    value: T,
    updatedPayload: object,
    model: any
  ) {
    const updatedResult = await model.findOneAndUpdate(
      {
        [`${key}`]: value,
      },

      { ...updatedPayload },
      { new: true },
      { returnDocument: "after" }
    );
    return updatedResult;
  }
}

const updateInstance = () => {
  return new UpdateOperation();
};
export default updateInstance;
