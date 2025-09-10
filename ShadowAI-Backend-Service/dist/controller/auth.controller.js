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
exports.signupController = signupController;
exports.loginController = loginController;
exports.logoutController = logoutController;
const auth_validation_1 = require("../validation/auth.validation");
const auth_services_1 = require("../services/auth/auth.services");
const api_helper_1 = __importDefault(require("../helper/api.helper"));
const logger_libs_1 = __importDefault(require("../libs/logger.libs"));
function signupController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiInstance = (0, api_helper_1.default)();
            const url = req.originalUrl;
            const content = req.body;
            const validcontent = yield auth_validation_1.signupSchema.parseAsync(content);
            const sendToService = yield (0, auth_services_1.signupService)(validcontent);
            const { message, data } = sendToService;
            apiInstance.sendSuccessResponse(res, message, data, url);
        }
        catch (err) {
            logger_libs_1.default.error(`Error in the Signup Controller ${err}`);
            next(err);
        }
    });
}
function loginController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiInstance = (0, api_helper_1.default)();
            const url = req.originalUrl;
            const content = req.body;
            const validcontent = yield auth_validation_1.loginSchema.parseAsync(content);
            const sendToService = yield (0, auth_services_1.loginService)(validcontent);
            const { message, data } = sendToService;
            apiInstance.sendSuccessResponse(res, message, data, url);
        }
        catch (err) {
            logger_libs_1.default.error(`Error in the Login Controller ${err}`);
            next(err);
        }
    });
}
function logoutController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiInstance = (0, api_helper_1.default)();
            const url = req.originalUrl;
            console.log(req.user);
        }
        catch (err) {
            logger_libs_1.default.error(`Error in the Logout Controller, Due To : ${err}`);
            next(err);
        }
    });
}
