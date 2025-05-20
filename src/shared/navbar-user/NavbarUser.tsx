import { cn } from "@/lib/utils";
import { Bell, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSidebarUserStore } from "../sidebar-user/useSidebarUserStore";
import { useTheme } from "../theme-provider/useTheme";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import NotificationCard from "./components/notification-card/NotificationCard";

const NavbarUser = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const setMobileOpen = useSidebarUserStore((state) => state.setMobileOpen);
  const [tab, setTab] = useState<"all" | "unread" | "archived">("all");

  useHotkeys(
    "shift+p",
    () => {
      navigate("/user/profile");
    },
    { preventDefault: true }
  );

  useHotkeys(
    "shift+c",
    () => {
      navigate("/user/settings");
    },
    { preventDefault: true }
  );

  useHotkeys(
    "shift+t",
    () => {
      navigate("/");
    },
    { preventDefault: true }
  );

  return (
    <nav className="sticky top-0 z-40 w-full bg-white dark:bg-zinc-900 shadow-lg dark:border-zinc-800 border flex items-center justify-between px-4 py-2 h-16">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="md:hidden mr-2 cursor-pointer"
          onClick={() => setMobileOpen(true)}
        >
          <FaBars size={20} />
        </Button>
        {/* Logo o nombre */}
        <Link
          className="text-xl [font-family:'Cookie',sans-serif] text-[#324001] dark:text-[#5dbe5a] text-center"
          to="/user/main-dashboard"
        >
          Foraneos
          <span className="text-lg relative top-2 [font-family:'RibeyeMarrow'] uppercase">
            IA
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="cursor-pointer"
              variant="outline"
              size="icon"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer"
              aria-label="Ver notificaciones"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute bg-yellow-500 h-2 w-2 rounded-full bottom-2.5 right-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0 rounded-lg shadow-lg">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pt-4 px-4">
                <span className="font-bold ">Notificaciones</span>
                <span className="underline font-semibold text-xs">
                  Marcar todo como leido
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 px-4 gap-4">
                <div className="flex gap-4">
                  <button
                    className={cn(
                      `cursor-pointer flex gap-1 items-center justify-center py-2 text-xs font-medium transition`,
                      tab === "all"
                        ? "border-b-2 border-zinc-600 text-zinc-700 dark:text-zinc-400"
                        : "text-gray-500 dark:text-gray-400"
                    )}
                    onClick={() => setTab("all")}
                  >
                    Todas
                    <span className="bg-zinc-900/90 text-white px-2 py-0.5 rounded dark:bg-blue-800/80">
                      8
                    </span>
                  </button>
                  <button
                    className={cn(
                      `cursor-pointer flex gap-1 items-center justify-center py-2 text-xs font-medium transition`,
                      tab === "unread"
                        ? "border-b-2 border-zinc-600 text-zinc-700 dark:text-zinc-400"
                        : "text-gray-500 dark:text-gray-400"
                    )}
                    onClick={() => setTab("unread")}
                  >
                    No leidas
                    <span className="text-zinc-600 px-2 py-0.5 rounded">8</span>
                  </button>
                  <button
                    className={cn(
                      `cursor-pointer flex gap-1 items-center justify-center py-2 text-xs font-medium transition`,
                      tab === "archived"
                        ? "border-b-2 border-zinc-600 text-zinc-700 dark:text-zinc-400"
                        : "text-gray-500 dark:text-gray-400"
                    )}
                    onClick={() => setTab("archived")}
                  >
                    Archivadas
                    {/* <span className="text-zinc-600 px-2 py-0.5 rounded">8</span> */}
                  </button>
                </div>

                <button className="cursor-pointer rounded px-2 py-1 text-gray-500">
                  <Settings size={18} />
                </button>
              </div>
              <div className="px-4 py-2">
                {tab === "all" && (
                  <div className="flex flex-col gap-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <NotificationCard
                        key={index}
                        isLast={index === 4}
                      />
                    ))}
                  </div>
                )}
                {tab === "unread" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-400 dark:text-gray-500 text-center py-8">
                      No tienes notificaciones no leídas
                    </div>
                  </div>
                )}
                {tab === "archived" && (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-400 dark:text-gray-500 text-center py-8">
                      No tienes notificaciones archivadas
                    </div>
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User /> Mi Perfil
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings /> Configuración
                <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut /> Cerrar sesión
                <DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavbarUser;
