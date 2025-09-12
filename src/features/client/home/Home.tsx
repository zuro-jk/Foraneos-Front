import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-red-50">
      {/* Header con Logo y Menú */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="public/images/inicio/centralLogo.png"
              alt="Foraneos Logo"
              className="w-24 h-12 object-contain"
            />
          </div>

          {/* Menú Hamburguesa */}
          <div className="relative flex flex-row gap-4">

            <div className="text-white flex gap-2 items-center justify-center">
              <Link to="/menu">Menu</Link>
              <Link to="/reservations">Reservas</Link>
              <Link to="/contact">Contacto</Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
            >
              <div
                className={`w-6 h-0.5 bg-red-600 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-red-600 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-red-600 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="py-2">
                  <Link
                    to="/auth/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Registrarse
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sección de Bienvenida con Video */}
      <section className="relative flex items-center justify-center text-center h-screen overflow-hidden">
        {/* Video de Fondo */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.7)" }}
          >
            <source
              src="/public/images/inicio/227131.mp4"
              type="video/mp4"
            />
            {/* Fallback para navegadores que no soporten video */}
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-amber-600"></div>
          </video>
          {/* Overlay para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Contenido sobre el video */}
        <div className="flex flex-col items-center justify-start h-screen w-full pt-2">
          <h1
            className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mt-2"
            style={{ fontFamily: "Asimovian, sans-serif" }}
          >
            Bienvenido
          </h1>
          <div className="absolute left-8 bottom-8">
            <p className="text-white text-lg bg-black/50 px-4 py-2 rounded-lg shadow-md">
              Av. Principal 123, Ciudad, País
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-10 bg-white">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-16">
          Platos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[
            {
              name: "Lomo Saltado",
              img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Lomo-saltado-perudelights.jpg/960px-Lomo-saltado-perudelights.jpg",
            },
            {
              name: "Ceviche Fresco",
              img: "https://www.peru.travel/Contenido/Noticia/Imagen/es/1990/1.0/Principal/ceviche-desktop.jpg",
            },
            {
              name: "Causa Limeña",
              img: "https://d2j9trpqxd6hrn.cloudfront.net/uploads/recipe/main_image/889/causa_limen%CC%83a.webp",
            },
          ].map((dish) => (
            <div
              key={dish.name}
              className="bg-amber-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <img
                src={dish.img}
                alt={dish.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {dish.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 px-10 text-center bg-gradient-to-r from-amber-100 to-red-100">
        <h2 className="text-4xl font-bold text-red-700 mb-10">
          Sobre Nosotros
        </h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed">
          En Foraneos creemos en la magia de la buena comida y en la importancia
          de compartir momentos inolvidables. Usamos ingredientes frescos,
          recetas auténticas y un ambiente acogedor para que cada visita sea
          especial.
        </p>
      </section>

      <section className="py-24 px-10 bg-gradient-to-r from-red-50 to-amber-50 relative">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-16">
          Encuéntranos
        </h2>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 mb-10">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Info izquierda */}
            <div className="flex-1 flex flex-col justify-center md:items-start items-center text-center md:text-left">
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  📍 Dirección
                </h3>
                <p className="text-gray-700">Av. Principal 123, Lima – Perú</p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  🕒 Horarios
                </h3>
                <p className="text-gray-700">
                  Lunes a Domingo: 12:00pm – 11:00pm
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  📞 Reservas
                </h3>
                <p className="text-gray-700">(+51) 987 654 321</p>
              </div>
            </div>
            {/* Mapa derecha */}
            <div className="flex-1 flex items-center justify-center">
              <iframe
                className="w-full h-96 rounded-xl shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.556090624784!2d-77.04279308460676!3d-12.046373745152861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b3f7e7a28b%3A0x2c4d1d4c2e27491d!2sPlaza%20Mayor%20de%20Lima!5e0!3m2!1ses-419!2spe!4v1700000000000"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
