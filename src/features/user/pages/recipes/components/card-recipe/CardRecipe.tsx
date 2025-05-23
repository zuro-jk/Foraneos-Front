import { Button } from "@/shared/ui/button";
import { Clock } from "lucide-react";

interface CardRecipeProps {
  title: string;
  time: string;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
  className?: string;
}

const CardRecipe = ({
  title,
  time,
  kcal,
  protein,
  carbs,
  fats,
  className = "",
}: CardRecipeProps) => {
  return (
    <div
      className={`flex flex-col gap-1 p-4 rounded drop-shadow-2xl shadow-xl ${className ? className : "bg-white"}`}
    >
      <div className="flex justify-center items-center bg-gray-200 rounded">
        <img
          src="/images/recipes/receta-1.png"
          alt="receta"
          className="w-full h-42 object-cover rounded"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{title}</span>
        <div className="flex gap-1">
          <span className="text-gray-500 flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
          </span>
          <span className="text-gray-500 flex items-center gap-1 text-xs">
            {time}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap px-4 py-2 text-sm">
        <div className="flex flex-col items-center justify-center">
          <span>{kcal}</span>
          <span className="text-gray-500">kcal</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span>{protein}g</span>
          <span className="text-gray-500">prot</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span>{carbs}g</span>
          <span className="text-gray-500">carbs</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span>{fats}g</span>
          <span className="text-gray-500">Grasas</span>
        </div>
      </div>
      <Button
        className="cursor-pointer shadow-lg w-fit"
        variant="outline"
      >
        Ver Receta
      </Button>
    </div>
  );
};

export default CardRecipe;
