import type { Ingredient } from "../planned-recipe/PlannedRecipe.types";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  price: number;
  time: string;
  tags?: string[];
  ingredients?: string[] | Ingredient[];
  steps?: string[];
  description?: string;
}
