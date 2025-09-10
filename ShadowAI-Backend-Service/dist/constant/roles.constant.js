"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRoleHashMap = exports.ROLES = exports.NOROLE = exports.SUPERADMIN = exports.GUEST = exports.ADMIN = exports.USER = void 0;
exports.USER = "USER";
exports.ADMIN = "ADMIN";
exports.GUEST = "GUEST";
exports.SUPERADMIN = "SUPER ADMIN";
exports.NOROLE = "NO ROLE";
exports.ROLES = {
    user: exports.USER,
    admin: exports.ADMIN,
    guest: exports.GUEST,
    superAdmin: exports.SUPERADMIN,
    defaultRole: exports.NOROLE,
};
const getUserRoleHashMap = (roleKey) => {
    return Object.prototype.hasOwnProperty.call(exports.ROLES, roleKey)
        ? exports.ROLES[roleKey]
        : exports.ROLES === null || exports.ROLES === void 0 ? void 0 : exports.ROLES.defaultRole;
};
exports.getUserRoleHashMap = getUserRoleHashMap;
