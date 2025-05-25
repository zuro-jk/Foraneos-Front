import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const Footer = () => {
  return (
    <footer className="bg-[#b2c2ae] text-black pt-8">
      <div className="grid items-start grid-cols-1 gap-6 px-6 mx-auto max-w-7xl sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {/* Menú */}
        <div className="flex flex-col space-y-3 text-sm font-semibold">
          <Link to="/">Inicio</Link>
          <Link to="#">Nosotros</Link>
          <Link to="#">Planes</Link>
          <Link to="#">Foraneos</Link>
          <Link to="#">Políticas</Link>

          {/* Iconos de redes con hover */}
          <div className="flex pt-4 space-x-4 text-xl">
            <a
              href="#"
              className="transition hover:text-green-600"
            >
              <FaWhatsapp />
            </a>
            <a
              href="#"
              className="transition hover:text-green-600"
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              className="transition hover:text-green-600"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="transition hover:text-green-600"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Línea vertical */}
        <div className="justify-center hidden md:flex">
          <div className="w-[1px] bg-black h-48"></div>
        </div>

        {/* Centro (Texto y Formulario) */}
        <div className="col-span-1 space-y-4 text-center md:col-span-2 md:text-left">
            <h2 className="text-xl font-semibold text-center">Contáctanos</h2>
            <p className="text-sm text-justify">
            ¿Tienes alguna pregunta o comentario? Escríbenos y nos pondremos en contacto contigo lo antes posible.
            Estamos aquí para ayudarte con cualquier duda sobre nuestros servicios.
            </p>
          <form className="grid grid-cols-6 gap-4">
            <Input
              type="email"
              placeholder="Example@email.com"
              className="w-full col-span-6 px-4 py-2 bg-gray-100 rounded-md"
            />
            <Textarea
              placeholder="Escribe tu mensaje aquí..."
              className="col-span-4 bg-gray-100"
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
        <div className="justify-center hidden md:flex">
          <div className="w-[1px] bg-black h-48"></div>
        </div>

        {/* Info contacto alineada arriba */}
        <div className="flex flex-col self-start gap-4 text-sm text-center text-black/80 md:text-right md:col-start-6">
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
