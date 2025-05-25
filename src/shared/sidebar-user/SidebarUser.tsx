import { cn } from "@/lib/utils";
import { Goal, LogOut, User2 } from "lucide-react";
import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSidebarUserStore } from "./useSidebarUserStore";

const menu = [
  {
    label: "Resumen",
    icon: "/images/icons/overview.png",
    to: "/user/main-dashboard",
  },
  {
    label: "Recetas",
    icon: "/images/icons/recipes.png",
    to: "/user/recipes",
  },
  {
    label: "Nutricionista IA",
    icon: "/images/icons/nutritionist-ia.png",
    to: "/user/nutritionist",
  },
  {
    label: "Calendario",
    icon: FaCalendarAlt,
    to: "/user/schedule",
  },
  {
    label: "Calistenia",
    icon: "/images/icons/calistenia.png",
    to: "/user/calisthenics",
  },
  {
    label: "Social",
    icon: "/images/icons/social.png",
    to: "/user/social",
  },
  {
    label: "Metas",
    icon: Goal,
    to: "/user/targets",
  },
  {
    label: "Metodos de pago",
    icon: FaCreditCard,
    to: "/user/payment-method",
  },
  { label: "Logout", icon: LogOut, to: "/user/logout" },
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
          `flex flex-col min-h-screen bg-white/80 dark:bg-zinc-900/80 shadow-lg py-4 transition-all duration-300 border-r border-gray-200 dark:border-zinc-800 fixed top-0 left-0 z-50 md:translate-x-0 md:flex md:top-16 md:h-[calc(100vh-4rem)] backdrop-blur-[31.8px] px-2`,
          collapsable ? "w-16 items-center" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Boton que colapsa el sidebar */}
        {/* <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className={`cursor-pointer px-4 py-2 outline-none text-gray-500 hover:text-green-700 transition`}
              onClick={() => setCollapsable(!collapsable)}
            >
              {collapsable ? <FaBars size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div> */}
        {!collapsable && (
          // <Link
          //   className="text-[51px] [font-family:'Cookie',sans-serif] text-[#324001] dark:text-[#5dbe5a] text-center"
          //   to="/user/main-dashboard"
          // >
          //   Foraneos
          //   <span className="text-lg relative top-2 [font-family:'RibeyeMarrow'] uppercase">
          //     IA
          //   </span>
          // </Link>
          <div className="flex items-center justify-start gap-2 px-4 py-2">
            <User2 size={24} />
            <div className="flex flex-col">
              <span className="font-bold">Pedro Ramirez</span>
              <span className="text-xs text-gray-500">
                eldiablo123@gmail.com
              </span>
            </div>
          </div>
        )}
        <nav className={cn(`flex flex-col  justify-center gap-2 mt-2`)}>
          {menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 justify-start py-2 rounded font-medium transition ${
                location.pathname === item.to
                  ? "bg-[#A3E89D]/80 dark:bg-green-700"
                  : "hover:bg-green-50"
              }`}
            >
              <span className={`dark:text-white`}>
                {typeof item.icon === "string" ? (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-[20px] h-[20px] dark:invert"
                  />
                ) : (
                  <item.icon
                    size={20}
                    className="dark:text-white"
                  />
                )}
              </span>
              {!collapsable && (
                <span className="text-sm dark:text-white">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
        {!collapsable && (
          <div className="pt-8 mt-auto text-xs text-center text-gray-400">
            © {new Date().getFullYear()} Foraneos IA - Todos los derechos
            reservados
          </div>
        )}
      </aside>
    </>
  );
};

export default SidebarUser;
