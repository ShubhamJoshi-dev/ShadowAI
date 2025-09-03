import getAPIHelperInstance from "../helper/api.helper";
import getJsonWebTokenInstance from "../helper/jsonwebtoken.helper";

class BaseController {
  public getAPIInstance() {
    return getAPIHelperInstance();
  }

  public getJWTInstance() {
    return getJsonWebTokenInstance();
  }
}

export default BaseController;
