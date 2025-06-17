"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(payload, expiresIn = 60 * 60 * 24) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET)
        throw new Error("JWT_SECRET is not defined");
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
}
function verifyToken(token) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET)
        throw new Error("JWT_SECRET is not defined");
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
