import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";
import { addBasicRateLimit } from "../constant/status.constant";

const ratelimit = [];

if (!addBasicRateLimit) {
  const redisClient = new Redis();

  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "middleware",
    points: 10,
    duration: 1,
  });
  ratelimit.push(rateLimiter);
}

export default ratelimit.pop();
