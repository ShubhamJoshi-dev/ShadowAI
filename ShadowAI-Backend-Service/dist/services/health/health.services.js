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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthService = getHealthService;
const create_json_1 = require("../../utils/create.json");
function getHealthService() {
    return __awaiter(this, void 0, void 0, function* () {
        const healthPayload = {
            status: "healthy",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            version: "1.0.0",
            checks: {
                database: (0, create_json_1.readfromJson)("mongoConnection"),
                cache: "not connected",
                messageQueue: "not connected",
            },
        };
        return {
            data: healthPayload,
            message: "Service health status retrieved successfully",
        };
    });
}
