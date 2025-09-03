import express, { Application } from "express";
import BaseExpressServer from "./base/base.express";
import shadowAiLogger from "./libs/logger.libs";
import initalizeMiddleware from "./middlewares/server.middleware";
import initalizeRoutes from "./routers/server.router";
import { UnknownAny } from "./types/types";
import { getEnvValue } from "./utils/env.utils";
import { retry } from "./decorators/retry.decorator";
import databaseInstance from "./database/connect";
import {createJson, deleteFile} from "./utils/create.json";

class ExpressServer extends BaseExpressServer {
  constructor() {
    super();
  }

  @retry(3, 2000)
  public async startExpressServer() {
    await deleteFile();
    const dbconnection = databaseInstance();
    const app: Application = express();
    const port = getEnvValue("PORT") as string;

    await initalizeMiddleware(app);
    await initalizeRoutes(app);
    await createJson(dbconnection.connectToDatabase)


    app.listen(port, () => {
      shadowAiLogger.info(
        `The Backend Server is Running on http://localhost:${port}/api/v1`
      );
    });
  }
}

export default ExpressServer;
