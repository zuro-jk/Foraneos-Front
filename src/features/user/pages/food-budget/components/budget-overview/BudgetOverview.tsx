import useBudgetStore from "@/store/useBudgetStore";
import useShoppingListStore from "@/store/useShoppingListStore";
import { useState } from "react";

function BudgetOverview() {
  const budget = useBudgetStore((state) => state.budget);
  const setBudget = useBudgetStore((state) => state.setBudget);
  const items = useShoppingListStore((state) => state.items);

  const spent = items.filter((item) => item.checked).reduce((acc, item) => acc + item.price, 0);

  const remaining = budget - spent;
  const isOverBudget = remaining < 0;

  const [newBudget, setNewBudget] = useState(budget.toString());

  const handleUpdate = () => {
    const parsed = parseFloat(newBudget);
    if (!isNaN(parsed)) setBudget(parsed);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Presupuesto total
        </p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <input
            type="number"
            className="w-24 px-2 py-1 rounded bg-gray-100 dark:bg-zinc-700 text-center text-gray-800 dark:text-white"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500 dark:text-gray-300">Gastado</p>
        <h2 className="text-xl font-bold text-red-500 dark:text-red-400">
          S/ {spent.toFixed(2)}
        </h2>
      </div>

      <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500 dark:text-gray-300">Restante</p>
        <h2
          className={`text-xl font-bold ${
            isOverBudget ? "text-red-600" : "text-green-600 dark:text-green-400"
          }`}
        >
          {isOverBudget ? "¡Te excediste!" : `S/ ${remaining.toFixed(2)}`}
        </h2>
      </div>
    </div>
  );
}

export default BudgetOverview;
