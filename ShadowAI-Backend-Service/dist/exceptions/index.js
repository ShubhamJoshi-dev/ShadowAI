"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleExceptions = exports.ETLExceptions = exports.TokenExpirationExceptions = exports.RabbitMQExceptions = exports.DatabaseException = exports.ValidationException = exports.BadRequestException = exports.NotFoundException = exports.UnauthorizedException = exports.HttpExceptions = void 0;
const httpStatus_constant_1 = require("../constant/httpStatus.constant");
class HttpExceptions extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = "HttpException";
        Object.setPrototypeOf(this, new.target.prototype);
    }
    getStatusCode() {
        return this.statusCode;
    }
    getMessage() {
        return this.message;
    }
}
exports.HttpExceptions = HttpExceptions;
class UnauthorizedException extends HttpExceptions {
    constructor(statusCode, message) {
        super(statusCode !== null && statusCode !== void 0 ? statusCode : httpStatus_constant_1.HTTP_STATUS.UNAUTHORIZED.CODE, message || httpStatus_constant_1.HTTP_STATUS.UNAUTHORIZED.MESSAGE);
        this.name = "UnAuthorizedException";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class NotFoundException extends HttpExceptions {
    constructor(statusCode, message) {
        super(statusCode !== null && statusCode !== void 0 ? statusCode : httpStatus_constant_1.HTTP_STATUS.NOT_FOUND.CODE, message || httpStatus_constant_1.HTTP_STATUS.NOT_FOUND.MESSAGE);
        this.name = "NotFoundException";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends HttpExceptions {
    constructor(statusCode, message) {
        super(statusCode !== null && statusCode !== void 0 ? statusCode : httpStatus_constant_1.HTTP_STATUS.BAD_REQUEST.CODE, message || httpStatus_constant_1.HTTP_STATUS.BAD_REQUEST.MESSAGE);
        this.name = "BadRequestException";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.BadRequestException = BadRequestException;
class ValidationException extends HttpExceptions {
    constructor(statusCode, message) {
        super(statusCode !== null && statusCode !== void 0 ? statusCode : httpStatus_constant_1.HTTP_STATUS.VALIDATION_ERROR.CODE, message || httpStatus_constant_1.HTTP_STATUS.VALIDATION_ERROR.MESSAGE);
        this.name = "ValidationException";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ValidationException = ValidationException;
class DatabaseException extends HttpExceptions {
    constructor(statusCode, message) {
        super(statusCode !== null && statusCode !== void 0 ? statusCode : httpStatus_constant_1.HTTP_STATUS.DATABASE_ERROR.CODE, message || httpStatus_constant_1.HTTP_STATUS.DATABASE_ERROR.MESSAGE);
        this.name = "DatabaseException";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.DatabaseException = DatabaseException;
class RabbitMQExceptions extends HttpExceptions {
    constructor(statusCode, message) {
        super(statusCode !== null && statusCode !== void 0 ? statusCode : httpStatus_constant_1.HTTP_STATUS.DATABASE_ERROR.CODE, message || httpStatus_constant_1.HTTP_STATUS.DATABASE_ERROR.MESSAGE);
        this.name = "RabbitMQExceptions";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.RabbitMQExceptions = RabbitMQExceptions;
class TokenExpirationExceptions extends UnauthorizedException {
    constructor(statusCode, message) {
        super(statusCode !== null && statusCode !== void 0 ? statusCode : httpStatus_constant_1.HTTP_STATUS.UNAUTHORIZED.CODE, message || httpStatus_constant_1.HTTP_STATUS.UNAUTHORIZED.MESSAGE);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.TokenExpirationExceptions = TokenExpirationExceptions;
class ETLExceptions extends HttpExceptions {
    constructor(statusCode, message) {
        super(statusCode !== null && statusCode !== void 0 ? statusCode : httpStatus_constant_1.HTTP_STATUS.INTERNAL_SERVER.CODE, message || httpStatus_constant_1.HTTP_STATUS.INTERNAL_SERVER.MESSAGE);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ETLExceptions = ETLExceptions;
class RoleExceptions extends HttpExceptions {
    constructor(statusCode, message) {
        super(statusCode !== null && statusCode !== void 0 ? statusCode : httpStatus_constant_1.HTTP_STATUS.BAD_REQUEST.CODE, message || httpStatus_constant_1.HTTP_STATUS.BAD_REQUEST.MESSAGE);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.RoleExceptions = RoleExceptions;
