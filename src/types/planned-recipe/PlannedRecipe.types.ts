import type { IngredientCategory } from "../shopping-item/ShoppingItem";

export type RecipeDifficulty = "Fácil" | "Medio" | "Difícil";

export interface Ingredient {
  name: string;
  quantity: string;
  price: number;
  category?: IngredientCategory;
}

export interface PlannedRecipe {
  id: number;
  title: string;
  image: string;
  tags: string[];
  time: string;
  price: number;
  ingredients: Ingredient[];
  steps: string[];
  description: string;
  difficulty: RecipeDifficulty;
}
