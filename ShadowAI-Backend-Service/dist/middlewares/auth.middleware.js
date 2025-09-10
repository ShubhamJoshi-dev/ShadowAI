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
exports.verifyAuthToken = verifyAuthToken;
const exceptions_1 = require("../exceptions");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_helper_1 = __importDefault(require("../helper/jsonwebtoken.helper"));
const common_utils_1 = require("../utils/common.utils");
function verifyAuthToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const jwtinstance = (0, jsonwebtoken_helper_1.default)();
            let token = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : req.headers.authorization;
            if (!token) {
                throw new exceptions_1.UnauthorizedException(http_status_codes_1.StatusCodes.UNAUTHORIZED, `No token present on headers`);
            }
            const hasBearer = token.startsWith("Bearer");
            if (hasBearer) {
                token = token.split(" ")[1];
            }
            const decodepayload = yield jwtinstance.verifyAccessToken(token);
            const checkEmpty = Object.entries(decodepayload).length > 0;
            if (!checkEmpty) {
                throw new exceptions_1.ValidationException(http_status_codes_1.StatusCodes.BAD_REQUEST, `Empty Payload`);
            }
            const correlationId = req.headers["x-correlation-id"];
            if (!correlationId) {
                throw new exceptions_1.UnauthorizedException(http_status_codes_1.StatusCodes.UNAUTHORIZED, `No x-corelation-id present on headers`);
            }
            (0, common_utils_1.checkAndAssign)(req, [
                {
                    key: "correlationId",
                    value: correlationId,
                },
                {
                    key: "token",
                    value: token,
                },
                {
                    key: "user",
                    value: decodepayload,
                },
            ]);
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
