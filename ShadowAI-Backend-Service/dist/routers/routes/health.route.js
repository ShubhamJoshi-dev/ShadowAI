"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_config_1 = require("../../config/api.config");
const health_controller_1 = require("../../controller/health.controller");
const healthRouter = (0, express_1.Router)();
healthRouter.get(api_config_1.healthApiConfig["getHealth"], health_controller_1.getHealthController);
exports.default = healthRouter;
