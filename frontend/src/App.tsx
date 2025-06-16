import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "sonner";

import AuthLayout from "@/layout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicOnlyRoute from "@/components/PublicOnlyRoute";

import Login from "@/page/Login";
import Register from "@/page/Register";
import ProductList from "@/components/product/product-list";
import ProductAdd from "./components/product/product-add";
import ProductEdit from "./components/product/product-edit";
import Dashboard from "@/page/Dashboard";
import NotFound from "@/page/NotFound";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* ========== ROUTE AUTH (tanpa dashboard layout) ========== */}
          <Route element={<AuthLayout />}>
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/list-product" element={<ProductList />} />
              <Route path="/add-product" element={<ProductAdd />} />
              <Route path="/edit-product/:id" element={<ProductEdit />} />
              <Route index element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
