import useBudgetStore from "@/store/useBudgetStore";
import useShoppingListStore from "@/store/useShoppingListStore";

function BudgetProgress() {
  const budget = useBudgetStore((state) => state.budget);
  const items = useShoppingListStore((state) => state.items);
  
  const spent = items.filter((item) => item.checked).reduce((acc, item) => acc + item.price, 0);
  const percentage = Math.min((spent / budget) * 100, 100);

  const progressColor =
    percentage < 60
      ? "bg-green-500"
      : percentage < 90
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow space-y-2">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Progreso del presupuesto
      </p>
      <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-5 overflow-hidden">
        <div
          className={`${progressColor} h-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {percentage.toFixed(1)}% utilizado
      </p>
    </div>
  );
}

export default BudgetProgress;
