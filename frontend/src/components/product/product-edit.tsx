import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/products/${id}`,
          { credentials: "include" }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(`Status: ${res.status}, Response: ${result.message}`);
        }

        const data = result.data;
        setNama(data.nama);
        setKode(data.kode);
        setQuantity(data.quantity);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/products/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama, kode, quantity }),
        }
      );

      const result = await res.json();

      if (!res.ok || result.success === false) {
        const errorMessage = result.message;
        throw new Error(errorMessage);
      }

      toast.success("Berhasil", {
        description: result.message,
      });

      navigate("/list-product");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengubah produk";
      toast.error("Gagal", {
        description: message,
      });
    }
  };

  if (loading) return <div>Loading...</div>;

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
