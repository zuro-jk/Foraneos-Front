import Button from "../ui/Button";

function PublicHeader() {
  return (
    <header className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white shadow-md">
      <div className="flex justify-between items-center h-16 container mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-xl font-bold tracking-wide">Foráneos</span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex space-x-10 font-medium gap-4">
          <a
            href="/"
            className="hover:text-yellow-100 transition"
          >
            Inicio
          </a>
          <a
            href="/menu"
            className="hover:text-yellow-100 transition"
          >
            Menú
          </a>
          <a
            href="/reservas"
            className="hover:text-yellow-100 transition"
          >
            Reservas
          </a>
          <a
            href="/contacto"
            className="hover:text-yellow-100 transition"
          >
            Contacto
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3 p-4">
          <Button>Iniciar Sesion</Button>
          <Button>Registrarse</Button>
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
