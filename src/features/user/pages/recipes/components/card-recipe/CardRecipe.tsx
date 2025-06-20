import type { FoodResponse } from "@/features/user/dto/response/food/foodResponse";
import { Button } from "@/shared/ui/button";
import { Clock, Eye, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardRecipeProps {
  recipe: FoodResponse;
  className?: string;
}

const CardRecipe = ({ recipe, className = "" }: CardRecipeProps) => {
  const navigate = useNavigate();
  console.log(recipe);
  return (
    <div
      className={`flex flex-col gap-1 p-4 rounded drop-shadow-2xl shadow-xl ${
        className ? className : "bg-white"
      }`}
    >
      <div className="flex items-center justify-center bg-gray-200 rounded">
        <img
          src={recipe.imagePath}
          alt="receta"
          className="object-cover w-full rounded h-42"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{recipe.name}</span>
        <div className="flex gap-1">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            {recipe.preparationTimeMinutes} min
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 px-4 py-2 text-sm">
        {recipe.ingredients.map((ingredient) => (
          <span
            key={ingredient.name}
            className="px-2 py-1 mb-1 text-xs text-gray-700 bg-gray-200 rounded"
          >
            {ingredient.name}
          </span>
        ))}
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
            onClick={() => navigate(`/user/recipes/${recipe.id}`)}
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
