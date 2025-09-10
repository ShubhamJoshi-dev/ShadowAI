"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvValue = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnvValue = (key) => {
    let envValue = null;
    if (Object.prototype.hasOwnProperty.call(process.env, key)) {
        envValue = process.env[key];
    }
    if (!envValue) {
        throw new Error(`The Environment Variable : ${key} is Missing on the .env`);
    }
    return envValue;
};
exports.getEnvValue = getEnvValue;
