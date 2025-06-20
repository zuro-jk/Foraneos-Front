function BudgetSummary() {
  const assignedBudget = 50.0;
  const currentSpending = 37.5;
  const remaining = assignedBudget - currentSpending;
  const percentage = Math.min((currentSpending / assignedBudget) * 100, 100);

  const isOver = currentSpending > assignedBudget;

  return (
    <div className="col-span-1 lg:col-span-2 xl:col-span-3 bg-white dark:bg-zinc-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        💰 Presupuesto Alimenticio
      </h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Presupuesto semanal:{" "}
          <span className="font-medium">S/ {assignedBudget.toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Gasto actual:{" "}
          <span className={`font-medium ${isOver ? "text-red-500" : ""}`}>
            S/ {currentSpending.toFixed(2)}
          </span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Disponible:{" "}
          <span className={`font-medium`}>S/ {remaining.toFixed(2)}</span>
        </p>
      </div>

      <div
        className="w-full bg-gray-200 dark:bg-gray-700 rounde
      d-full h-4"
      >
        <div
          className={`h-4 rounded-full transition-all ${
            percentage >= 100 ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isOver && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400 font-medium">
          ¡Cuidado! Has superado tu presupuesto semanal.
        </p>
      )}
    </div>
  );
}

export default BudgetSummary;
