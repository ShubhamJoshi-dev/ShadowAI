"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouteConfig = exports.authRouteConfig = exports.healthApiConfig = exports.baseApiConfig = void 0;
exports.baseApiConfig = {
    base: "/api/v1",
};
exports.healthApiConfig = {
    getHealth: "/health",
};
exports.authRouteConfig = {
    signup: "/signup",
    login: "/login",
    logout: "/logout",
};
exports.userRouteConfig = {
    getUserProfile: "/user/profile",
};
