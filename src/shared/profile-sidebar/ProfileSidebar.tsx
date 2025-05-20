import {
  Bell,
  Download,
  Landmark,
  Lock,
  Settings2,
  UserPen,
  UserX,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const linkClass =
  "font-normal flex items-center py-2 px-5 justify-start gap-2 cursor-pointer text-gray-500 hover:bg-gray-200 transition-all duration-200 w-fit rounded-full";

const activeLinkClass =
  "text-green-800 w-fit font-semibold bg-green-300/80 py-2 px-5 rounded-full flex items-center justify-start gap-2 cursor-pointer hover:bg-green-500/80 transition-all duration-200";

const ProfileSidebar = () => {
  return (
    <ul className="flex flex-col h-[55vh] gap-4 p-4">
      <NavLink
        to="/user/account/profile"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeLinkClass : "text-gray-500"}`
        }
      >
        <span>
          <UserPen />
        </span>
        Mi Perfil
      </NavLink>
      <NavLink
        to="/user/account/security"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeLinkClass : "text-gray-500"}`
        }
      >
        <span>
          <Lock />
        </span>
        Seguridad
      </NavLink>
      <NavLink
        to="/user/account/preferences"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeLinkClass : "text-gray-500"}`
        }
      >
        <span>
          <Settings2 />
        </span>
        Preferencias
      </NavLink>
      <NavLink
        to="/user/account/notifications"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeLinkClass : "text-gray-500"}`
        }
      >
        <span>
          <Bell />
        </span>
        Notificaciones
      </NavLink>
      <NavLink
        to="/user/account/wallet"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeLinkClass : "text-gray-500"}`
        }
      >
        <span>
          <Landmark />
        </span>
        Historial de pagos
      </NavLink>
      <li className={`${linkClass}`}>
        <span>
          <Download />
        </span>
        Data Export
      </li>
      <li className={`${linkClass} text-red-500 mt-auto`}>
        <span>
          <UserX />
        </span>
        Eliminar mi cuenta
      </li>
    </ul>
  );
};

export default ProfileSidebar;
