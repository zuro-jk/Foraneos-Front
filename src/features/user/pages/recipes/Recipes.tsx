import { Button } from "@/shared/ui/button";
import { PlusCircle, Search, Filter } from "lucide-react";
import { useState } from "react";

const recipes = [
  {
    id: 1,
    title: "Tallarines Verdes",
    description:
      "Pasta con salsa de espinaca y albahaca, acompañada de bistec.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    category: "Pasta",
  },
  {
    id: 2,
    title: "Ceviche Peruano",
    description: "Clásico ceviche de pescado fresco con limón, cebolla y ají.",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    category: "Mariscos",
  },
  {
    id: 3,
    title: "Aji de Gallina",
    description:
      "Pollo deshilachado en salsa cremosa de ají amarillo y nueces.",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    category: "Guisos",
  },
];

const categories = ["Todas", "Pasta", "Mariscos", "Guisos"];

const Recipes = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredRecipes = recipes.filter(
    (r) =>
      (selectedCategory === "Todas" || r.category === selectedCategory) &&
      (r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <span className="text-2xl font-bold">Mis Recetas</span>
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          Nueva receta
        </Button>
      </div>

      {/* Buscador y filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-1/3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar receta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div className="flex gap-2">
          <Filter
            className="text-gray-400"
            size={18}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de recetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No se encontraron recetas.
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 hover:shadow-lg transition"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-md h-40 w-full object-cover"
              />
              <span className="font-semibold text-lg">{recipe.title}</span>
              <span className="text-gray-500 text-sm">
                {recipe.description}
              </span>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {recipe.category}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="text-xs px-3 py-1"
                  >
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    className="text-xs px-3 py-1"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    className="text-xs px-3 py-1"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recipes;
