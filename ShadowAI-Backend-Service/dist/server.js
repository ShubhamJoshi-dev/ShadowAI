"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const base_express_1 = __importDefault(require("./base/base.express"));
const logger_libs_1 = __importDefault(require("./libs/logger.libs"));
const server_middleware_1 = __importDefault(require("./middlewares/server.middleware"));
const server_router_1 = __importDefault(require("./routers/server.router"));
const env_utils_1 = require("./utils/env.utils");
const retry_decorator_1 = require("./decorators/retry.decorator");
const connect_1 = __importDefault(require("./database/connect"));
const create_json_1 = require("./utils/create.json");
let ExpressServer = (() => {
    var _a;
    let _classSuper = base_express_1.default;
    let _instanceExtraInitializers = [];
    let _startExpressServer_decorators;
    return _a = class ExpressServer extends _classSuper {
            constructor() {
                super();
                __runInitializers(this, _instanceExtraInitializers);
            }
            startExpressServer() {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, create_json_1.deleteFile)();
                    const dbconnection = (0, connect_1.default)();
                    const app = (0, express_1.default)();
                    const port = (0, env_utils_1.getEnvValue)("PORT");
                    yield (0, server_middleware_1.default)(app);
                    yield (0, server_router_1.default)(app);
                    yield (0, create_json_1.createJson)(dbconnection.connectToDatabase);
                    app.listen(port, () => {
                        logger_libs_1.default.info(`The Backend Server is Running on http://localhost:${port}/api/v1`);
                    });
                });
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _startExpressServer_decorators = [(0, retry_decorator_1.retry)(3, 2000)];
            __esDecorate(_a, null, _startExpressServer_decorators, { kind: "method", name: "startExpressServer", static: false, private: false, access: { has: obj => "startExpressServer" in obj, get: obj => obj.startExpressServer }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = ExpressServer;
