import { mockRecipes } from "@/data/mockRecipes";
import useFavoritesStore from "@/store/useFavoritesStore";
import useShoppingListStore from "@/store/useShoppingListStore";
import {
  ArrowLeft,
  CalendarPlus,
  Clock,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = mockRecipes.find((r) => r.id === Number(id));

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) =>
    state.isFavorite(recipe?.id ?? -1)
  );
  const addItem = useShoppingListStore((state) => state.addItem);

  if (!recipe) return <div>Receta no encontrada</div>;

  const handleAddIngredients = () => {
    recipe.ingredients.forEach((ingredient) =>
      addItem({
        ...ingredient,
        id: Date.now() + Math.random(),        
        checked: false,
        category: ingredient.category ?? "Otros",
      })
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-5xl">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow space-y-4">
        {/* Boton volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-blue-500 hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver
        </button>

        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow overflow-hidden">
          {/* Imagen destacada */}
          <div className="relative h-64 sm:h-80 md:h-[400px]">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-full"
            />

            {/* Favorito */}
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="absolute top-4 right-4 p-2 bg-white dark:bg-zinc-700 rounded-full shadow hover:scale-105 transition cursor-pointer"
            >
              <Heart
                size={20}
                className={
                  isFavorite ? "fill-pink-500 text-pink-500" : "text-pink-500"
                }
              />
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-900 px-6 py-5 space-y-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{recipe.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {recipe.description}
              </p>
            </div>

            {/* Chips de metadata */}
            <div className="flex flex-wrap gap-2 text-xs">
              {recipe.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-600 dark:bg-zinc-700 dark:text-blue-300 px-3 py-1 rounded-full flex items-center"
                >
                  #{tag}
                </span>
              ))}
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full dark:bg-zinc-700 dark:text-green-300">
                S/ {recipe.price.toFixed(2)}
              </span>
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full dark:bg-zinc-700 dark:text-yellow-400 flex items-center gap-2">
                <Clock size={16} /> {recipe.time}
              </span>
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full dark:bg-zinc-700 dark:text-purple-400">
                Dificultad: {recipe.difficulty}
              </span>
            </div>

            {/* Ingredientes */}
            <section>
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                Ingredientes
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 dark:bg-zinc-800 rounded-lg p-3"
                  >
                    <span className="text-sm text-gray-800 dark:text-white">
                      {ingredient.amount} de {ingredient.name}
                    </span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      S/ {ingredient.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Preparación */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Preparación paso a paso
              </h2>
              <ol className="mt-2 space-y-3 list-decimal list-inside text-sm text-gray-800 dark:text-gray-200">
                {recipe.steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-3 rounded-lg"
                  >
                    <span className="text-lg font-bold text-blue-500">
                      {idx + 1}
                    </span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Botón de accion */}
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddIngredients}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                <ShoppingCart size={18} /> Añadir ingredientes
              </button>
              <button
                onClick={() => alert("Agregando al planificador")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4" />
                Agregar al planificador semanal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
