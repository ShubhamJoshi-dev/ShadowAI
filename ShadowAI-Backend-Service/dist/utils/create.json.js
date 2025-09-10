"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.readfromJson = exports.createJson = void 0;
const path_1 = __importDefault(require("path"));
const node_fs_1 = __importDefault(require("node:fs"));
const promises_1 = __importDefault(require("fs/promises"));
const logger_libs_1 = __importDefault(require("../libs/logger.libs"));
const createJson = (connCbFunc) => __awaiter(void 0, void 0, void 0, function* () {
    const createPath = path_1.default.join(process.cwd(), "mongo-status.json");
    const isFileExist = node_fs_1.default.existsSync(createPath);
    if (!isFileExist) {
        try {
            yield connCbFunc();
            logger_libs_1.default.info(`createJson called For the Success`);
            const jsonData = JSON.stringify({ mongoConnection: "connected" }, null, 2);
            node_fs_1.default.writeFileSync(createPath, jsonData);
            logger_libs_1.default.info(`File created  ${createPath}`);
        }
        catch (err) {
            logger_libs_1.default.info(`createJson called For the Failure`);
            const jsonData = JSON.stringify({ mongoConnection: "not-connected" }, null, 2);
            node_fs_1.default.writeFileSync(createPath, jsonData);
            logger_libs_1.default.info(`File created  ${createPath}`);
        }
    }
});
exports.createJson = createJson;
const readfromJson = (key) => {
    const data = node_fs_1.default.readFileSync("mongo-status.json", "utf-8");
    const jsonData = JSON.parse(data);
    const value = jsonData[key];
    return value;
};
exports.readfromJson = readfromJson;
const deleteFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fullPath = path_1.default.join(process.cwd(), "mongo-status.json");
        const pathexists = node_fs_1.default.existsSync(fullPath);
        if (pathexists) {
            yield promises_1.default.unlink(fullPath);
            logger_libs_1.default.info(`file is deleted with pathname ${fullPath}`);
        }
        else {
            logger_libs_1.default.error(`file is already deleted`);
        }
    }
    catch (err) {
        throw err;
    }
});
exports.deleteFile = deleteFile;
