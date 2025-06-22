import useShoppingListStore from "@/store/useShoppingListStore";
import { CheckCircle, ShoppingBag, XCircle } from "lucide-react";

function ShoppingListSummary() {
  const items = useShoppingListStore((state) => state.items);

  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const missingItems = totalItems - checkedItems;
  const totalCost = items.reduce((acc, item) => acc + item.price, 0);

  const boxStyle = "p-4 rounded-xl shadow flex flex-col items-center gap-2";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-100 dark:bg-green-900 shadow-sm">
        <CheckCircle
          className="text-green-700 dark:text-green-300"
          size={32}
        />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Completados
          </p>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
            {checkedItems}/{totalItems}
          </h2>
        </div>
      </div>

      <div
        className={`${boxStyle} bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300`}
      >
        <ShoppingBag size={28} />
        <p className="text-sm">Gasto Estimado</p>
        <h2 className="text-xl font-bold">S/ {totalCost.toFixed(2)}</h2>
      </div>

      <div
        className={`${boxStyle} bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300`}
      >
        <XCircle size={28} />
        <p className="text-sm">Faltantes</p>
        <h2 className="text-xl font-bold">{missingItems}</h2>
      </div>
    </div>
  );
}

export default ShoppingListSummary;
