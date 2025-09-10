"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_config_1 = require("../../config/api.config");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_controller_1 = __importDefault(require("../../controller/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.get(api_config_1.userRouteConfig["getUserProfile"], auth_middleware_1.verifyAuthToken, user_controller_1.default);
exports.default = userRouter;
