"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, `Username is missing `],
    },
    email: {
        type: String,
        required: [true, `Email is missing `],
    },
    password: {
        type: String,
        required: [true, `Password is missing `],
    },
    passHashKey: {
        type: String,
        required: [true, "Password Hash Key is Missing "],
    },
    passIv: {
        type: String,
        required: [true, "PassIv is Missing "],
    },
    type: {
        type: String,
        default: "JWT",
        enum: ["JWT", "OAuth"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
});
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
