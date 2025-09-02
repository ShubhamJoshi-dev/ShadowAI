import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import express, { Application } from "express";
import { consumeRateLimit, limiter } from "./ratelimit.middleware";
import { corsConfig } from "../config/cors.config";
import { addBasicRateLimit } from "../constant/status.constant";

async function initalizeMiddleware(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsConfig as CorsOptions));
  app.use(morgan("dev"));
  app.use(limiter);
}

export default initalizeMiddleware;
