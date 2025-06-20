import type { PlannedRecipe } from "@/types/planned-recipe/PlannedRecipe.types";
import type { ShoppingItem } from "@/types/shopping-item/ShoppingItem";

export function generateShoppingListFromPlanner(
  planner: Record<string, PlannedRecipe[]>
): ShoppingItem[] {
  const ingredientMap = new Map<string, ShoppingItem>();

  Object.values(planner).forEach((recipes) => {
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const key = ingredient.name.toLowerCase();

        if (!ingredientMap.has(key)) {
          ingredientMap.set(key, {
            id: Math.random(),
            name: ingredient.name,
            quantity: ingredient.quantity,
            price: ingredient.price,
            checked: false,
            category: ingredient.category ?? "Otros",
          });
        } else {
          const existing = ingredientMap.get(key)!;
          existing.price += ingredient.price;
        }
      });
    });
  });

  return Array.from(ingredientMap.values());
}
