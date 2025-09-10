"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.HTTP_STATUS = Object.freeze({
    SUCCESS: {
        CODE: http_status_codes_1.default.OK,
        MESSAGE: "Request Success.",
    },
    UNAUTHORIZED: {
        CODE: http_status_codes_1.default.UNAUTHORIZED,
        MESSAGE: "Authentication Error",
    },
    BAD_REQUEST: {
        CODE: http_status_codes_1.default.BAD_REQUEST,
        MESSAGE: "Bad Request Error",
    },
    NOT_FOUND: {
        CODE: http_status_codes_1.default.NOT_FOUND,
        MESSAGE: "Not Found Error",
    },
    INTERNAL_SERVER: {
        CODE: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
        MESSAGE: "Unhandle Internal Server Error Found",
    },
    VALIDATION_ERROR: {
        CODE: http_status_codes_1.default.UNPROCESSABLE_ENTITY,
        MESSAGE: "Bad Request Error",
    },
    DATABASE_ERROR: {
        CODE: http_status_codes_1.default.BAD_REQUEST,
        MESSAGE: "Database Error",
    },
});
