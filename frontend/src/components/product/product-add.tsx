import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const productSchema = z.object({
  nama: z.string().min(1, "Nama produk wajib diisi"),
  kode: z.string().min(1, "Kode produk wajib diisi"),
  quantity: z.number().positive("Quantity harus lebih dari 0"),
});

export default function ProductAdd() {
  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();

  const handleReset = () => {
    setNama("");
    setKode("");
    setQuantity(0);
  };

  const handleErrorResponse = async (response: Response) => {
    const contentType = response.headers.get("Content-Type");
    const isJson = contentType?.includes("application/json");
    const data = isJson ? await response.json() : null;

    const msg = data?.message;
    toast.error(msg);

    if (Array.isArray(data?.errors)) {
      data.errors.forEach((err: string) => {
        toast.error(err);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nama: nama.trim(),
      kode: kode.trim(),
      quantity,
    };

    const validation = productSchema.safeParse(payload);

    if (!validation.success) {
      validation.error.errors.forEach((err) => {
        toast.error("Validasi Gagal", {
          description: err.message,
        });
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/products`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        await handleErrorResponse(response);
        return;
      }

      toast.success("Berhasil", {
        description: "Produk berhasil ditambahkan",
      });

      navigate("/list-product");
      handleReset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menambahkan produk";
      toast.error("Gagal", {
        description: message,
      });
    }
  };

  return (
    <div className="bg-muted/50 p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Informasi Master Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-2">Nama Produk</Label>
          <Input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div>
          <Label className="mb-2">Kode Produk</Label>
          <Input
            type="text"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            required
          />
        </div>
        <div>
          <Label className="mb-2">Quantity</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Batal
          </Button>
          <Button
            type="submit"
            className="bg-indigo-800 text-white hover:bg-indigo-900">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}
