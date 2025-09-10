"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupService = signupService;
exports.loginService = loginService;
exports.logoutService = logoutService;
const http_status_codes_1 = require("http-status-codes");
const exceptions_1 = require("../../exceptions");
const select_1 = __importDefault(require("../../database/operations/select"));
const user_model_1 = __importDefault(require("../../database/entities/user.model"));
const crypto_helper_1 = __importDefault(require("../../helper/crypto.helper"));
const create_1 = __importDefault(require("../../database/operations/create"));
const common_utils_1 = require("../../utils/common.utils");
const base_controller_1 = __importDefault(require("../../controller/base.controller"));
const logger_libs_1 = __importDefault(require("../../libs/logger.libs"));
const userProfile_model_1 = __importDefault(require("../../database/entities/userProfile.model"));
const baseInstance = new base_controller_1.default();
function signupService(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchquery = (0, select_1.default)();
        const createquery = (0, create_1.default)();
        const cryptoinstance = (0, crypto_helper_1.default)();
        const { username, email, password } = payload;
        const findusername = yield searchquery.search("username", username, user_model_1.default);
        if (findusername) {
            throw new exceptions_1.DatabaseException(http_status_codes_1.StatusCodes.BAD_REQUEST, `The username: ${username} you provided already exists on system ,please signup using a new username `);
        }
        const findemail = yield searchquery.search("email", email, user_model_1.default);
        if (findemail) {
            throw new exceptions_1.DatabaseException(http_status_codes_1.StatusCodes.BAD_REQUEST, `The username: ${username} you provided already exists on system ,please signup using a new username `);
        }
        const hashPassword = cryptoinstance.encryptKeys(password);
        const { text, key, iv } = hashPassword;
        const dbPayload = {
            username,
            email,
            password: text,
            passHashKey: key,
            passIv: iv,
        };
        const savetoDatabase = yield createquery.create(dbPayload, user_model_1.default);
        logger_libs_1.default.info(`Starting to save the User Profile for the Newly Create User`);
        const createUserId = savetoDatabase._id.toString("utf-8");
        const userProfilePayload = Object.preventExtensions({
            userProfileName: username,
            primaryEmail: email,
            userId: createUserId,
        });
        const saveUserProfileDatabase = yield createquery.create(userProfilePayload, userProfile_model_1.default);
        logger_libs_1.default.info(`The UserProfile Has been Created on the Database For the Newly Crreated User `);
        return {
            message: "Signup completed",
            data: (0, common_utils_1.excludeObjectKey)(savetoDatabase._doc, [
                "password",
                "passHashKey",
                "passIv",
            ]),
        };
    });
}
function loginService(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchquery = (0, select_1.default)();
        const createquery = (0, create_1.default)();
        const cryptoinstance = (0, crypto_helper_1.default)();
        const { username, password } = content;
        const findusername = yield searchquery.search("username", username, user_model_1.default);
        if (!findusername) {
            throw new exceptions_1.DatabaseException(http_status_codes_1.StatusCodes.BAD_REQUEST, `The username: ${username} you provided does not  exists on system ,please signup using a username : ${username} `);
        }
        const databasePassowrd = findusername.password;
        const databaseHex = findusername.passHashKey;
        const databaseIv = findusername.passIv;
        const decryptedPassword = cryptoinstance.decryptKeys(databasePassowrd, databaseHex, databaseIv);
        const isCompareMatchPassword = (raw, db) => {
            return (String(password).trim().toLowerCase() === String(db).trim().toLowerCase());
        };
        const isValidPassword = isCompareMatchPassword(password, decryptedPassword);
        if (!isValidPassword) {
            throw new exceptions_1.DatabaseException(http_status_codes_1.StatusCodes.BAD_REQUEST, `Password Does not Match For the User : ${username} `);
        }
        const jwtPayload = {
            username: findusername.username,
            userId: findusername._id,
            type: findusername.type,
        };
        const [accessToken, refreshToken] = yield Promise.all([
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
    });
}
function logoutService() {
    return __awaiter(this, void 0, void 0, function* () { });
}
