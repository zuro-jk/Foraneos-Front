import { PrivateLayout, PublicLayout } from "@/components/layouts";
import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import NotFound from "@/components/NotFound";
import DashboardAdmin from "@/features/admin/dashboard/Dashboard";
import Login from "@/features/auth/login/Login";
import Signup from "@/features/auth/signup/Signup";
import SalesCashier from "@/features/cashier/sales/Sales";
import OrdersChef from "@/features/chef/orders/Orders";
import Contact from "@/features/client/contact/Contact";
import Home from "@/features/client/home/Home";
import Menu from "@/features/client/menu/Menu";
import Reservations from "@/features/client/reservations/Reservations";
import ProductsSupplier from "@/features/supplier/products/Products";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/menu"
          element={<Menu />}
        />
        <Route
          path="/reservations"
          element={<Reservations />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route
          path="/auth/login"
          element={<Login />}
        />
        <Route
          path="/auth/signup"
          element={<Signup />}
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={<DashboardAdmin />}
          />
          {/* Chef */}
          <Route
            path="/chef/orders"
            element={<OrdersChef />}
          />
          {/* Cashier */}
          <Route
            path="/cashier/sales"
            element={<SalesCashier />}
          />
          {/* Supplier */}
          <Route
            path="/supplier/products"
            element={<ProductsSupplier />}
          />
        </Route>
      </Route>

      {/* Ruta fallback */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}
