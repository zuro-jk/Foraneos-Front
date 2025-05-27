import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { useUserStore } from "@/features/auth/store/userStore";

const Layout = () => {

  const token = useUserStore((state) => state.token);

  if (token) return <Navigate to="/user" replace/>

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-[#f8f8d8]">
        <Outlet />
      </main>
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
};

export default Layout;
