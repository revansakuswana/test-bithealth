"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/login", authController_1.login);
router.post("/register", authController_1.register);
router.post("/logout", authController_1.logout);
router.get("/profile", authMiddleware_1.default, authController_1.getProfile);
exports.default = router;
