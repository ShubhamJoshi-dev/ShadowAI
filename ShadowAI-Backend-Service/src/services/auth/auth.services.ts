import { StatusCodes } from "http-status-codes";
import { DatabaseException } from "../../exceptions";
import { ILogin, ISignup } from "../../interface/auth.interface";
import { IAPIResponse } from "../../interface/api.interface";
import searchInstance from "../../database/operations/select";
import userModel from "../../database/entities/user.model";
import cryptohelper from "../../helper/crypto.helper";
import createInstance from "../../database/operations/create";
import { excludeObjectKey } from "../../utils/common.utils";
import BaseController from "../../controller/base.controller";
import { access } from "fs";
import { jwt } from "zod";

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

  const isCompareMatchPassword = (raw: string, db: string) => {
    return (
      String(password).trim().toLowerCase() === String(db).trim().toLowerCase()
    );
  };

  const isValidPassword = isCompareMatchPassword(password, decryptedPassword);

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

async function logoutService() {}

export { signupService, loginService, logoutService };
