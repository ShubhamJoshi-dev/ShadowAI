import path from "path";
import databaseInstance from "../database/connect";
import fs from "node:fs";
import fsPromises from "fs/promises";
import shadowAiLogger from "../libs/logger.libs";

const createJson = async (connCbFunc: Function) => {
  const createPath = path.join(process.cwd(), "mongo-status.json");
  const isFileExist = fs.existsSync(createPath);
  if (!isFileExist) {
    try {
      await connCbFunc();
      shadowAiLogger.info(`createJson called For the Success`);
      const jsonData = JSON.stringify(
        { mongoConnection: "connected" },
        null,
        2
      );
      fs.writeFileSync(createPath, jsonData);
      shadowAiLogger.info(`File created  ${createPath}`);
    } catch (err) {
      shadowAiLogger.info(`createJson called For the Failure`);
      const jsonData = JSON.stringify(
        { mongoConnection: "not-connected" },
        null,
        2
      );
      fs.writeFileSync(createPath, jsonData);
      shadowAiLogger.info(`File created  ${createPath}`);
    }
  }
};

const readfromJson = (key: string) => {
  const data = fs.readFileSync("mongo-status.json", "utf-8");
  const jsonData = JSON.parse(data);
  const value = jsonData[key];
  return value;
};

const deleteFile = async () => {
  try {
    const fullPath = path.join(process.cwd(), "mongo-status.json");
    const pathexists = fs.existsSync(fullPath);

    if (pathexists) {
      await fsPromises.unlink(fullPath);
      shadowAiLogger.info(`file is deleted with pathname ${fullPath}`);
    } else {
      shadowAiLogger.error(`file is already deleted`);
    }
  } catch (err) {
    throw err;
  }
};
export { createJson, readfromJson, deleteFile };
