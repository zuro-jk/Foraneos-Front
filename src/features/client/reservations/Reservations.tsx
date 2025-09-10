import { useState } from "react";

function Reservations() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías enviar los datos a tu backend
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-red-50 to-amber-50 min-h-screen">
      <h2 className="text-5xl font-bold text-center text-red-700 mb-12">
        Reserva tu mesa
      </h2>
      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12 text-lg">
        Completa el formulario y asegura tu mesa en nuestro restaurante.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Tu nombre"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="999 999 999"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">
            Número de personas
          </label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {[...Array(10)].map((_, i) => (
              <option
                key={i}
                value={i + 1}
              >
                {i + 1} persona{i > 0 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Fecha</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Hora</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-red-600 text-white font-semibold px-10 py-3 rounded-xl hover:bg-red-700 transition-colors"
          >
            Reservar ahora
          </button>
        </div>

        {submitted && (
          <p className="md:col-span-2 mt-4 text-center text-green-600 font-semibold">
            ¡Gracias! Tu reserva ha sido enviada.
          </p>
        )}
      </form>
    </section>
  );
}

export default Reservations;
