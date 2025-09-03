import mongoose from "mongoose";
import { retry } from "../decorators/retry.decorator";
import { getEnvValue } from "../utils/env.utils";
import shadowAiLogger from "../libs/logger.libs";

 class DatabaseConnection{
    @retry(5,1000)
    public  connectToDatabase(): Promise<string> {
          return new Promise((resolve, reject) => {
            mongoose
            .connect(getEnvValue("MONGO_URL") as string)
            .then((mongoconnection) => {
                const connectionName = mongoconnection.connection.name;
                shadowAiLogger.info(`Database connected with name ${connectionName}`);
                resolve("connected");
            })
            .catch((err: unknown) => {
                shadowAiLogger.error(`Error Connecting to the Database`);
                resolve("not-connected")
      });
  });
}
}

export default function databaseInstance(){
    return new DatabaseConnection()
}

