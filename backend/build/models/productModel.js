"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    kode: { type: String, required: true, unique: true },
    nama: { type: String, required: true },
    quantity: { type: Number, default: 0 },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Product", productSchema);
