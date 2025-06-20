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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        className={`${boxStyle} bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-300`}
      >
        <CheckCircle size={28} />
        <p className="text-sm">Completados</p>
        <h2 className="text-xl font-bold">
          {checkedItems}/{totalItems}
        </h2>
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
