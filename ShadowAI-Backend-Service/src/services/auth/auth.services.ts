import { StatusCodes } from "http-status-codes";
import {
  BadRequestException,
  DatabaseException,
  ValidationException,
} from "../../exceptions";
import {
  IForgetPassword,
  ILogin,
  IResetPassword,
  ISignup,
  IUpdatePassword,
} from "../../interface/auth.interface";
import { IAPIResponse } from "../../interface/api.interface";
import searchInstance from "../../database/operations/select";
import userModel from "../../database/entities/user.model";
import cryptohelper from "../../helper/crypto.helper";
import createInstance from "../../database/operations/create";
import { excludeObjectKey, isComparetwoString } from "../../utils/common.utils";
import BaseController from "../../controller/base.controller";
import shadowAiLogger from "../../libs/logger.libs";
import userProfileModel from "../../database/entities/userProfile.model";
import tokenModel from "../../database/entities/token.model";
import updateInstance from "../../database/operations/update";
import crypto from "crypto";
import { HTTP_STATUS } from "../../constant/httpStatus.constant";
import passwordTokenModel from "../../database/entities/passwordToken.model";
import getEmailInstance from "../../helper/smtp.helper";
import { getPasswordResetTemplate } from "../../constant/mail.constant";
import { IEmailOptions } from "../../interface/email.interface";

const baseInstance = new BaseController();

async function signupService(payload: Partial<ISignup>): Promise<IAPIResponse> {
  const searchquery = searchInstance();
  const createquery = createInstance();
  const cryptoinstance = cryptohelper();
  const { username, email, password } = payload;

  const findusername = await searchquery.search(
    "username",
    username,
    userModel
  );

  if (findusername) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `The username: ${username} you provided already exists on system ,please signup using a new username `
    );
  }

  const findemail = await searchquery.search("email", email, userModel);

  if (findemail) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `The username: ${username} you provided already exists on system ,please signup using a new username `
    );
  }
  const hashPassword = cryptoinstance.encryptKeys(password as string);

  const { text, key, iv } = hashPassword;

  const dbPayload = {
    username,
    email,
    password: text,
    passHashKey: key,
    passIv: iv,
  };

  const savetoDatabase = await createquery.create(dbPayload, userModel);

  shadowAiLogger.info(
    `Starting to save the User Profile for the Newly Create User`
  );

  const createUserId = savetoDatabase._id.toString("utf-8");

  const userProfilePayload = Object.preventExtensions({
    userProfileName: username as string,
    primaryEmail: email as string,
    userId: createUserId,
  } as Record<string, string>);

  const saveUserProfileDatabase = await createquery.create(
    userProfilePayload,
    userProfileModel
  );

  shadowAiLogger.info(
    `The UserProfile Has been Created on the Database For the Newly Crreated User `
  );

  return {
    message: "Signup completed",
    data: excludeObjectKey(savetoDatabase._doc, [
      "password",
      "passHashKey",
      "passIv",
    ]),
  };
}
async function loginService(content: Required<ILogin>): Promise<IAPIResponse> {
  const searchquery = searchInstance();
  const createquery = createInstance();
  const cryptoinstance = cryptohelper();

  const { username, password } = content;

  const findusername = await searchquery.search(
    "username",
    username,
    userModel
  );

  if (!findusername) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `The username: ${username} you provided does not  exists on system ,please signup using a username : ${username} `
    );
  }

  const databasePassowrd = findusername.password;
  const databaseHex = findusername.passHashKey;
  const databaseIv = findusername.passIv;

  const decryptedPassword = cryptoinstance.decryptKeys(
    databasePassowrd,
    databaseHex,
    databaseIv
  );

  const isValidPassword = isComparetwoString(password, decryptedPassword);

  if (!isValidPassword) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `Password Does not Match For the User : ${username} `
    );
  }

  const jwtPayload = {
    username: findusername.username,
    userId: findusername._id,
    type: findusername.type,
  };

  const [accessToken, refreshToken] = await Promise.all([
    baseInstance.getJWTInstance().createAccessToken(jwtPayload),
    baseInstance.getJWTInstance().createRefreshToken(jwtPayload),
  ]);

  return {
    message: `The User ${username} Has Successfully Log In`,
    data: {
      accessToken,
      refreshToken,
    },
  };
}

async function logoutService(
  accessToken: string,
  userId: string,
  correlationid: string
): Promise<IAPIResponse> {
  const createModel = createInstance();
  const searchModel = searchInstance();

  const andQuery = {
    $and: [
      {
        accessToken: accessToken,
      },
      {
        userId: userId,
      },
    ],
  } as Record<string, any>;

  const searchResult = await searchModel.searchAnd(andQuery, tokenModel);

  if (Array.isArray(searchResult) && searchResult.length > 0) {
    throw new BadRequestException(
      StatusCodes.BAD_REQUEST,
      `The User Has Already been Logged Out, Please Refresh the Page to Clarify It`
    );
  }

  const tokenpayload = Object.preventExtensions({
    accessToken: accessToken,
    x_correlation_id: correlationid,
    userId: userId,
    logoutAt: new Date(),
  });

  const savetotokenmodel = await createModel.create(tokenpayload, tokenModel);

  if (!savetotokenmodel) {
    throw new DatabaseException(
      StatusCodes.CONFLICT,
      `Database Error Unable to Create the Token Payload`
    );
  }
  return {
    message: `The userId ${userId} is succesfully logged out`,
    data: excludeObjectKey(tokenpayload, ["accessToken"]),
  };
}
async function updatePasswordService(
  username: string,
  content: IUpdatePassword,
  correlation_id: string
) {
  const searchquery = searchInstance();
  const cryptoinstance = cryptohelper();
  const updatequery = updateInstance();

  const { currentpassword, newpassword } = content;

  if (currentpassword === newpassword) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `The new password you entered is same as current password, Please create a new one`
    );
  }

  const searchuser = await searchquery.search("username", username, userModel);

  if (!searchuser) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `The username: ${username} you provided does not  exists on system ,please signup using a username : ${username} `
    );
  }

  const databasePassowrd = searchuser.password;
  const databaseHex = searchuser.passHashKey;
  const databaseIv = searchuser.passIv;

  const decryptedPassword = cryptoinstance.decryptKeys(
    databasePassowrd,
    databaseHex,
    databaseIv
  );

  const isValidPassword = isComparetwoString(
    currentpassword,
    decryptedPassword
  );

  if (!isValidPassword) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `Password Does not Match For the User : ${username} `
    );
  }
  const encryptedPassword = cryptoinstance.encryptKeys(newpassword);

  const { text, key, iv } = encryptedPassword;

  const updatedPayload = Object.seal({
    password: text,
    passHashKey: key,
    passIv: iv,
  });

  const updatedpayload = await updatequery.updateandreturn(
    "username",
    username,
    updatedPayload,
    userModel
  );
  Object.assign(updatedpayload._doc, {
    "x-correlation-id": correlation_id,
  });

  return {
    message: "Password Updated",
    data: excludeObjectKey(updatedpayload._doc, [
      "password",
      "passHashKey",
      "passIv",
    ]),
  };
}

async function forgetPasswordService(
  content: IForgetPassword
): Promise<IAPIResponse> {
  const searchQuery = searchInstance();
  const emailService = getEmailInstance();
  const createQuery = createInstance();
  const { email } = content;

  const isEmailExists = await searchQuery.search("email", email, userModel);

  if (!isEmailExists) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The Email Does not Exists on the Shadow AI System`
    );
  }
  const extractName = isEmailExists._doc.username
    ? isEmailExists._doc.username
    : "Empty Name";

  const generateRandomHash = crypto
    .createHash("sha256")
    .update(
      JSON.stringify({
        ...isEmailExists,
      })
    )
    .digest("hex");

  const currentDate = new Date();

  const twoHoursLater = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);

  const finalToken = generateRandomHash.concat(`=${isEmailExists.id}`);

  const passwordTokenPayload = Object.preventExtensions({
    token: finalToken,
    name: extractName,
    expiredAt: twoHoursLater,
  });

  const saveToken = await createQuery.create(
    passwordTokenPayload,
    passwordTokenModel
  );

  const getFrontendResetPasswordLink = await emailService.getRedirectUrl(
    saveToken._doc ? saveToken._doc.token : saveToken.token
  );

  const { html, text } = getPasswordResetTemplate(
    isEmailExists._doc.username,
    isEmailExists._doc.email,
    getFrontendResetPasswordLink
  );

  const emailOptions = Object.freeze({
    html: html,
    to: isEmailExists._doc.email,
    text: text,
    subject: "Password Reset",
  } as IEmailOptions);

  await emailService.sendMail(emailOptions);
  shadowAiLogger.info(
    `Email sent to ${isEmailExists._doc.email} with admin access details`
  );

  return {
    data: {
      passwordResetAt: new Date().toDateString(),
    },
    message: "Please Check your Mail for the Reset Password Confirmation",
  };
}

async function checkPasswordResetLinkService(
  userId: number,
  tokenId: string,
  isCheck = false
): Promise<IAPIResponse | void> {
  const searchQuery = searchInstance();
  const isUserExists = await searchQuery.search("_id", userId, userModel);

  if (!isUserExists) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `DatabaseError: There is no User on the System`
    );
  }

  const getToken = await searchQuery.search(
    "token",
    tokenId,
    passwordTokenModel
  );

  if (!getToken) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `DatabaseError: The Token : ${JSON.stringify(tokenId)} Does not Exists`
    );
  }

  const getTokenExpiredDate = getToken._doc.expiredAt;

  const currentDate = new Date();

  const isTokenAlreadyExpired = new Date(getTokenExpiredDate) < currentDate;

  if (isTokenAlreadyExpired) {
    throw new ValidationException(
      HTTP_STATUS.VALIDATION_ERROR.CODE,
      `ValidationError: The Token : ${JSON.stringify(
        tokenId
      )} is Already Expired, Please Re-send The Reset Verification Link`
    );
  }

  return isCheck
    ? undefined
    : {
        data: {
          expiresAt: new Date(getTokenExpiredDate).toDateString(),
        },
        message: `The Password Reset Link is Verified`,
      };
}

async function resetPasswordService(
  payload: IResetPassword,
  tokenPayload: Record<string, any>
): Promise<IAPIResponse> {
  const searchQuery = searchInstance();
  const updateQuery = updateInstance();
  const cryptoInstance = cryptohelper();
  const { tokenId }: { tokenId: string } | any = tokenPayload;
  const { newPassword } = payload;

  const [token, userId] = tokenId.split("=");

  await checkPasswordResetLinkService(userId, tokenId);

  const isUserExists = await searchQuery.search("_id", userId, userModel);

  const dbPassword = isUserExists._doc.password;

  const databaseHex = isUserExists._doc.passHashKey;
  const databaseIv = isUserExists._doc.passIv;

  const decryptedPassword = cryptoInstance.decryptKeys(
    dbPassword,
    databaseHex,
    databaseIv
  );

  const isValidPassword = isComparetwoString(newPassword, decryptedPassword);

  if (isValidPassword) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `Password Match with the Current Password, Please Add Different Password`
    );
  }

  const encryptedPassword = cryptoInstance.encryptKeys(newPassword);

  const { text, key, iv } = encryptedPassword;

  const updatedPayload = Object.seal({
    password: text,
    passHashKey: key,
    passIv: iv,
  });

  const updateOperationPayload = await updateQuery.updateOperation(
    "_id",
    userId,
    updatedPayload,
    userModel
  );

  return {
    message: "Password Has been Reset",
    data: excludeObjectKey(updateOperationPayload, [
      "password",
      "passHashKey",
      "passIv",
    ]),
  };
}

export {
  signupService,
  loginService,
  logoutService,
  updatePasswordService,
  forgetPasswordService,
  checkPasswordResetLinkService,
  resetPasswordService,
};
