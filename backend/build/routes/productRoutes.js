"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const roleMiddleware_1 = __importDefault(require("../middlewares/roleMiddleware"));
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.default, productController_1.getAllProducts);
router.get("/:id", authMiddleware_1.default, (0, roleMiddleware_1.default)(["admin"]), productController_1.getProductById);
router.post("/", authMiddleware_1.default, (0, roleMiddleware_1.default)(["admin"]), productController_1.createProduct);
router.put("/:id", authMiddleware_1.default, (0, roleMiddleware_1.default)(["admin"]), productController_1.updateProduct);
router.delete("/:id", authMiddleware_1.default, (0, roleMiddleware_1.default)(["admin"]), productController_1.deleteProduct);
exports.default = router;
