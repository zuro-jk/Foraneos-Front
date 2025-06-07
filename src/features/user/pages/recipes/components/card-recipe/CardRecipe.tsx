import { Button } from "@/shared/ui/button";
import { Clock, Eye, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardRecipeProps {
  id: number;
  title: string;
  time: string;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
  className?: string;
}

const CardRecipe = ({
  id,
  title,
  time,
  kcal,
  protein,
  carbs,
  fats,
  className = "",
}: CardRecipeProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col gap-1 p-4 rounded drop-shadow-2xl shadow-xl ${
        className ? className : "bg-white"
      }`}
    >
      <div className="flex items-center justify-center bg-gray-200 rounded">
        <img
          src="/images/recipes/receta-1.png"
          alt="receta"
          className="object-cover w-full rounded h-42"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{title}</span>
        <div className="flex gap-1">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            {time}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between px-4 py-2 text-sm">
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
      <div className="flex items-center justify-between">
        <Button
          className="cursor-pointer shadow/25 w-fit"
          variant="outline"
        >
          Guardar
        </Button>
        <div className="flex items-center gap-2">
          <Eye
            className="text-gray-500 transition-colors duration-200 ease-in-out cursor-pointer hover:text-blue-500"
            onClick={() => navigate(`/user/recipes/${id}`)}
            size={20}
          />
          <ThumbsUp
            className="text-gray-500 transition-colors duration-200 ease-in-out cursor-pointer hover:text-green-500"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default CardRecipe;
