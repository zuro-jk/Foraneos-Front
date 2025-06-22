import { mockRecipes } from "@/data/mockRecipes";
import usePlannerStore from "@/store/usePlannerStore";
import type { PlannedRecipe } from "@/types/planned-recipe/PlannedRecipe.types";
import { X } from "lucide-react";
import { useEffect } from "react";

interface AddRecipeModalProps {
  day: string;
  onClose: () => void;
}

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
          {mockRecipes.map((recipe) => (
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
