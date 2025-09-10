import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface Dish {
  name: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  image: string;
}

function Menu() {
  const categories = [
    "Todos",
    "Entradas",
    "Platos principales",
    "Postres",
    "Bebidas",
  ];

  const allDishes: Dish[] = [
    {
      name: "Ceviche Peruano",
      category: "Entradas",
      description: "Pescado fresco, limón, cebolla, ají.",
      price: "S/ 30",
      rating: 5,
      image: "https://source.unsplash.com/400x300/?ceviche",
    },
    {
      name: "Lomo Saltado",
      category: "Platos principales",
      description: "Carne de res, cebolla, tomate, papas fritas.",
      price: "S/ 28",
      rating: 4,
      image: "https://source.unsplash.com/400x300/?lomo",
    },
    {
      name: "Pizza Margherita",
      category: "Platos principales",
      description: "Tomate, mozzarella, albahaca fresca.",
      price: "S/ 25",
      rating: 4,
      image: "https://source.unsplash.com/400x300/?pizza",
    },
    {
      name: "Tiramisú",
      category: "Postres",
      description: "Postre italiano con café y mascarpone.",
      price: "S/ 18",
      rating: 5,
      image: "https://source.unsplash.com/400x300/?dessert",
    },
    {
      name: "Limonada",
      category: "Bebidas",
      description: "Refrescante bebida natural de limón.",
      price: "S/ 10",
      rating: 4,
      image: "https://source.unsplash.com/400x300/?lemonade",
    },
    {
      name: "Ensalada César",
      category: "Entradas",
      description: "Lechuga, pollo, queso parmesano y aderezo César.",
      price: "S/ 20",
      rating: 4,
      image: "https://source.unsplash.com/400x300/?salad",
    },
    {
      name: "Hamburguesa Clásica",
      category: "Platos principales",
      description: "Carne, queso, lechuga, tomate y pan brioche.",
      price: "S/ 22",
      rating: 4,
      image: "https://source.unsplash.com/400x300/?burger",
    },
    {
      name: "Brownie con Helado",
      category: "Postres",
      description: "Brownie de chocolate con helado de vainilla.",
      price: "S/ 16",
      rating: 5,
      image: "https://source.unsplash.com/400x300/?brownie",
    },
    {
      name: "Jugo de Mango",
      category: "Bebidas",
      description: "Natural y fresco.",
      price: "S/ 12",
      rating: 4,
      image: "https://source.unsplash.com/400x300/?mango-juice",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredDishes =
    selectedCategory === "Todos"
      ? allDishes
      : allDishes.filter((dish) => dish.category === selectedCategory);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-red-50 to-amber-50">
      <h2 className="text-5xl font-bold text-center text-red-700 mb-12">
        Nuestro Menú
      </h2>
      <p className="text-center text-gray-700 max-w-4xl mx-auto mb-12 text-lg">
        Explora nuestras deliciosas opciones y encuentra tu plato favorito
        fácilmente.
      </p>

      {/* Botones de categoría */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === cat
                ? "bg-red-600 text-white"
                : "bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de platos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {filteredDishes.map((dish) => (
          <div
            key={dish.name}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-red-700 mb-2">
                {dish.name}
              </h3>
              <p className="text-gray-600 mb-4 flex-1">{dish.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-amber-500">
                  {dish.price}
                </span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < dish.rating ? "text-yellow-400" : "text-gray-300"
                      } mr-1`}
                    />
                  ))}
                </div>
              </div>
              <button className="mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
