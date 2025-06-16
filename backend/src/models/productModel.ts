import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    kode: { type: String, required: true, unique: true },
    nama: { type: String, required: true },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
