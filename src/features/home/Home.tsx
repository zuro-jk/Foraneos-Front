import { Button } from "@/shared/ui/button";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import fondoCarrusel from "/images/inicio/arboles-fondo-carrusel.webp";
import comidaImg from "/images/inicio/comida-img-foraneos.webp";

const reviews = [
  {
    id: 1,
    name: "Hector",
    review: "No me gusto ningun plato, extraño a mi viejita, pipipipi",
    img: comidaImg,
  },
  {
    id: 2,
    name: "Joe",
    review: "El servicio fue excelente y la comida deliciosa. ¡Volveré pronto!",
    img: comidaImg,
  },
  {
    id: 3,
    name: "Aaron",
    review: "El servicio fue excelente y la comida deliciosa. ¡Volveré pronto!",
    img: comidaImg,
  },
  {
    id: 4,
    name: "Marcelo",
    review: "El servicio fue excelente y la comida deliciosa. ¡Volveré pronto!",
    img: comidaImg,
  },
  {
    id: 5,
    name: "Hugo",
    review: "El servicio fue excelente y la comida deliciosa. ¡Volveré pronto!",
    img: comidaImg,
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  const next = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );

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
          <Button className="w-fit lg:ml-28 xl:ml-56">Comenzar</Button>
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

      <section
        className="h-[110vh] bg-white border-b border-black"
        style={{
          backgroundImage: `url(/images/inicio/card-plan.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
        className="absolute top-[80%] -translate-y-18  w-96 select-none z-20 pointer-events-none"
      />

      {/* Carrusel */}
      <section
        className="min-h-screen relative flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${fondoCarrusel})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Capa oscura transparente */}
        <div className="absolute inset-0 bg-[#1e293b]/80 backdrop-blur-sm z-0"></div>

        {/* Contenido del carrusel */}
        <div className="relative z-10 px-[5%] max-w-[1200px] w-full">
          {/* Navegación */}
          <div className="flex justify-between items-center mb-4 px-4">
            <button
              onClick={prev}
              className="text-xl text-white hover:text-gray-300"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={next}
              className="text-xl text-white hover:text-gray-300"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Reseñas */}
          <div className="flex flex-wrap justify-center gap-10">
            {reviews
              .slice(currentIndex, currentIndex + 2)
              .concat(currentIndex === reviews.length - 1 ? [reviews[0]] : [])
              .map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white bg-opacity-80 text-black w-full max-w-[350px] p-4 rounded-xl shadow-xl"
                >
                  {/* Usuario y mensaje */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div className="bg-green-200 rounded-lg p-2 text-xs">
                      <p className="font-bold text-sm text-black">
                        ¡{review.name} opina!
                      </p>
                      <p>{review.review}</p>
                    </div>
                  </div>

                  {/* Imagen comida */}
                  <div className="bg-green-200 rounded-lg overflow-hidden">
                    <img
                      src={review.img}
                      alt="comida"
                      className="object-cover w-full h-40"
                    />
                    <div className="flex items-center justify-center gap-2 p-2">
                      <span className="w-4 h-2 bg-black rounded-full"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    </div>
                  </div>

                  {/* Estrellas */}
                  <div className="flex gap-1 pt-2 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
