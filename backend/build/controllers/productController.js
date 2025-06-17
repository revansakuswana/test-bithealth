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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const productValidator_1 = require("../validators/productValidator");
// GET all products
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
        res.status(200).json({ success: true, data: products });
    }
    catch (_a) {
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data produk",
        });
    }
});
exports.getAllProducts = getAllProducts;
// GET product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productModel_1.default.findById(id);
        if (!product) {
            res
                .status(404)
                .json({ success: false, message: "Produk tidak ditemukan" });
            return;
        }
        res.status(200).json({ success: true, data: product });
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: "Gagal mengambil produk", error: err });
    }
});
exports.getProductById = getProductById;
// POST create product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = productValidator_1.productSchema.safeParse(req.body);
        if (!parsed.success) {
            const errorMessages = parsed.error.errors.map((err) => err.message);
            res.status(400).json({
                success: false,
                message: "Semua field wajib diisi",
                errors: errorMessages,
            });
            return;
        }
        const { kode, nama, quantity } = parsed.data;
        const existing = yield productModel_1.default.findOne({ kode });
        if (existing) {
            res
                .status(400)
                .json({ success: false, message: "Kode produk sudah digunakan" });
            return;
        }
        const product = new productModel_1.default({ kode, nama, quantity });
        yield product.save();
        res.status(201).json({
            success: true,
            message: "Produk berhasil ditambahkan",
            data: product,
        });
    }
    catch (_a) {
        res.status(500).json({
            success: false,
            message: "Gagal menambahkan produk",
        });
    }
});
exports.createProduct = createProduct;
// PUT update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { kode, nama, quantity } = req.body;
        const updatedProduct = yield productModel_1.default.findByIdAndUpdate(id, { kode, nama, quantity }, { new: true });
        if (!updatedProduct) {
            res
                .status(404)
                .json({ success: false, message: "Produk tidak ditemukan" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Produk berhasil diperbarui",
            data: updatedProduct,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Gagal memperbarui produk",
            error: err,
        });
    }
});
exports.updateProduct = updateProduct;
// DELETE product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield productModel_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res
                .status(404)
                .json({ success: false, message: "Produk tidak ditemukan" });
            return;
        }
        res.status(200).json({ success: true, message: "Produk berhasil dihapus" });
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: "Gagal menghapus produk", error: err });
    }
});
exports.deleteProduct = deleteProduct;
