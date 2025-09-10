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
exports.limiter = void 0;
exports.consumeRateLimit = consumeRateLimit;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const ratelimit_config_1 = __importDefault(require("../config/ratelimit.config"));
function consumeRateLimit(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (ratelimit_config_1.default) {
                yield ratelimit_config_1.default.consume(req.ip);
                next();
            }
        }
        catch (_a) {
            res.status(429).json({ message: "Too Many Requests" });
        }
    });
}
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        message: "Too many requests, please try again later.",
    },
});
exports.limiter = limiter;
