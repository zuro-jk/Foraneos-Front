import useFavoritesStore from "@/store/useFavoritesStore";
import type { PlannedRecipe } from "@/types/planned-recipe/PlannedRecipe.types";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import RecipeCard from "../economic-recipes/components/recipes-grid/components/recipe-card/RecipeCard";
import { mockRecipes } from "@/data/mockRecipes";



function FavoriteRecipes() {
  const favoriteIds = useFavoritesStore((state) => state.favorites);
  const [favoriteRecipes, setFavoriteRecipes] = useState<PlannedRecipe[]>([]);

  useEffect(() => {
    const filtered = mockRecipes.filter((recipe) =>
      favoriteIds.includes(recipe.id)
    );
    setFavoriteRecipes(filtered);
  }, [favoriteIds]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Heart /> Recetas Favoritas
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Aquí puedes ver tus recetas favoritas guardadas.
            </p>
          </div>
        </header>

        {favoriteRecipes.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12 space-y-2">
            <Heart className="w-10 h-10 mx-auto text-pink-500" />
            <p className="text-lg font-semibold">Aún no tienes favoritos</p>
            <p className="text-sm flex items-center justify-center gap-1">
              Marca recetas con el ícono 💝 para guardarlas aquí.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
