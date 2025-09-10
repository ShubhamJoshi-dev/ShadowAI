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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_utils_1 = require("../utils/env.utils");
class JsonWebTokenHelper {
    createAccessToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const options = {
                    issuer: "ShadowAI-Access",
                    expiresIn: "1h",
                };
                const secretKey = (0, env_utils_1.getEnvValue)("ACCESS_TOKEN");
                const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
                if (token) {
                    resolve(token);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    createRefreshToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const options = {
                    issuer: "ShadowAI-Refresh",
                    expiresIn: "1d",
                };
                const secretKey = (0, env_utils_1.getEnvValue)("REFRESH_TOKEN");
                const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
                if (token) {
                    resolve(token);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    verifyAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const payload = jsonwebtoken_1.default.verify(token, (0, env_utils_1.getEnvValue)("ACCESS_TOKEN"));
                    resolve(payload);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
}
const getJsonWebTokenInstance = () => {
    return new JsonWebTokenHelper();
};
exports.default = getJsonWebTokenInstance;
