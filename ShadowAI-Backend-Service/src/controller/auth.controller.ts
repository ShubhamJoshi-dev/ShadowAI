import { NextFunction, Request, Response } from "express";
import { ILogin, ISignup } from "../interface/auth.interface";
import { loginSchema, signupSchema } from "../validation/auth.validation";
import { signupService, loginService } from "../services/auth/auth.services";
import getAPIHelperInstance from "../helper/api.helper";
import { UnknownAny } from "../types/types";
import shadowAiLogger from "../libs/logger.libs";

async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const apiInstance = getAPIHelperInstance();
    const url = req.originalUrl;
    const content = req.body as Partial<ISignup>;
    const validcontent = await signupSchema.parseAsync(
      content as Partial<ISignup>
    );
    const sendToService = await signupService(validcontent);
    const { message, data } = sendToService;
    apiInstance.sendSuccessResponse(res, message, data, url);
  } catch (err: UnknownAny) {
    shadowAiLogger.error(`Error in the Signup Controller ${err}`);
    next(err);
  }
}
async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const apiInstance = getAPIHelperInstance();
    const url = req.originalUrl;
    const content = req.body as Partial<ILogin>;
    const validcontent = await loginSchema.parseAsync(content);
    const sendToService = await loginService(validcontent as Required<ILogin>);
    const { message, data } = sendToService;
    apiInstance.sendSuccessResponse(res, message, data, url);
  } catch (err) {
    shadowAiLogger.error(`Error in the Login Controller ${err}`);
    next(err);
  }
}
async function logoutController() {}

export { signupController, loginController, logoutController };
