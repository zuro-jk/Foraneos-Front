import { useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import comidaImg from '/images/inicio/comida-img-foraneos.webp';
import fondoCarrusel from '/images/inicio/arboles-fondo-carrusel.webp';

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

  const prev = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  const next = () => setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));

  return (
    <div className="w-full">

      {/* Sección Foraneos IA */}
      <section className="min-h-screen flex items-center bg-[#f8f8d8]">
        <div className="px-[5%] py-10 max-w-[1200px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            {/* Texto */}
            <div className="flex-1 max-w-xl text-center lg:text-left">
              <h1 className="text-5xl font-semibold text-[#556b2f] font-[Brush Script MT]">
                Foraneos <span className="text-base font-mono">IA</span>
              </h1>
              <p className="mt-5 leading-relaxed text-base text-black">
                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500
              </p>
              <button className="mt-5 bg-black text-white py-2 px-5 rounded-md hover:bg-gray-800 transition">
                Comenzar
              </button>
            </div>

            {/* Imagen */}
            <div className="flex-1 flex justify-center">
              <img
                src={comidaImg}
                alt="comida saludable"
                className="max-w-[300px] md:max-w-[400px] rounded-full shadow-[0_0_30px_#c5ff43]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carrusel */}
      <section
        className="min-h-screen relative flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${fondoCarrusel})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Capa oscura transparente */}
        <div className="absolute inset-0 bg-[#1e293b]/80 backdrop-blur-sm z-0"></div>

        {/* Contenido del carrusel */}
        <div className="relative z-10 px-[5%] max-w-[1200px] w-full">
          {/* Navegación */}
          <div className="flex justify-between items-center mb-4 px-4">
            <button onClick={prev} className="text-xl text-white hover:text-gray-300">
              <FaChevronLeft />
            </button>
            <button onClick={next} className="text-xl text-white hover:text-gray-300">
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
                      <p className="font-bold text-sm text-black">¡{review.name} opina!</p>
                      <p>{review.review}</p>
                    </div>
                  </div>

                  {/* Imagen comida */}
                  <div className="bg-green-200 rounded-lg overflow-hidden">
                    <img src={review.img} alt="comida" className="object-cover w-full h-40" />
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
