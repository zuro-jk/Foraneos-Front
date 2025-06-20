import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { useUserStore } from "@/store/userStore";

const Layout = () => {

  const token = useUserStore((state) => state.token);

  // TODO quitar el comentario luego
  // if (token) return <Navigate to="/user" replace/>

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
