import { ArrowRight } from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "Arroz Tapado",
    image: "/images/foods/arroz-tapado.jpg",
    cost: 4.5,
  },
  {
    id: 2,
    title: "Tallarines con Huevo",
    image: "/images/foods/tallarines.jpg",
    cost: 3.8,
  },
  {
    id: 3,
    title: "Lentejitas Criollas",
    image: "/images/foods/lentejas.avif",
    cost: 5.2,
  },
];

function RecipeSuggestions() {
  return (
    <div className="col-span-1 lg:col-span-2 xl:col-span-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        🥗 Recetas sugeridas para hoy
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="rounded-xl w-full h-48 object-cover mb-3"
            />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {recipe.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Costo estimado: S/{recipe.cost.toFixed(2)}
            </p>
            <button className="flex items-center gap-2 cursor-pointer mt-3 text-sm text-green-600 dark:text-green-400 hover:underline">
              Ver receta <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSuggestions;
