import getAPIHelperInstance from "../helper/api.helper";

class BaseController {
  public getAPIInstance() {
    return getAPIHelperInstance();
  }
}

export default BaseController;
