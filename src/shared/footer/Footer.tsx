import { FaWhatsapp, FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#b2c2ae] text-black pt-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-6 gap-6 items-start">

        {/* Menú */}
        <div className="flex flex-col space-y-3 text-sm font-semibold">
          <a href="#">Inicio</a>
          <a href="#">Nosotros</a>
          <a href="#">Planes</a>
          <a href="#">Foraneos</a>
          <a href="#">Políticas</a>

          {/* Iconos de redes con hover */}
          <div className="flex space-x-4 pt-4 text-xl">
            <a href="#" className="hover:text-green-600 transition"><FaWhatsapp /></a>
            <a href="#" className="hover:text-green-600 transition"><FaTiktok /></a>
            <a href="#" className="hover:text-green-600 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-green-600 transition"><FaFacebook /></a>
          </div>
        </div>

        {/* Línea vertical */}
        <div className="hidden md:flex justify-center">
          <div className="w-[1px] bg-black h-48"></div>
        </div>

        {/* Centro (Texto y Formulario) */}
        <div className="col-span-1 md:col-span-2 text-center md:text-left space-y-4">
          <h2 className="text-xl font-semibold">Contáctanos</h2>
          <p className="text-sm">
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. <br />
            Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Example@email.com"
              className="w-full md:w-2/3 px-4 py-2 rounded-md bg-gray-100"
            />
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <textarea
                placeholder="Escribe tu mensaje..."
                className="w-full md:w-2/3 px-4 py-2 rounded-md bg-gray-100"
              />
              <button
                type="submit"
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-md shadow-md font-bold"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        {/* Línea vertical */}
        <div className="hidden md:flex justify-center">
          <div className="w-[1px] bg-black h-48"></div>
        </div>

        {/* Info contacto alineada arriba */}
        <div className="text-sm text-center md:text-right md:col-start-6 self-start">
          <p>foraneosIA@gmail.com</p>
          <p>+51 999 999 999</p>
          <p>Av. Lima #1232</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="bg-[#89a18d] text-center py-4 mt-6 text-sm flex items-center justify-center gap-2">
        <span>©</span>
        <p>All rights reserved 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
