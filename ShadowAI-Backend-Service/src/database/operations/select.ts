class SearchOpertaion {
  public async search<T>(key: string, value: T, model: any) {
    const result = await model.findOne({
      [`${key}`]: value,
    });
    return result;
  }
  public async searchtwo<T>(payload:object, model: any) {
    const result = await model.findOne({
      ...payload
    });
    return result;
  }
  
}

const searchInstance = () => {
  return new SearchOpertaion();
};
export default searchInstance;
