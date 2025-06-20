import { Checkbox } from "@/shared/ui/checkbox";
import { ArrowRight, Check } from "lucide-react";

const shoppingList = [
  { name: "Arroz", quantity: "1 kg", bought: false },
  { name: "Pollo", quantity: "1/2 g", bought: true },
  { name: "Tomate", quantity: "3 unidades", bought: false },
  { name: "Lentejas", quantity: "1/2 kg", bought: false },
];

function ShoppingListPreview() {
  const totalItems = shoppingList.length;
  const boughtItems = shoppingList.filter((item) => item.bought).length;

  return (
    <div className="col-span-1 lg:col-span-2 xl:col-span-3 bg-white dark:bg-zinc-800 rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          🛒 Lista de Compras
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          {boughtItems}/{totalItems} productos comprados
        </span>
      </div>

      <ul className="space-y-2">
        {shoppingList.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id={`item-${idx}`}
                checked={item.bought}
                onCheckedChange={() => {}}
                className="h-5 w-5"
              />
              <label
                htmlFor={`item-${idx}`}
                className={`text-sm ${
                  item.bought
                    ? "line-through text-gray-400"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {item.name} - {item.quantity}
              </label>
            </div>
            {item.bought && (
              <span className="text-xs text-green-500">
                <Check size={16} />
              </span>
            )}
          </li>
        ))}
      </ul>

      <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center cursor-pointer">
        Ver lista completa <ArrowRight />
      </button>
    </div>
  );
}

export default ShoppingListPreview;
