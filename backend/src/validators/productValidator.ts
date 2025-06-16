import { z } from "zod";

export const productSchema = z.object({
  kode: z.string().min(1, "Kode produk wajib diisi"),
  nama: z.string().min(1, "Nama produk wajib diisi"),
  quantity: z.number().nonnegative().optional(),
});