import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import {
  FaAppleAlt,
  FaBars,
  FaCalendarAlt,
  FaCog,
  FaCreditCard,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSidebarUserStore } from "./useSidebarUserStore";

const menu = [
  { label: "Dashboard", icon: <FaHome />, to: "/user/main-dashboard" },
  { label: "Perfil", icon: <FaUser />, to: "/user/profile" },
  { label: "Calendario", icon: <FaCalendarAlt />, to: "/user/schedule" },
  { label: "Ingredientes", icon: <FaAppleAlt />, to: "/user/ingredients" },
  { label: "Pagos", icon: <FaCreditCard />, to: "/user/payment-method" },
  { label: "Configuración", icon: <FaCog />, to: "/user/settings" },
];

const SidebarUser = () => {
  const { collapsable, setCollapsable, mobileOpen, setMobileOpen } =
    useSidebarUserStore();
  const location = useLocation();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/40 transition-opacity md:hidden z-50",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none z-[-1]"
        )}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={cn(
          `flex flex-col min-h-screen bg-white dark:bg-zinc-900/80 shadow-lg py-4 px-4 transition-all duration-300 border-r border-gray-200 dark:border-zinc-800 fixed top-0 left-0 z-50 md:translate-x-0 md:flex`,
          collapsable ? "w-16 items-center" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className={`flex items-center justify-center gap-2`}>
          {!collapsable && (
            <Link
              className="text-[51px] [font-family:'Cookie',sans-serif] text-[#324001] dark:text-[#5dbe5a] text-center"
              to="/user/main-dashboard"
            >
              Foraneos
              <span className="text-lg relative top-2 [font-family:'RibeyeMarrow'] uppercase">
                IA
              </span>
            </Link>
          )}
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className={`cursor-pointer px-4 py-2 outline-none text-gray-500 hover:text-green-700 transition`}
              onClick={() => setCollapsable(!collapsable)}
            >
              {collapsable ? <FaBars size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>
        </div>

        <nav className={cn(`flex flex-col  justify-center gap-2 mt-4`)}>
          {menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 justify-start py-2 rounded font-medium transition ${
                location.pathname === item.to
                  ? "bg-green-100 dark:bg-green-700"
                  : "hover:bg-green-50"
              }`}
            >
              <span className={`text-xl dark:text-white`}>{item.icon}</span>
              {!collapsable && (
                <span className="dark:text-white">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
        {!collapsable && (
          <div className="mt-auto text-xs text-gray-400 text-center pt-8">
            © {new Date().getFullYear()} Foraneos IA - Todos los derechos
            reservados
          </div>
        )}
      </aside>
    </>
  );
};

export default SidebarUser;
