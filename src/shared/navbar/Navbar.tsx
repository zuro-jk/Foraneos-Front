import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <nav className="bg-[#f8f8d8] px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Logo */}
      <div className="text-[1.8rem] font-semibold text-[#3b3b3b]">
        <span className="font-[cursive]">Foraneos</span>{" "}
        <span className="text-sm font-mono">IA</span>
      </div>

      {/* Icono Hamburguesa (solo visible en móviles) */}
      <button
        className="md:hidden text-2xl text-[#3b3b3b] focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menú Desktop */}
      <ul className="hidden md:flex items-center gap-8 text-black font-bold text-base">
        <li>
          <Link to="/" className="hover:text-green-600 transition">
            INICIO
          </Link>
        </li>
        <li>
          <Link to="/planes" className="hover:text-green-600 transition">
            PLANES
          </Link>
        </li>
        <li>
          <Link to="/nosotros" className="hover:text-green-600 transition">
            NOSOTROS
          </Link>
        </li>
        <li>
          {isAuth ? (
            <Link to="/perfil">
              <img
                src="/images/auth/login.webp"
                alt="login"
                className="w-8 h-8 rounded-full object-cover border-2 hover:scale-105 transition"
              />
            </Link>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => setIsAuth(true)}>Iniciar Sesion</Button>
              <Button variant="outline">Registrarse</Button>
            </div>
          )}
        </li>
      </ul>

      {/* Menú Mobile (visible cuando isOpen es true) */}
      {isOpen && (
        <ul className="absolute top-[72px] left-0 w-full bg-[#f8f8d8] flex flex-col items-center gap-6 py-6 text-black font-bold text-lg shadow-md md:hidden transition-all z-40">
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-600 transition"
            >
              INICIO
            </Link>
          </li>
          <li>
            <Link
              to="/planes"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-600 transition"
            >
              PLANES
            </Link>
          </li>
          <li>
            <Link
              to="/nosotros"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-600 transition"
            >
              NOSOTROS
            </Link>
          </li>
          <li>
            <Link to="/perfil" onClick={() => setIsOpen(false)}>
              <img
                src="src/public/image/login.webp"
                alt="login"
                className="w-10 h-10 rounded-full object-cover border-2 hover:scale-105 transition"
              />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
