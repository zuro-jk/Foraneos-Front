import { useMe } from "@/features/auth/hooks/useAuth";
import { useUserStore } from "@/features/auth/store/userStore";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavbarUser from "../navbar-user/NavbarUser";
import SidebarUser from "../sidebar-user/SidebarUser";
import { useSidebarUserStore } from "../sidebar-user/useSidebarUserStore";

const UserLayout = () => {
  const collapsable = useSidebarUserStore((state) => state.collapsable);
  const token = useUserStore((state) => state.token);
  const setUser = useUserStore((state) => state.setUser);

  const { data: user } = useMe(token!);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/images/recipes/fondo.jpg')] bg-cover bg-no-repeat bg-center">
      <NavbarUser />
      <div className="flex flex-1">
        <SidebarUser />
        <main
          className={`dark:bg-zinc-900 flex-1 md:pt-0 ${
            collapsable ? "md:ml-16" : "md:ml-64"
          }`}
          // className="bg-white dark:bg-zinc-900 flex-1 md:pt-0"
        >
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLayout;
