import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-amber-100 px-4">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
