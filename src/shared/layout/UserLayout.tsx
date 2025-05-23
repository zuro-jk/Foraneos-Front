import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavbarUser from "../navbar-user/NavbarUser";
import SidebarUser from "../sidebar-user/SidebarUser";
import { useSidebarUserStore } from "../sidebar-user/useSidebarUserStore";

const UserLayout = () => {
  const collapsable = useSidebarUserStore((state) => state.collapsable);

  return (
    <div className="flex min-h-screen w-full">
      {/* <SidebarUser /> */}
      <main
        // className={`bg-white dark:bg-zinc-900 flex-1 md:pt-0 ${
        //   collapsable ? "md:ml-16" : "md:ml-64"
        // }`}
        className="bg-white dark:bg-zinc-900 flex-1 md:pt-0"
      >
        <NavbarUser />
        <Outlet />
        <ToastContainer />
      </main>
    </div>
  );
};

export default UserLayout;
