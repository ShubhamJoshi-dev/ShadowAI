import searchInstance from "../../database/operations/select";
import userModel from "../../database/entities/user.model";
import { DatabaseException } from "../../exceptions";
import { HTTP_STATUS } from "../../constant/httpStatus.constant";
import { IAPIResponse } from "../../interface/api.interface";
import { excludeObjectKey, isTrueOrFalse } from "../../utils/common.utils";
import userProfileModel from "../../database/entities/userProfile.model";
import shadowAiLogger from "../../libs/logger.libs";
import { StatusCodes } from "http-status-codes";
import createInstance from "../../database/operations/create";
import imageModel from "../../database/entities/image.model";
import filehelperinstance from "../../helper/filestream.helper";
import updateInstance from "../../database/operations/update";
import cryptohelper from "../../helper/crypto.helper";
import { IUserProfile } from "../../interface/user.interface";
import {
  getAccountActivateTemplate,
  getAccountDeactivateTemplate,
} from "../../constant/mail.constant";
import {
  IS_DEACTIVATED_CONSTANT,
  IS_DELETED_CONSTANT,
} from "../../constant/params.constant";
import { getDefaultAutoSelectFamily } from "net";
import { getEnvValue } from "../../utils/env.utils";
import getEmailInstance from "../../helper/smtp.helper";
import { IEmailOptions } from "../../interface/email.interface";
import deleteInstance from "../../database/operations/delete";
import is from "zod/v4/locales/is.cjs";

async function getUserProfileService(userId: string): Promise<IAPIResponse> {
  const searchQuery = searchInstance();
  const imageCrypto = cryptohelper();
  const userDocs = await searchQuery.searchPopulateTwo(
    "userId",
    userId,
    userProfileModel,
    "userId",
    "imageId"
  );

  if (!userDocs) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The User Does not Exists on the System`
    );
  }
  const newPayload = {};
  Object.assign(newPayload, userDocs._doc);
  Object.assign(newPayload, userDocs._doc.userId._doc);

  const userImageDocs = userDocs.imageId._doc;

  const decodedImage64 = await imageCrypto.decryptKeys(
    userImageDocs.image,
    userImageDocs.ImageKey,
    userImageDocs.imageIv
  );
  Object.assign(newPayload, {
    image: decodedImage64,
  });

  if ("userId" in newPayload) {
    shadowAiLogger.info("Deleting the User ID From the Profile Service");
    delete newPayload["userId"];
  }
  if ("imageId" in newPayload) {
    shadowAiLogger.info("Deleting the Image ID From the Profile Service");
    delete newPayload["imageId"];
  }

  return {
    data: excludeObjectKey(newPayload, [
      "password",
      "passHashKey",
      "passIv",
      "createdAt",
      "updatedAt",
      "__v",
    ]),
    message: `The User Data Fetch Successfully`,
  };
}
async function uploadProfileService(
  username: string,
  body: string,
  userID: string,
  correlation_id: string
) {
  const searchQuery = searchInstance();
  const createQuery = createInstance();
  const updatequery = updateInstance();
  const imageCryptoInstance = cryptohelper();
  const filehelper = filehelperinstance();
  const searchuser = await searchQuery.search("username", username, userModel);

  if (!searchuser) {
    throw new DatabaseException(
      StatusCodes.BAD_REQUEST,
      `The username: ${username} you provided does not  exists on system `
    );
  }

  const givebaseresult = await filehelper.givebase64(body);

  const { iv, key, text } = await imageCryptoInstance.encryptKeys(
    givebaseresult
  );

  const savetoimage = Object.seal({
    image: text,
    imageIv: iv,
    ImageKey: key,
  });

  const savetoimageDatabase = await createQuery.create(savetoimage, imageModel);

  const imageid = savetoimageDatabase._id;

  const updatedPayload = Object.seal({
    imageId: imageid,
  });
  await updatequery.updateandreturn(
    "userId",
    userID,
    updatedPayload,
    userProfileModel
  );
  Object.assign(savetoimageDatabase._doc, {
    "x-correlation-id": correlation_id,
  });
  return {
    data: {
      image: savetoimageDatabase._doc.image,
      imageKeyIv: `${savetoimageDatabase._doc.ImageKey} + ${savetoimageDatabase._doc.imageIv}`,
    },
    message: "Image saved to database",
  };
}

async function editUserProfileService(
  content: Partial<IUserProfile>,
  userId: string
): Promise<IAPIResponse> {
  const searchQuery = searchInstance();
  const createQuery = createInstance();
  const updateQuery = updateInstance();

  const deepCopyProfilePayload = JSON.parse(JSON.stringify(content));

  const userDocs = await searchQuery.search("userId", userId, userProfileModel);

  if (!userDocs) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The User is not Linked With any User Profile Model`
    );
  }

  const isSamePrimaryAndSecondaryEmail =
    String(userDocs?._doc?.primaryEmail) === String(content?.secondaryEmail);

  if (isSamePrimaryAndSecondaryEmail) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The Primary Email and the Secondary Email is Same`
    );
  }

  const userDeletedStatus = userDocs.isDeleted;

  const isUserDeleted =
    typeof userDeletedStatus === "boolean" && Boolean(userDeletedStatus);

  if (isUserDeleted) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The User Has been Deleted, Cannot Edit the Deleted User Profile`
    );
  }

  const userDeactivated = userDocs.isDeactivated;

  const isUserDeactivated =
    typeof userDeactivated === "boolean" && Boolean(userDeactivated);

  if (isUserDeactivated) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The User Has been Deactivated, Cannot Edit the Deactivated User Profile`
    );
  }

  const updatePayload = Object.preventExtensions({ ...deepCopyProfilePayload });

  const updateOperationResult = await updateQuery.updateOperation(
    "userId",
    userId,
    updatePayload,
    userProfileModel
  );

  const isResultUpdated =
    updateOperationResult.acknowledged &&
    updateOperationResult.matchedCount > 0;

  if (!isResultUpdated) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The Database Update Operation Did not Successfully Executed`
    );
  }

  const mainUserPayload = {} as any;
  for (const [key, value] of Object.entries(content)) {
    if (key.includes("name")) {
      mainUserPayload["username"] = value;
    }

    if (key.startsWith("primary") && key.endsWith("email")) {
      mainUserPayload["email"] = value;
    }
  }

  if (Object.keys(mainUserPayload).length > 0) {
    await updateQuery.updateOperation(
      "_id",
      userId,
      mainUserPayload,
      userModel
    );
  }

  return {
    data: isResultUpdated,
    message: "The Profile Has been Updated Successfully",
  };
}

async function deactivatedUserService(
  userId: string,
  queryContent: Record<string, any>
): Promise<IAPIResponse | undefined> {
  const { isparams, value } = queryContent;

  const searchQuery = searchInstance();
  const updateQuery = updateInstance();
  const deleteQuery = deleteInstance();
  const smtpHelper = getEmailInstance();

  const userDocument = await searchQuery.search(
    "userId",
    userId,
    userProfileModel
  );

  if (!userDocument) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The User Does not Exists on the System`
    );
  }

  switch (isparams) {
    case IS_DEACTIVATED_CONSTANT: {
      shadowAiLogger.info(`The Deactivated Process Has been Started`);
      const userDeactivated = userDocument._doc.isDeactivated;

      const isUserDeactivated =
        typeof userDeactivated === "boolean" && Boolean(userDeactivated);

      if (isUserDeactivated && isTrueOrFalse(value)) {
        throw new DatabaseException(
          HTTP_STATUS.DATABASE_ERROR.CODE,
          `The User Has Already Been Deactivated`
        );
      }

      const deactivatedPayload = Object.preventExtensions({
        isDeactivated: isTrueOrFalse(value),
      });

      const updateOperationPayload = await updateQuery.updateOperation(
        "userId",
        userId,
        deactivatedPayload,
        userProfileModel
      );

      const isResultUpdated =
        updateOperationPayload.acknowledged &&
        updateOperationPayload.matchedCount > 0;

      if (!isResultUpdated) {
        throw new DatabaseException(
          HTTP_STATUS.DATABASE_ERROR.CODE,
          `The Update Operation Failed for deactivating the User`
        );
      }

      const navigationLink = `${getEnvValue("FRONTEND_URL")}/auth/login`;

      const accountEmailTemplate = isTrueOrFalse(value)
        ? getAccountDeactivateTemplate(
            userDocument._doc.userProfileName,
            userDocument._doc.primaryEmail,
            userDocument._doc.userRole
          )
        : getAccountActivateTemplate(
            userDocument._doc.userProfileName,
            userDocument._doc.primaryEmail,
            userDocument._doc.userRole,
            navigationLink
          );

      const { html, text } = accountEmailTemplate;

      const emailOptions = Object.freeze({
        html: html,
        to: userDocument._doc.primaryEmail,
        text: text,
        subject: isTrueOrFalse(value)
          ? "Account Deactivation Information"
          : "Account Activation Information",
      } as IEmailOptions);

      await smtpHelper.sendMail(emailOptions);
      shadowAiLogger.info(
        `Email sent to ${userDocument._doc.primaryEmail} with admin access details`
      );

      return {
        data: {
          [`${userId}`]: {
            deactivated: isTrueOrFalse(value),
          },
        },
        message: `The User Has been ${
          isTrueOrFalse(value) ? "Deactivated" : "Activated"
        }`,
      };
    }

    case IS_DELETED_CONSTANT: {
      shadowAiLogger.info(`The Deleted Process Has been Started`);
      const userDeleted = userDocument._doc.isDeleted;
      const isUserDeleted =
        typeof userDeleted === "boolean" && Boolean(userDeleted);
      if (isUserDeleted && isTrueOrFalse(value)) {
        throw new DatabaseException(
          HTTP_STATUS.DATABASE_ERROR.CODE,
          `The User Has Already been Deleted`
        );
      }
      const isDeletedPayload = Object.preventExtensions({
        isDeleted: isTrueOrFalse(value),
      });
      const updateOperationPayload = await updateQuery.updateOperation(
        "userId",
        userId,
        isDeletedPayload,
        userProfileModel
      );

      const isResultUpdated =
        updateOperationPayload.acknowledged &&
        updateOperationPayload.matchedCount > 0;

      if (!isResultUpdated) {
        throw new DatabaseException(
          HTTP_STATUS.DATABASE_ERROR.CODE,
          `The Update Operation Failed for deleting the User`
        );
      }

      const deleteUserIds = await deleteQuery.deleteUserAndUserProfile(
        userId,
        userModel,
        userProfileModel
      );

      const isErrorOnPromise = deleteUserIds.filter(
        (item) => item.status !== "fulfilled"
      );
      const isErrorExists =
        Array.isArray(isErrorOnPromise) && isErrorOnPromise.length > 0;

      if (isErrorExists) {
        throw new DatabaseException(
          HTTP_STATUS.DATABASE_ERROR.CODE,
          `There is Error while deleting the User From the Database`
        );
      }

      return {
        data: {
          [`${userId}`]: {
            delete: Boolean(value),
          },
        },
        message: `The User Has been ${
          Boolean(value) ? "Is Deleted" : "Not Is Deleted"
        }`,
      };
    }
    default: {
      return {
        data: null,
        message: `The Query Params is not match, it should be ["isDeactivated","isDeleted"], But the Request is forwarding : ${isparams}`,
      };
    }
  }
}

export {
  getUserProfileService,
  uploadProfileService,
  editUserProfileService,
  deactivatedUserService,
};
