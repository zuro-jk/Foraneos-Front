import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { ToastContainer } from "react-toastify";

const Layout = () => {
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
