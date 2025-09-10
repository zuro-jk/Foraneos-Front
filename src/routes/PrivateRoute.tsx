import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // const { isLoggedIn } = useAuthStore();
  const isLoggedIn = false;

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth"
      replace
    />
  );
}

export default PrivateRoute