import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

type Product = {
  _id: string;
  kode: string;
  nama: string;
  quantity: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/products`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.nama.toLowerCase().includes(search.toLowerCase()) ||
        product.kode.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [search, products]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/products/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        const msg = data?.message;
        toast.error("Gagal", { description: msg });
      }

      setProducts((prev) => prev.filter((p) => p._id !== id));
      const data = await res.json();
      const msg = data?.message;
      toast.success("Berhasil", { description: msg });
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

  return (
    <div className="bg-muted/50 p-6 border rounded-md shadow-sm overflow-x-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Daftar Master Data</h2>
          <p className="text-sm text-muted-foreground">
            Menampilkan{" "}
            <span className="font-semibold">{products.length} master data</span>{" "}
            Product
          </p>
        </div>
        <a href="/add-product">
          <Button className="bg-indigo-800 text-white hover:bg-indigo-900">
            + Tambah
          </Button>
        </a>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 mb-4">
        <Input
          placeholder="Search"
          className="w-full md:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-md bg-white overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Kode</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              paginatedProducts.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>{product.nama}</TableCell>
                  <TableCell>{product.kode}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        type="button"
                        onClick={() =>
                          navigate(`/edit-product/${product._id}`)
                        }>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader className="items-center">
                            <AlertDialogTitle>
                              Apakah Anda yakin?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tindakan ini akan menghapus produk{" "}
                              <strong>{product.nama}</strong>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-indigo-800 text-white hover:bg-indigo-900"
                              onClick={() => handleDelete(product._id)}>
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 overflow-x-auto w-full">
        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground min-w-[400px]">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            <ChevronLeftIcon className="w-4 h-4 mr-1" /> Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              className={
                currentPage === page
                  ? "bg-indigo-800 text-white hover:bg-indigo-900"
                  : "bg-transparent text-black hover:bg-gray-100"
              }
              size="sm"
              onClick={() => setCurrentPage(page)}>
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }>
            Next <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
