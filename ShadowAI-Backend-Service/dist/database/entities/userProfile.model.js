"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roles_constant_1 = require("../../constant/roles.constant");
const common_utils_1 = require("../../utils/common.utils");
const userProfileSchema = new mongoose_1.default.Schema({
    userProfileName: {
        type: String,
        required: [true, (0, common_utils_1.isMissingAttributeLog)("User Profile Name")],
    },
    primaryEmail: {
        type: String,
        required: [true, (0, common_utils_1.isMissingAttributeLog)("Primary Email")],
    },
    secondaryEmail: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    userRole: {
        type: String,
        default: roles_constant_1.USER,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isDeactivated: {
        type: Boolean,
        default: false,
    },
    deactivatedAt: {
        type: Date,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
const userProfileModel = mongoose_1.default.model("UserProfile", userProfileSchema);
exports.default = userProfileModel;
