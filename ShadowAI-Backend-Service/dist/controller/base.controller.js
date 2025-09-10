"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_helper_1 = __importDefault(require("../helper/api.helper"));
const jsonwebtoken_helper_1 = __importDefault(require("../helper/jsonwebtoken.helper"));
class BaseController {
    getAPIInstance() {
        return (0, api_helper_1.default)();
    }
    getJWTInstance() {
        return (0, jsonwebtoken_helper_1.default)();
    }
}
exports.default = BaseController;
