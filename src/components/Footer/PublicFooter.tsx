function PublicFooter() {
  return (
    <footer className="bg-gradient-to-r from-red-700 via-amber-600 to-red-600 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            <path d="M12 2a9 9 0 00-9 9c0 6.075 9 11 9 11s9-4.925 9-11a9 9 0 00-9-9z" />
          </svg>
          <span className="font-semibold text-lg">Foraneos</span>
        </div>

        {/* Links */}
        <nav className="flex gap-6 text-sm font-medium">
          <a
            href="/about"
            className="hover:text-amber-200 transition-colors"
          >
            Sobre nosotros
          </a>
          <a
            href="/menu"
            className="hover:text-amber-200 transition-colors"
          >
            Menú
          </a>
          <a
            href="/contact"
            className="hover:text-amber-200 transition-colors"
          >
            Contacto
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-200">
          © {new Date().getFullYear()} Foraneos. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default PublicFooter;
