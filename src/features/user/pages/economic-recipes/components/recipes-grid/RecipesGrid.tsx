import type { PlannedRecipe } from "@/types/planned-recipe/PlannedRecipe.types";
import RecipeCard from "./components/recipe-card/RecipeCard";

const recipes: PlannedRecipe[] = [
  {
    id: 1,
    title: "Arroz chaufa ecnómico",
    image: "/images/foods/chaufa.webp",
    price: 6.5,
    time: "20 min",
    ingredients: [
      {
        name: "Arroz",
        quantity: "2 tazas",
        price: 1.0,
      },
      {
        name: "Huevo",
        quantity: "2 unidades",
        price: 0.5,
      },
      {
        name: "Verduras mixtas",
        quantity: "1 taza",
        price: 1.0,
      },
      {
        name: "Salsa de soya",
        quantity: "3 cucharadas",
        price: 0.2,
      },
      {
        name: "Aceite de sésamo",
        quantity: "2 cucharadas",
        price: 0.3,
      },
    ],
    steps: ["Freír ingredientes", "Agregar arroz", "Servir caliente"],
    tags: ["almuerzo", "rápido", "oriental"],
    description:
      "Un delicioso y rápido arroz chaufa con ingredientes económicos.",
    difficulty: "Fácil",
  },
  {
    id: 2,
    title: "Lentejitas con arroz",
    image: "/images/foods/lentejas-con-arroz.webp",
    price: 4.0,
    time: "35 min",
    ingredients: [
      {
        name: "Lentejas",
        quantity: "1 taza",
        price: 0.8,
      },
      {
        name: "Arroz",
        quantity: "1 taza",
        price: 0.5,
      },
      {
        name: "Cebolla",
        quantity: "1 unidad",
        price: 0.2,
      },
      {
        name: "Zanahoria",
        quantity: "1 unidad",
        price: 0.3,
      },
      {
        name: "Pimiento",
        quantity: "1 unidad",
        price: 0.4,
      },
    ],
    steps: ["Cocinar lentejas", "Hervir arroz", "Mezclar y servir"],
    tags: ["vegetariano", "económico", "saludable"],
    description: "Un plato nutritivo y lleno de sabor, ideal para el almuerzo.",
    difficulty: "Fácil",
  },
  {
    id: 3,
    title: "Tortilla de atún",
    image: "/images/foods/tortilla.jpeg",
    price: 3.5,
    time: "15 min",
    ingredients: [
      {
        name: "Huevos",
        quantity: "4 unidades",
        price: 0.8,
      },
      {
        name: "Atún en lata",
        quantity: "1 lata",
        price: 1.0,
      },
      {
        name: "Cebolla",
        quantity: "1 unidad",
        price: 0.2,
      },
      {
        name: "Pimiento",
        quantity: "1 unidad",
        price: 0.3,
      },
      {
        name: "Aceite de oliva",
        quantity: "2 cucharadas",
        price: 0.2,
      },
    ],
    steps: ["Batir huevos", "Agregar atún y verduras", "Cocinar en sartén"],
    tags: ["rápido", "fácil", "proteína"],
    description:
      "Una tortilla rica en proteínas, perfecta para un desayuno rápido.",
    difficulty: "Fácil",
  },
];

function RecipesGrid() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
    </>
  );
}

export default RecipesGrid;
