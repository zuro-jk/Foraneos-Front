import Footer from "@/shared/footer/Footer";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
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
    review: "La atención al cliente es excelente y la app es muy intuitiva.!",
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
      <section className="flex flex-col lg:flex-row items-center justify-center h-[93vh] gap-4 lg:gap-42">
        <div className="flex flex-col justify-center w-2/3 gap-4">
          <img
            src="/images/inicio/title-header.png"
            alt="Title"
            className="w-[10rem] md:w-[15rem] lg:w-[20rem] xl:w-[55rem]"
          />
          <span className="ml-0 md:ml-14 lg:ml-28 xl:ml-56">
            Foráneos IA te ayuda a encontrar los mejores platillos y servicios
            para sentirte como en casa, estés donde estés. Descubre
            recomendaciones personalizadas y disfruta de una experiencia única.
          </span>
          <Link to="/login">
            <button className="ml-0 md:ml-14 lg:ml-28 xl:ml-56 w-fit">
              Comenzar
            </button>
          </Link>
        </div>
        <img
          src="/images/inicio/food-plato-hojas.png"
          alt="Comida Saludable"
          className="w-[15rem] h-[15rem] md:w-[25rem] md:h-[25rem] lg:w-[35rem] lg:h-[35rem] pointer-events-none"
        />
      </section>

      {/* Imagen hoja superpuesta */}
      <img
        src="/images/inicio/hoja.png"
        alt="hoja"
        className="absolute z-20 w-1/4 pointer-events-none select-none max-md:hidden top-1/5 -translate-y-18"
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
          className="absolute top-1/4 left-1/4 md:left-1/3 lg:left-1/2 -translate-x-1/2 pointer-events-none h-[10rem] w-[10rem] md:h-[15rem] md:w-[15rem] lg:h-[20rem] lg:w-[20rem] xl:h-[25rem] xl:w-[25rem] 2xl:h-[30rem] 2xl:w-[30rem] "
        />
        <img
          src="/images/inicio/content-of-food.png"
          alt="Content"
          className="absolute h-24 -translate-y-1/2 pointer-events-none max-md:-translate-y-9/3 top-3/8 sm:h-24 md:h-58 lg:h-72 right-10"
        />
        <div
          className="absolute w-1/2 text-center md:w-1/3 top-1/4 left-4/7 max-sm:left-4/12 max-md:left-4/12 lg:left-4/9 xl:left-4/7 2xl:left-4/6"
          style={{ zIndex: 3 }}
        >
          <span className="text-xl md:text-2xl lg:text-4xl xl:text-7xl [font-family:'Cookie',sans-serif] relative">
            ¿Qué es Foraneos ?
            <span className="text-xs md:text-sm xl:text-lg absolute  top-[60%] [font-family:'RibeyeMarrow'] uppercase">
              IA
            </span>
          </span>
          <p className="text-xs sm:text-sm md:text-lg">
            Foráneos IA es una plataforma que utiliza inteligencia artificial
            para recomendarte los mejores platillos y servicios en tu ciudad.
            Nuestro objetivo es ayudarte a sentirte como en casa, descubriendo
            sabores y experiencias únicas adaptadas a tus gustos y necesidades.
          </p>
        </div>
        <div
          className="absolute w-1/2 text-center lg:w-1/3 top-1/3 left-2/12 lg:left-2/5"
          style={{ zIndex: 3 }}
        >
          <span className="text-xl sm:text-2xl md:text-4xl lg:text-7xl [font-family:'Cookie',sans-serif] relative">
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
          className="absolute inset-0 object-cover w-full h-full pointer-events-none"
        />
        <div className="flex items-center justify-center h-full">
          <div className="bg-gradient-to-br from-[#B3D98F] to-[#bce2c3] shadow-xl w-[20rem] lg:w-[30rem] rounded-xl flex flex-col gap-12 p-8 items-center justify-center relative">
            <div className="absolute bg-black w-[20rem] lg:w-[30rem] h-[1rem] -top-1 rounded-tl-xl rounded-tr-2xl z-10" />
            <span className="text-3xl font-bold">Te Ofrecemos</span>
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
              <button className="bg-[#B1DF88] text-black font-bold hover:bg-[#a4cf7e]/80">
                Continuar sin anuncios
              </button>
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
        className="absolute right-0 z-20 w-1/4 translate-y-1/2 pointer-events-none select-none max-md:hidden max-lg:bottom-2/8 lg:bottom-2/9 -scale-x-100 md:translate-y-0"
      />

      {/* Carrusel */}
      <section className="bg-[url('/images/inicio/fondo-carruseles.png')] bg-white bg-cover bg-[position:center_10%] py-24">
        <div className="flex items-center justify-center h-full">
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
                  className="w-full p-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-white/90 rounded-2xl shadow-2xl p-4 flex flex-col items-center gap-6 max-w-md mx-auto border border-green-100 h-[28rem]">
                    {/* Avatar y nombre */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center w-20 h-20 mb-2 bg-green-200 rounded-full shadow-lg">
                        <User className="w-10 h-10 text-green-800" />
                      </div>
                      <span className="text-2xl font-bold text-green-900">
                        {review.name}
                      </span>
                    </div>
                    {/* Review */}
                    <p className="relative px-4 text-lg italic text-center text-gray-700">
                      <span className="absolute left-0 text-3xl text-green-400 -top-2">
                        “
                      </span>
                      <span className="text-md">{review.review}</span>
                      <span className="absolute right-0 text-3xl text-green-400 -bottom-2">
                        ”
                      </span>
                    </p>
                    {/* Imagen de comida */}
                    <img
                      src={review.img}
                      alt="Comida"
                      className="object-cover w-40 shadow h-28 rounded-xl"
                    />
                    {/* Estrellas */}
                    <div className="flex justify-center gap-1">
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
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
