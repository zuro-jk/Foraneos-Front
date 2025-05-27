import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import type { Food, Meal } from "../../types/food";
import DraggableFood from "../draggable-food/DraggableFood";

interface MealDropzoneProps {
  meal: Meal;
  removeFood: (food: Food) => void;
}

const MealDropzone = ({ meal, removeFood }: MealDropzoneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: meal.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`max-sm:col-span-12 max-md:col-span-2 max-lg:col-span-2 col-span-1 border border-solid rounded shadow p-4 flex flex-col gap-2 max-h-[30rem] transition ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      <span className="font-bold">{meal.title}</span>
      <div className="grid h-full grid-cols-2 gap-4 p-4 overflow-y-auto">
        {meal.foods.length === 0 ? (
          <div className="w-full col-span-2 p-2 text-center text-gray-400 transition border-2 border-dashed rounded cursor-pointer h-fit hover:bg-gray-100">
            <Plus className="inline mr-1" /> Añadir {meal.title.toLowerCase()}
          </div>
        ) : (
          meal.foods.map((food) => (
            <DraggableFood
              key={food.id}
              food={food}
              removeFood={removeFood}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MealDropzone;
