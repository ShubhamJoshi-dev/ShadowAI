"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = __importDefault(require("kleur"));
const winston_1 = __importDefault(require("winston"));
const { combine, printf } = winston_1.default.format;
const myFormat = printf(({ level, message, service }) => {
    let jsonString = `{ "message": "${level === "error"
        ? kleur_1.default.red(message)
        : kleur_1.default.gray(message)}"`;
    jsonString += `, "level": "${level}", "service": "${kleur_1.default.yellow(service)}" }`;
    return jsonString;
});
function createLogger(service) {
    return winston_1.default.createLogger({
        levels: winston_1.default.config.syslog.levels,
        defaultMeta: { service },
        format: combine(myFormat),
        transports: [new winston_1.default.transports.Console()],
    });
}
const shadowAiLogger = createLogger("shadow-ai-service");
exports.default = shadowAiLogger;
