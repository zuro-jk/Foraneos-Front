import usePlannerStore from "@/store/usePlannerStore";
import type { PlannedRecipe } from "@/types/planned-recipe/PlannedRecipe.types";
import { X } from "lucide-react";
import { useEffect } from "react";

interface AddRecipeModalProps {
  day: string;
  onClose: () => void;
}

const fakeRecipes: PlannedRecipe[] = [
  {
    id: 1,
    title: "Tallarines rojos",
    ingredients: [
      { name: "Tallarines", quantity: "200g", price: 1.5 },
      { name: "Salsa de tomate", quantity: "100g", price: 0.5 },
      { name: "Carne molida", quantity: "150g", price: 2.0 },
      { name: "Cebolla", quantity: "50g", price: 0.2 },
    ],
  },
  {
    id: 2,
    title: "Sopa de verduras",
    ingredients: [
      { name: "Zanahoria", quantity: "100g", price: 0.3 },
      { name: "Papa", quantity: "150g", price: 0.4 },
      { name: "Apio", quantity: "50g", price: 0.2 },
      { name: "Caldo de verduras", quantity: "500ml", price: 0.5 },
    ],
  },
  {
    id: 3,
    title: "Lentejitas con arroz",
    ingredients: [
      { name: "Lentejas", quantity: "200g", price: 0.8 },
      { name: "Arroz", quantity: "150g", price: 0.6 },
      { name: "Cebolla", quantity: "50g", price: 0.2 },
      { name: "Pimiento", quantity: "50g", price: 0.3 },
    ],
  },
];

function AddRecipeModal({ day, onClose }: AddRecipeModalProps) {
  const addRecipe = usePlannerStore((state) => state.addRecipeToDay);

  const handleSelect = (recipe: PlannedRecipe) => {
    addRecipe(day, recipe);
    onClose();
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const modal = document.getElementById("modal");
      if (modal && !modal.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        id="modal"
        className="bg-white dark:bg-zinc-800 p-6 rounded-xl w-[90%] max-w-md space-y-4 shadow-lg"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Agregar receta a {day}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="space-y-2">
          {fakeRecipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleSelect(recipe)}
              className="cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 px-3 py-2 rounded text-gray-800 dark:text-white"
            >
              🍽 {recipe.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddRecipeModal;
