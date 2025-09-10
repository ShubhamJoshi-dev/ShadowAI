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
exports.retry = retry;
const logger_libs_1 = __importDefault(require("../libs/logger.libs"));
function retry(maxRetries = 3, delayMs = 2000) {
    return function (value, context) {
        function replacement(...args) {
            return __awaiter(this, void 0, void 0, function* () {
                let retries = maxRetries;
                while (retries > 0) {
                    try {
                        return yield value.apply(this, args);
                    }
                    catch (err) {
                        retries--;
                        if (retries === 0) {
                            logger_libs_1.default.error(`Maximum retries exceeded for ${String(context.name)}`);
                            throw err;
                        }
                        logger_libs_1.default.error(`Error in ${String(context.name)}, retrying... (${retries} left)`);
                        yield new Promise((resolve) => setTimeout(resolve, delayMs));
                    }
                }
                throw new Error("Unreachable code");
            });
        }
        return replacement;
    };
}
