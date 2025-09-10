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
exports.getUserProfileService = getUserProfileService;
const select_1 = __importDefault(require("../../database/operations/select"));
const user_model_1 = __importDefault(require("../../database/entities/user.model"));
const exceptions_1 = require("../../exceptions");
const httpStatus_constant_1 = require("../../constant/httpStatus.constant");
const common_utils_1 = require("../../utils/common.utils");
function getUserProfileService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchQuery = (0, select_1.default)();
        const userDocs = yield searchQuery.search("_id", userId, user_model_1.default);
        if (!userDocs) {
            throw new exceptions_1.DatabaseException(httpStatus_constant_1.HTTP_STATUS.DATABASE_ERROR.CODE, `The User Does not Exists on the System`);
        }
        return {
            data: (0, common_utils_1.excludeObjectKey)(userDocs._doc, [
                "password",
                "passHashKey",
                "passIv",
                "createdAt",
                "updatedAt",
                "__v",
            ]),
            message: `The User Data Fetch Successfully`,
        };
    });
}
