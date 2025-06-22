import type { ShoppingItem } from "../shopping-item/ShoppingItem";

export type RecipeDifficulty = "Fácil" | "Medio" | "Difícil";

export type Ingredient = Pick<
  ShoppingItem,
  "name" | "amount" | "unit" | "price" | "category"
>;

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
