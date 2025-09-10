function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-red-50">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-10">
        <h1 className="text-6xl md:text-7xl font-extrabold text-red-700 mb-8">
          Bienvenido a Mi Restaurante 🍴
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-12">
          Sabores auténticos, ingredientes frescos y un ambiente acogedor para
          toda la familia.
        </p>
        <div className="flex gap-6">
          <a
            href="/menu"
            className="px-8 py-4 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700 transition-colors text-lg"
          >
            Ver Menú
          </a>
          <a
            href="/contact"
            className="px-8 py-4 bg-amber-500 text-white rounded-xl shadow-lg hover:bg-amber-600 transition-colors text-lg"
          >
            Reservar Mesa
          </a>
        </div>
      </section>

      {/* Platos destacados */}
      <section className="py-24 px-10 bg-white">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-16">
          Platos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[
            {
              name: "Lomo Saltado",
              img: "https://source.unsplash.com/600x400/?steak,food",
            },
            {
              name: "Ceviche Fresco",
              img: "https://source.unsplash.com/600x400/?ceviche,seafood",
            },
            {
              name: "Pasta Artesanal",
              img: "https://source.unsplash.com/600x400/?pasta,italian",
            },
          ].map((dish) => (
            <div
              key={dish.name}
              className="bg-amber-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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

      {/* Sobre nosotros */}
      <section className="py-28 px-10 text-center bg-gradient-to-r from-amber-100 to-red-100">
        <h2 className="text-4xl font-bold text-red-700 mb-10">
          Sobre Nosotros
        </h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed">
          En Mi Restaurante creemos en la magia de la buena comida y en la
          importancia de compartir momentos inolvidables. Usamos ingredientes
          frescos, recetas auténticas y un ambiente acogedor para que cada
          visita sea especial.
        </p>
      </section>

      {/* Testimonios */}
      <section className="py-24 px-10 bg-white">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-16">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "María",
              text: "La mejor experiencia gastronómica, sabores que me recordaron a casa.",
              img: "https://randomuser.me/api/portraits/women/68.jpg",
            },
            {
              name: "Juan",
              text: "Excelente atención y comida deliciosa, 100% recomendado.",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
            {
              name: "Lucía",
              text: "Un ambiente acogedor y platos espectaculares.",
              img: "https://randomuser.me/api/portraits/women/32.jpg",
            },
          ].map((review) => (
            <div
              key={review.name}
              className="bg-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <img
                src={review.img}
                alt={review.name}
                className="w-20 h-20 mx-auto rounded-full border-4 border-red-600 mb-6 object-cover"
              />
              <p className="italic text-gray-700 mb-6">“{review.text}”</p>
              <div className="flex justify-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-500 text-xl"
                    >
                      ★
                    </span>
                  ))}
              </div>
              <span className="font-semibold text-red-600">{review.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Horarios y ubicación */}
      <section className="py-24 px-10 bg-gradient-to-r from-red-50 to-amber-50 relative">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-16">
          Encuéntranos
        </h2>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 text-center mb-10">
          <div className="flex flex-col md:flex-row justify-around items-center gap-8">
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                📍 Dirección
              </h3>
              <p className="text-gray-700">Av. Principal 123, Lima – Perú</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                🕒 Horarios
              </h3>
              <p className="text-gray-700">
                Lunes a Domingo: 12:00pm – 11:00pm
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                📞 Reservas
              </h3>
              <p className="text-gray-700">(+51) 987 654 321</p>
            </div>
          </div>
        </div>

        <iframe
          className="w-full h-96 rounded-xl shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.556090624784!2d-77.04279308460676!3d-12.046373745152861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b3f7e7a28b%3A0x2c4d1d4c2e27491d!2sPlaza%20Mayor%20de%20Lima!5e0!3m2!1ses-419!2spe!4v1700000000000"
          loading="lazy"
        ></iframe>
      </section>

     
    </div>
  );
}

export default Home;
