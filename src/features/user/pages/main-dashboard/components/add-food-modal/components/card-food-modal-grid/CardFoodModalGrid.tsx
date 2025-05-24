import { Badge } from "@/shared/ui/badge";
import type { Food } from "../../../../types/food";

interface CardFoodModalGridProps {
  food: Food;
  selectedFoods: Food[];
  toggleFood: (food: Food) => void;
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
        src="/images/recipes/receta-1.png"
        alt="Comida"
        className="w-full h-24 object-cover rounded mb-2"
      />
      <div className="p-2">
        <h3 className="font-bold text-sm">{food.name}</h3>
        <p className="line-clamp-2 text-xs text-gray-600">{food.description}</p>
        <ul className="flex flex-wrap mt-2">
          <li className="text-xs">
            <Badge variant="outline">Calorias | 515</Badge>
          </li>
          <li className="text-xs">
            <Badge variant="outline">Proteinas | 30g</Badge>
          </li>
          <li className="text-xs">
            <Badge variant="outline">Carbohidratos | 60g</Badge>
          </li>
          <li className="text-xs">
            <Badge variant="outline">Grasa | 20g</Badge>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardFoodModalGrid;
