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
exports.getHealthController = getHealthController;
const health_services_1 = require("../services/health/health.services");
const logger_libs_1 = __importDefault(require("../libs/logger.libs"));
const base_controller_1 = __importDefault(require("./base.controller"));
const baseInstance = new base_controller_1.default();
function getHealthController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiInstance = baseInstance.getAPIInstance();
        const apiUrl = req.originalUrl;
        try {
            const { data, message } = yield (0, health_services_1.getHealthService)();
            apiInstance.sendSuccessResponse(res, apiUrl, data, message);
        }
        catch (err) {
            logger_libs_1.default.error(`Error in the Getting Health Controller, Due To : ${JSON.stringify(err)}`);
            next(err);
        }
    });
}
