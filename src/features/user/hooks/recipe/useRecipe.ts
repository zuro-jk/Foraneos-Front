import { useQuery } from "@tanstack/react-query";
import { getFoodById, getFoods } from "../../api/foods/foodsUserApi";

export function useGetRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getFoods,
  });
}

export function useGetRecipeById(recipeId: number) {
  return useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getFoodById(recipeId),
  });
}

// export function useRecipes() {
//   return useQuery<Recipe[]>({
//     queryKey: ["recipes"],
//     queryFn: () => recipesApi(),
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// }

// export function useRecipe(id: number) {
//   return useQuery<Recipe>({
//     queryKey: ["recipe", id],
//     queryFn: () => detailRecipeApi(id),
//   });
// }
