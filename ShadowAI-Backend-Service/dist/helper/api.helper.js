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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const logger_libs_1 = __importDefault(require("../libs/logger.libs"));
const common_utils_1 = require("../utils/common.utils");
class APIHelper {
    sendSuccessResponse(res_1, baseUrl_1, data_1, message_1) {
        return __awaiter(this, arguments, void 0, function* (res, baseUrl, data, message, statusCode = http_status_codes_1.default.ACCEPTED) {
            logger_libs_1.default.info(`Sending the Success Resposne to the API Endpoints: ${baseUrl} with the StatusCode: ${statusCode}`);
            if (typeof data === "object" && data && "x-correlation-id" in data) {
                return res.status(statusCode).json({
                    message,
                    [`x-correlation-id`]: data["x-correlation-id"],
                    data: (0, common_utils_1.excludeObjectKey)(data, ["x-correlation-id", "_id"]),
                    statusCode,
                    error: false,
                });
            }
            else {
                return res.status(statusCode).json({
                    message,
                    data,
                    statusCode,
                    error: false,
                });
            }
        });
    }
}
const getAPIHelperInstance = () => {
    return new APIHelper();
};
exports.default = getAPIHelperInstance;
