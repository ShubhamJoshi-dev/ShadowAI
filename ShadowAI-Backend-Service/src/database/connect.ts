import mongoose from "mongoose";
import { retry } from "../decorators/retry.decorator";
import { getEnvValue } from "../utils/env.utils";
import shadowAiLogger from "../libs/logger.libs";

class DatabaseConnection {
  @retry(5, 1000)
  public async connectToDatabase(): Promise<typeof mongoose> {
    const connection = await mongoose.connect(
      getEnvValue("MONGO_URL") as string
    );
    return connection;
  }
}

export default function databaseInstance() {
  return new DatabaseConnection();
}
