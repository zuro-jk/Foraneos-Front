import type { FoodResponse } from "@/features/user/dto/response/food/foodResponse";
import { Badge } from "@/shared/ui/badge";

interface CardFoodModalGridProps {
  food: FoodResponse;
  selectedFoods: FoodResponse[];
  toggleFood: (food: FoodResponse) => void;
}

const CardFoodModalGrid = ({
  food,
  selectedFoods,
  toggleFood,
}: CardFoodModalGridProps) => {
  return (
    <div
      key={food.id}
      onClick={() => toggleFood(food)}
      className={`cursor-pointer border rounded transition drop-shadow-2xl ${
        selectedFoods.find((item) => item.id === food.id)
          ? "bg-green-200 border-green-400"
          : "bg-white hover:bg-zinc-100"
      }`}
    >
      <img
        src={food.imagePath}
        alt="Comida"
        className="w-full h-24 object-cover rounded mb-2"
      />
      <div className="p-2">
        <h3 className="font-bold text-sm">{food.name}</h3>
        <p className="line-clamp-2 text-xs text-gray-600">{food.description}</p>
        <ul className="flex flex-wrap mt-2">
          <li className="text-xs">
            <Badge variant="outline">Calorias | {food.calories}</Badge>
          </li>
          <li className="text-xs">
            <Badge variant="outline">Proteinas | {food.protein}g</Badge>
          </li>
          <li className="text-xs">
            <Badge variant="outline">Carbohidratos | {food.carbs}g</Badge>
          </li>
          <li className="text-xs">
            <Badge variant="outline">Grasa | {food.fat}g</Badge>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardFoodModalGrid;
