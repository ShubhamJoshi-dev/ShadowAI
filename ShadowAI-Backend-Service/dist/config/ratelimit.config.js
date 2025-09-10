"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const ioredis_1 = __importDefault(require("ioredis"));
const status_constant_1 = require("../constant/status.constant");
const ratelimit = [];
if (!status_constant_1.addBasicRateLimit) {
    const redisClient = new ioredis_1.default();
    const rateLimiter = new rate_limiter_flexible_1.RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: "middleware",
        points: 10,
        duration: 1,
    });
    ratelimit.push(rateLimiter);
}
exports.default = ratelimit.pop();
