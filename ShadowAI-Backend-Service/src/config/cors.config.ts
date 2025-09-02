import { CorsOptions } from "cors";

export const corsConfig = Object.preventExtensions({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  credentials: true,
} as CorsOptions);
