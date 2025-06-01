import { useQuery } from "@tanstack/react-query";
import { detailRecipeApi, recipesApi } from "../api/recipeApi";
import type { Recipe } from "../types/recipe";

export function useRecipes() {
  return useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: () => recipesApi(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useRecipe(id: number) {
  return useQuery<Recipe>({
    queryKey: ["recipe", id],
    queryFn: () => detailRecipeApi(id),
  });
}
