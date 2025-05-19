import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const Footer = () => {
  return (
    <footer className="bg-[#b2c2ae] text-black pt-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
        {/* Menú */}
        <div className="flex flex-col space-y-3 text-sm font-semibold">
          <Link to="/">Inicio</Link>
          <Link to="#">Nosotros</Link>
          <Link to="#">Planes</Link>
          <Link to="#">Foraneos</Link>
          <Link to="#">Políticas</Link>

          {/* Iconos de redes con hover */}
          <div className="flex space-x-4 pt-4 text-xl">
            <a
              href="#"
              className="hover:text-green-600 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition"
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-green-600 transition"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Línea vertical */}
        <div className="hidden md:flex justify-center">
          <div className="w-[1px] bg-black h-48"></div>
        </div>

        {/* Centro (Texto y Formulario) */}
        <div className="col-span-1 md:col-span-2 text-center md:text-left space-y-4">
            <h2 className="text-xl font-semibold text-center">Contáctanos</h2>
            <p className="text-sm text-justify">
            ¿Tienes alguna pregunta o comentario? Escríbenos y nos pondremos en contacto contigo lo antes posible.
            Estamos aquí para ayudarte con cualquier duda sobre nuestros servicios.
            </p>
          <form className="grid grid-cols-6 gap-4">
            <Input
              type="email"
              placeholder="Example@email.com"
              className="col-span-6 w-full px-4 py-2 rounded-md bg-gray-100"
            />
            <Textarea
              placeholder="Escribe tu mensaje aquí..."
              className="bg-gray-100 col-span-4"
            />
            <Button
              type="button"
              variant="outline"
              className="h-full col-span-2"
            >
              Enviar
            </Button>
          </form>
        </div>

        {/* Línea vertical */}
        <div className="hidden md:flex justify-center">
          <div className="w-[1px] bg-black h-48"></div>
        </div>

        {/* Info contacto alineada arriba */}
        <div className="flex flex-col gap-4 text-black/80 text-sm text-center md:text-right md:col-start-6 self-start">
          <p>foraneosIA@gmail.com</p>
          <p>+51 999 999 999</p>
          <p>Av. Lima #1232</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="bg-[#89a18d] text-center py-4 mt-6 text-sm flex items-center justify-center gap-2 font-semibold">
        <span>©</span>
        <p>All rights reserved 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
