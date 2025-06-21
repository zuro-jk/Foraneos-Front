import type { IngredientCategory } from "@/types/shopping-item/ShoppingItem";

export const knownIngredients: {
  name: string;
  icon: string;
  category: IngredientCategory;
  defaultQuantity?: string;
  defaultUnit?: string;
}[] = [
  {
    name: "Arroz",
    category: "Granos",
    icon: "🌾",
    defaultQuantity: "1",
    defaultUnit: "kg",
  },
  {
    name: "Leche",
    category: "Lácteos",
    icon: "🥛",
    defaultQuantity: "1",
    defaultUnit: "L",
  },
  {
    name: "Huevos",
    category: "Proteínas",
    icon: "🥚",
    defaultQuantity: "12",
    defaultUnit: "unidades",
  },
  {
    name: "Atún",
    category: "Proteínas",
    icon: "🐟",
    defaultQuantity: "1",
    defaultUnit: "lata",
  },
  {
    name: "Papa",
    category: "Vegetales",
    icon: "🥔",
    defaultQuantity: "4",
    defaultUnit: "unidades",
  },
  {
    name: "Zanahoria",
    category: "Vegetales",
    icon: "🥕",
    defaultQuantity: "3",
    defaultUnit: "unidades",
  },
  { name: "Pollo", category: "Proteínas", icon: "🍗", defaultQuantity: "1" },
  { name: "Queso", category: "Lácteos", icon: "🧀", defaultQuantity: "250" },
  {
    name: "Aceite de oliva",
    category: "Condimentos",
    icon: "🫒",
    defaultQuantity: "100",
    defaultUnit: "ml",
  },
  {
    name: "Cebolla",
    category: "Vegetales",
    icon: "🧅",
    defaultQuantity: "2",
    defaultUnit: "unidades",
  },
  {
    name: "Tomate",
    category: "Vegetales",
    icon: "🍅",
    defaultQuantity: "2",
    defaultUnit: "unidades",
  },
];
