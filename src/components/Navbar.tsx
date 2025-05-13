
import { Link } from 'react-router-dom'
import '../components/styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="bg-[#f8f8d8] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="text-[1.8rem] font-semibold text-[#3b3b3b]">
        <span className="font-[cursive]">Foraneos</span>{' '}
        <span className="text-sm font-mono">IA</span>
      </div>

      {/* Navegación */}
      <ul className="hidden md:flex items-center gap-8 text-black font-bold text-base">
        <li>
          <Link to="/" className="hover:text-green-600 transition">INICIO</Link>
        </li>
        <li>
          <Link to="/planes" className="hover:text-green-600 transition">PLANES</Link>
        </li>
        <li>
          <Link to="/nosotros" className="hover:text-green-600 transition">NOSOTROS</Link>
        </li>
        <li>
          <Link to="/perfil">
            <img src="src/public/image/login.webp" alt="login" className="w-8 h-8 rounded-full object-cover border-2 hover:scale-105 transition"/>
          </Link>
        </li>
      </ul>

      {/* Responsive: Menú móvil (coloca esto más adelante si lo deseas) */}
    </nav>
  );
};

export default Navbar;
