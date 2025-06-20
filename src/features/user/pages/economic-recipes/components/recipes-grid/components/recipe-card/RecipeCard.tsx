import useFavoritesStore from "@/store/useFavoritesStore";
import type { PlannedRecipe } from "@/types/planned-recipe/PlannedRecipe.types";
import { Banknote, CalendarPlus, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  recipe: PlannedRecipe;
}

function RecipeCard({
  recipe: {
    id,
    title,
    image,
    price,
    tags,
    time,
    difficulty,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    steps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    description,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ingredients,
  },
}: RecipeCardProps) {
  const navigate = useNavigate();

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));

  return (
    <div
      className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-200 overflow-hidden group cursor-pointer"
      onClick={() => navigate(`/user/economic-recipes/${id}`)}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
          className="absolute top-2 right-2 p-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-full shadow hover:scale-110 transition cursor-pointer"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "text-pink-500 fill-pink-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>

        <p className="text-sm flex text-gray-500 dark:text-gray-300 items-center gap-1">
          <Banknote /> S/ {price.toFixed(2)} · ⏱️ {time}
        </p>

        <div
          className="flex justify-between
         items-center mt-3"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Add to calendar clicked");
            }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition cursor-pointer"
          >
            <CalendarPlus className="w-5 h-5 text-blue-500" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1 text-xs mt-2">
          {tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 dark:bg-zinc-700 dark:text-blue-300 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {difficulty && (
            <span className="bg-purple-100 text-purple-700 dark:bg-zinc-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
              Dificultad: {difficulty}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
