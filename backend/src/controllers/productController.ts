import { Request, Response } from "express";
import Product from "../models/productModel";
import { productSchema } from "../validators/productValidator";

// GET all products
export const getAllProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data produk",
    });
  }
};

// GET product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });
      return;
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil produk", error: err });
  }
};

// POST create product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = productSchema.safeParse(req.body);

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

    const existing = await Product.findOne({ kode });
    if (existing) {
      res
        .status(400)
        .json({ success: false, message: "Kode produk sudah digunakan" });
      return;
    }

    const product = new Product({ kode, nama, quantity });
    await product.save();
    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      data: product,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan produk",
    });
  }
};

// PUT update product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { kode, nama, quantity } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { kode, nama, quantity },
      { new: true }
    );

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui produk",
      error: err,
    });
  }
};

// DELETE product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });
      return;
    }

    res.status(200).json({ success: true, message: "Produk berhasil dihapus" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Gagal menghapus produk", error: err });
  }
};
