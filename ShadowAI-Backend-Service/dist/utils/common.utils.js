"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMissingAttributeLog = exports.checkAndAssign = exports.excludeObjectKey = void 0;
const logger_libs_1 = __importDefault(require("../libs/logger.libs"));
const excludeObjectKey = (obj, objectKeys) => {
    const newPayload = {};
    for (const [key, value] of Object.entries(obj)) {
        if (objectKeys.includes(key)) {
            continue;
        }
        newPayload[key] = value;
    }
    return newPayload;
};
exports.excludeObjectKey = excludeObjectKey;
const checkAndAssign = (obj, keyValue) => {
    if (Array.isArray(keyValue) && keyValue.length > 0) {
        for (const item of keyValue) {
            const { key, value } = item;
            if (!Object.keys(obj).includes(key)) {
                obj[key] = value;
            }
        }
    }
    logger_libs_1.default.info(`Process Check And Assign Completed For the object`);
};
exports.checkAndAssign = checkAndAssign;
const isMissingAttributeLog = (key) => {
    return `${key} is Missing`;
};
exports.isMissingAttributeLog = isMissingAttributeLog;
