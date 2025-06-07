import type { FoodResponse } from "@/features/user/dto/response/food/foodResponse";
import { Badge } from "@/shared/ui/badge";
import { Checkbox } from "@/shared/ui/checkbox";

interface CardModalListProps {
  food: FoodResponse;
  selectedFoods: FoodResponse[];
  toggleFood: (food: FoodResponse) => void;
}

const CardFoodModalList = ({
  food,
  selectedFoods,
  toggleFood,
}: CardModalListProps) => {
  const checked = !!selectedFoods.find((item) => item.id === food.id);

  return (
    <li
      key={food.id}
      className="mb-2"
    >
      <button
        type="button"
        onClick={() => toggleFood(food)}
        className={`
        w-full flex items-center gap-3 p-3 rounded-lg border transition
        text-left shadow-sm drop-shadow-lg cursor-pointer
        ${checked ? "bg-green-100" : "bg-white"}
      `}
      >
        <Checkbox
          checked={checked}
          tabIndex={-1}
          className="mr-2 data-[state=checked]:bg-green-500"
        />
        <img
          src="/images/recipes/receta-1.png"
          alt={food.name}
          className="w-12 h-12 object-cover rounded"
        />
        <div className="flex-1">
          <div className="font-semibold text-sm">{food.name}</div>
          <div className="text-xs text-gray-500 line-clamp-2">
            {food.description}
          </div>
          <div className="flex gap-2 mt-1 flex-wrap">
            <Badge variant="outline">Calorías | 515</Badge>
            <Badge variant="outline">Proteínas | 30g</Badge>
            <Badge variant="outline">Carbohidratos | 60g</Badge>
            <Badge variant="outline">Grasa | 20g</Badge>
          </div>
        </div>
      </button>
    </li>
  );
};

export default CardFoodModalList;
