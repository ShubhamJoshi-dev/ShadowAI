import { IAPIResponse } from "../../interface/api.interface";
import { readfromJson } from "../../utils/create.json";

async function getHealthService(): Promise<IAPIResponse> {
  const healthPayload = {
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    checks: {
      database: readfromJson("mongoConnection"),
      cache: "not connected",
      messageQueue: "not connected",
    },
  };
  return {
    data: healthPayload,
    message: "Service health status retrieved successfully",
  };
}

export { getHealthService };
