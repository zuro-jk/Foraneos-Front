import type { FoodResponse } from "@/features/user/dto/response/food/foodResponse";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { X } from "lucide-react";

interface DraggableFoodProps {
  food: FoodResponse;
  removeFood: (food: FoodResponse) => void;
}

const DraggableFood = ({ food, removeFood }: DraggableFoodProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: food.id,
  });

  return (
    <div
      key={food.id}
      className={cn(
        "flex flex-col gap-1 bg-white shadow drop-shadow-xl h-fit w-full rounded cursor-move relative",
        isDragging ? "opacity-60" : ""
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className="w-full h-20 relative">
        <img
          src={food.imagePath}
          alt="Comida"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start p-2">
        <span className="font-bold text-xs">{food.name}</span>
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
