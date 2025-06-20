import usePlannerStore from "@/store/usePlannerStore";
import useShoppingListStore from "@/store/useShoppingListStore";
import { generateShoppingListFromPlanner } from "@/utils/generateShoppingList";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

function GenerateShoppingListButton() {
  const planner = usePlannerStore((state) => state.planner);
  const clearList = useShoppingListStore((state) => state.clearList);
  const addItem = useShoppingListStore((state) => state.addItem);

  const handleGenerate = () => {
    const generated = generateShoppingListFromPlanner(planner);
    clearList();
    generated.forEach(addItem);
    toast("Lista de compras generada con éxito");
  };

  return (
    <button
      onClick={handleGenerate}
      className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
    >
      <ShoppingCart /> Generar lista de compras
    </button>
  );
}

export default GenerateShoppingListButton;
