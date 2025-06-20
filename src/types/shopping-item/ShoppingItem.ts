export type IngredientCategory =
  | "Granos"
  | "Lácteos"
  | "Vegetales"
  | "Frutas"
  | "Proteínas"
  | "Enlatados"
  | "Condimentos"
  | "Otros";

export interface ShoppingItem {
  id: number;
  name: string;
  quantity: string;
  price: number;
  checked: boolean;
  category: IngredientCategory;
}
