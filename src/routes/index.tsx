import { PrivateLayout, PublicLayout } from "@/components/layouts";
import NotFound from "@/components/NotFound";
import { Login, Signup } from "@/features/Auth";
import Dashboard from "@/features/Dashboard/Dashboard";
import Home from "@/features/Home/Home";
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
          path="/auth/login"
          element={<Login />}
        />
        <Route
          path="/auth/signup"
          element={<Signup />}
        />
      </Route>

      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
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
