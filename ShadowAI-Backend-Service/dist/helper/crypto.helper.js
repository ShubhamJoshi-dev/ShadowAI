"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = __importDefault(require("node:crypto"));
class CryptoHelper {
    constructor() {
        this.algorithm = "aes-256-cbc";
    }
    createCiphertext(key, iv) {
        return node_crypto_1.default.createCipheriv(this.algorithm, key, iv);
    }
    createDeCiphertext(key, iv) {
        return node_crypto_1.default.createDecipheriv(this.algorithm, key, iv);
    }
    encryptKeys(text) {
        const key = node_crypto_1.default.randomBytes(32);
        const iv = node_crypto_1.default.randomBytes(16);
        const cipher = this.createCiphertext(key, iv);
        let encryptkeys = cipher.update(text, "utf-8", "hex");
        encryptkeys += cipher.final("hex");
        return {
            text: encryptkeys,
            key: key.toString("hex"),
            iv: iv.toString("hex"),
        };
    }
    decryptKeys(text, keyhex, ivHex) {
        const key = Buffer.from(keyhex, "hex");
        const iv = Buffer.from(ivHex, "hex");
        const decipher = this.createDeCiphertext(key, iv);
        let decryptkeys = decipher.update(text, "hex", "utf-8");
        decryptkeys += decipher.final("utf-8");
        return decryptkeys;
    }
}
const cryptohelper = () => {
    return new CryptoHelper();
};
exports.default = cryptohelper;
