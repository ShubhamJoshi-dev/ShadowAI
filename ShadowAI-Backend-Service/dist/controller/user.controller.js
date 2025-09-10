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
const logger_libs_1 = __importDefault(require("../libs/logger.libs"));
const user_service_1 = require("../services/user/user.service");
const api_helper_1 = __importDefault(require("../helper/api.helper"));
function getUserProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiInstance = (0, api_helper_1.default)();
            const userId = req.user.userId;
            const apiPayload = yield (0, user_service_1.getUserProfileService)(userId);
            const { data, message } = apiPayload;
            if (!Object.keys(data).includes("x-correlation-id")) {
                data["x-correlation-id"] = req.correlationId;
            }
            apiInstance.sendSuccessResponse(res, message, data, req.originalUrl);
        }
        catch (err) {
            logger_libs_1.default.error(`Error getting the User Profile , Due To ${err}`);
            next(err);
        }
    });
}
exports.default = getUserProfile;
