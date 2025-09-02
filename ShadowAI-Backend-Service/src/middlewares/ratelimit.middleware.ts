import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import rateLimiter from "../config/ratelimit.config";

async function consumeRateLimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (rateLimiter) {
      await rateLimiter.consume(req.ip as string);
      next();
    }
  } catch {
    res.status(429).json({ message: "Too Many Requests" });
  }
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

export { limiter, consumeRateLimit };
