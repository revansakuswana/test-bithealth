"use strict";
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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.APP_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dbStatus = mongoose_1.default.connection.readyState === 1 ? "connected" : "disconnected";
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        db: dbStatus,
        timestamp: new Date().toISOString(),
    });
}));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
exports.default = app;
