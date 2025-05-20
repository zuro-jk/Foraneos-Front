import Footer from "@/shared/footer/Footer";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { User } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import comidaImg from "/images/inicio/card-comida-carousel.png";

const reviews = [
  {
    id: 1,
    name: "Hector",
    review:
      "Gracias a Foráneos IA encontré un menú que me recordó a casa. ¡La sopa de pollo fue increíble!",
    img: comidaImg,
  },
  {
    id: 2,
    name: "Joe",
    review:
      "Me encantó la variedad de opciones saludables. Ahora comer bien es mucho más fácil.",
    img: comidaImg,
  },
  {
    id: 3,
    name: "Aaron",
    review:
      "El sistema de recomendaciones es muy preciso. Probé un platillo nuevo y fue un éxito.",
    img: comidaImg,
  },
  {
    id: 4,
    name: "Marcelo",
    review:
      "La atención al cliente es excelente y la app es muy intuitiva.!",
    img: comidaImg,
  },
  {
    id: 5,
    name: "Hugo",
    review:
      "Nunca pensé que encontraría comida tan rica lejos de casa. ¡Gracias por las sugerencias!",
    img: comidaImg,
  },
];

const Home = () => {
  return (
    <div className="relative">
      {/* Sección Foraneos IA */}
      <section className="flex items-center justify-center h-[93vh] gap-42">
        <div className="flex flex-col justify-center gap-4 w-[50rem]">
          <img
            src="/images/inicio/title-header.png"
            alt="Title"
            className="w-[10rem] md:w-[15rem] lg:w-[20rem] xl:w-[55rem]"
          />
          <span className="lg:ml-28 xl:ml-56">
            Foráneos IA te ayuda a encontrar los mejores platillos y servicios
            para sentirte como en casa, estés donde estés. Descubre
            recomendaciones personalizadas y disfruta de una experiencia única.
          </span>
          <Link to="/login">
            <Button className="w-fit lg:ml-28 xl:ml-56">Comenzar</Button>
          </Link>
        </div>
        <img
          src="/images/inicio/food-plato-hojas.png"
          alt="Comida Saludable"
          className="w-[20rem] h-[20rem] lg:w-[40rem] lg:h-[40rem] pointer-events-none"
        />
      </section>

      {/* Imagen hoja superpuesta */}
      <img
        src="/images/inicio/hoja.png"
        alt="hoja"
        className="absolute top-[75vh] -translate-y-18  w-96 select-none z-20 pointer-events-none"
      />

      {/* Seccion acerca de */}
      <section
        className="h-[100vh] bg-white"
        style={{
          backgroundImage: `url(/images/inicio/about-us.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src="/images/inicio/ingredients-food.png"
          alt="food"
          className="absolute top-[22%] left-1/2 -translate-x-1/2 pointer-events-none h-[40rem] w-[40rem]"
        />
        <img
          src="/images/inicio/content-of-food.png"
          alt="Content"
          className="absolute top-[35%] right-10 -translate-y-1/2 pointer-events-none"
        />
        <div
          className="absolute top-[23%] left-[70%] w-[30rem] text-center"
          style={{ zIndex: 3 }}
        >
          <span className="text-7xl [font-family:'Cookie',sans-serif] relative">
            ¿Qué es Foraneos ?
            <span className="text-lg absolute top-[60%] [font-family:'RibeyeMarrow'] uppercase">
              IA
            </span>
          </span>
          <p className="">
            Foráneos IA es una plataforma que utiliza inteligencia artificial
            para recomendarte los mejores platillos y servicios en tu ciudad.
            Nuestro objetivo es ayudarte a sentirte como en casa, descubriendo
            sabores y experiencias únicas adaptadas a tus gustos y necesidades.
          </p>
        </div>
        <div
          className="absolute top-[38%] left-[40%] w-[30rem] text-center"
          style={{ zIndex: 3 }}
        >
          <span className="text-7xl [font-family:'Cookie',sans-serif] relative">
            ¿Es saludable?
            <span className="text-lg absolute top-[60%] [font-family:'RibeyeMarrow'] uppercase">
              IA
            </span>
          </span>
          <p className="">
            Sí, Foráneos IA se preocupa por tu bienestar. Nuestras
            recomendaciones priorizan opciones saludables y equilibradas,
            adaptadas a tus preferencias alimenticias. Queremos que disfrutes de
            platillos deliciosos sin descuidar tu salud.
          </p>
        </div>
      </section>

      <section className="h-[120vh] bg-white border-b border-black relative">
        <img
          src="/images/inicio/card-plan.png"
          alt="fondo"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="flex items-center justify-center h-full">
          <div className="bg-gradient-to-br from-[#B3D98F] to-[#bce2c3] shadow-xl w-[30rem] rounded-xl flex flex-col gap-12 p-8 items-center justify-center relative">
            <div className="absolute bg-black w-[30rem] h-[1rem] -top-1 rounded-tl-xl rounded-tr-2xl z-10" />
            <span className="font-bold text-3xl">Te Ofrecemos</span>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="Recomendaciones"
                >
                  🍽️
                </span>
                Recomendaciones de comida solo para ti
              </li>
              <li className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="Saludable"
                >
                  🥗
                </span>
                Opciones saludables y variadas
              </li>
              <li className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="Opiniones"
                >
                  💬
                </span>
                Opiniones de otros usuarios
              </li>
              <li className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="Facil de usar"
                >
                  📱
                </span>
                Fácil de usar en cualquier momento
              </li>
              <li className="flex items-center gap-2">
                <span
                  role="img"
                  aria-label="Soporte"
                >
                  🤝
                </span>
                Soporte personalizado
              </li>
            </ul>
            <div className="relative">
              <span className="absolute -top-1 -left-4">S/</span>
              <span className="text-5xl font-bold">7.99</span>
              <span className="absolute top-6">/mes</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button className="bg-[#B1DF88] text-black font-bold hover:bg-[#a4cf7e]/80">
                Continuar sin anuncios
              </Button>
              <span className="text-[8px] underline">
                Continuar con anuncios
              </span>
            </div>
          </div>
        </div>
      </section>

      <img
        src="/images/inicio/hoja.png"
        alt="hoja"
        className="absolute top-[72%] left-[1521px] -translate-y-18 w-96 select-none z-20 pointer-events-none -scale-x-100"
      />

      {/* Carrusel */}
      <section className="bg-[url('/images/inicio/fondo-carruseles.png')] bg-white bg-cover bg-[position:center_10%] py-24">
        <div className="h-full flex items-center justify-center">
          <Carousel
            plugins={[
              AutoScroll({
                speed: 3,
                stopOnInteraction: false,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl"
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="w-full md:basis-1/2 lg:basis-1/3 p-4"
                >
                  <div className="bg-white/90 rounded-2xl shadow-2xl p-4 flex flex-col items-center gap-6 max-w-md mx-auto border border-green-100 h-[28rem]">
                    {/* Avatar y nombre */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-green-200 rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2">
                        <User className="w-10 h-10 text-green-800" />
                      </div>
                      <span className="font-bold text-2xl text-green-900">
                        {review.name}
                      </span>
                    </div>
                    {/* Review */}
                    <p className="italic text-center text-gray-700 text-lg relative px-4">
                      <span className="text-3xl text-green-400 absolute left-0 -top-2">
                        “
                      </span>
                      <span className="text-md">
                      {review.review}
                      </span>
                      <span className="text-3xl text-green-400 absolute right-0 -bottom-2">
                        ”
                      </span>
                    </p>
                    {/* Imagen de comida */}
                    <img
                      src={review.img}
                      alt="Comida"
                      className="object-cover w-40 h-28 rounded-xl shadow"
                    />
                    {/* Estrellas */}
                    <div className="flex gap-1 justify-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          className="text-yellow-400"
                          key={i}
                        />
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
