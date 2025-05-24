import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { X } from "lucide-react";
import type { Food } from "../../types/food";

interface DraggableFoodProps {
  food: Food;
  removeFood: (food: Food) => void;
}

const DraggableFood = ({ food, removeFood }: DraggableFoodProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: food.id,
  });

  return (
    <div
      key={food.id}
      className={cn(
        "flex flex-col gap-2 bg-white shadow drop-shadow-xl h-fit w-full rounded cursor-move relative",
        isDragging ? "opacity-60" : ""
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <img
        src="/images/recipes/receta-1.png"
        alt="Comida"
        className="w-full h-24 object-cover"
      />
      <div className="flex flex-col items-start p-2">
        <span className="font-bold">{food.name}</span>
        <span className="text-gray-500 text-xs text-justify line-clamp-2">
          {food.description}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFood(food);
          }}
          className="absolute -top-4 -right-3 px-2 py-2 bg-red-500 rounded-full cursor-pointer"
          aria-label="Eliminar comida"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default DraggableFood;
