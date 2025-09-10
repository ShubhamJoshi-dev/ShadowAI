"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const signupSchema = zod_1.default.object({
    username: zod_1.default
        .string()
        .min(3, {
        message: `The Username Must be At Least 3 Character Long`,
    })
        .max(100, {
        message: `The Username must be Maximum 100 Character`,
    }),
    email: zod_1.default.string().email({
        message: `Please Enter the Correct Format Email`,
    }),
    password: zod_1.default.string().min(8, {
        message: `The Username Must be At Least 8 Character Long`,
    }),
});
exports.signupSchema = signupSchema;
const loginSchema = zod_1.default.object({
    username: zod_1.default.string().optional(),
    password: zod_1.default.string().min(8, {
        message: `The Username Must be At Least 8 Character Long`,
    }),
});
exports.loginSchema = loginSchema;
