import { useDraggable } from "@dnd-kit/core";
import type { Food } from "../../types/food";

interface DraggableFoodProps { 
  food: Food;
}

const DraggableFood = ({ food }: DraggableFoodProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: food.id,
    data: food,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex flex-col gap-2 p-2 bg-white shadow drop-shadow-xl w-48 rounded cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        src="/images/recipes/receta-1.png"
        alt="Comida"
        className="w-full h-24 object-cover"
      />
      <div className="flex flex-col items-start">
        <span className="font-bold text-lg">{food.name}</span>
        <span className="text-gray-500 text-xs text-justify line-clamp-2">
          {food.description}
        </span>
      </div>
    </div>
  );
};

export default DraggableFood;
