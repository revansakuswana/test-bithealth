"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    kode: zod_1.z.string().min(1, "Kode produk wajib diisi"),
    nama: zod_1.z.string().min(1, "Nama produk wajib diisi"),
    quantity: zod_1.z.number().nonnegative().optional(),
});
