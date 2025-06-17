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
exports.getProfile = exports.logout = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jwt_1 = require("../utils/jwt");
const hash_1 = require("../utils/hash");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: "Pengguna sudah ada" });
            return;
        }
        const hashed = yield (0, hash_1.hashPassword)(password);
        yield userModel_1.default.create({ name, email, password: hashed, role });
        res.status(201).json({
            success: true,
            message: "Pengguna berhasil terdaftar",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err instanceof Error ? err.message : String(err),
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res
                .status(404)
                .json({ success: false, message: "Pengguna tidak ditemukan" });
            return;
        }
        const isMatch = yield (0, hash_1.comparePassword)(password, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: "Pasword salah" });
            return;
        }
        const token = (0, jwt_1.generateToken)({ id: user._id.toString(), role: user.role });
        res
            .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({
            success: true,
            message: "Login berhasil",
            data: { id: user._id, email: user.email, role: user.role },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err instanceof Error ? err.message : String(err),
        });
    }
});
exports.login = login;
const logout = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
            .status(200)
            .json({
            success: true,
            message: "Berhasil logout",
            user: null,
        });
    }
    catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({
            success: false,
            message: "Gagal logout",
            error: err.message,
        });
    }
});
exports.logout = logout;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const foundUser = yield userModel_1.default.findById(user.id).select("-password");
        if (!foundUser) {
            res
                .status(404)
                .json({ success: false, message: "Pengguna tidak ditemukan" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Profile ditemukan",
            data: foundUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err instanceof Error ? err.message : String(err),
        });
    }
});
exports.getProfile = getProfile;
