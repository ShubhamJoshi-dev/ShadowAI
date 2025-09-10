"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const exceptions_1 = require("../exceptions");
const logger_libs_1 = __importDefault(require("../libs/logger.libs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const errorHandler = (error, _req, res, _next) => {
    if (error instanceof exceptions_1.HttpExceptions) {
        res.status(error.getStatusCode()).json({
            message: error.getMessage(),
            error: true,
            statusCode: error.getStatusCode(),
        });
    }
    logger_libs_1.default.error("Unhandled Error found. Error: " + error);
    res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
        message: "Unhandle Error Found: " + (error === null || error === void 0 ? void 0 : error.message),
        error: true,
        statusCode: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
    });
};
exports.errorHandler = errorHandler;
