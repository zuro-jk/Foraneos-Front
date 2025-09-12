import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/core/stores/authStore";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth/login"
      replace
    />
  );
}

export default PrivateRoute