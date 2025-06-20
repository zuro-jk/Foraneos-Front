import { BudgetOverview, BudgetProgress } from "./components";

function FoodBudget() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow space-y-4">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              💰 Presupuesto Alimenticio
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Controla tus gastos semanales o mensuales para optimizar tu
              alimentación sin excederte.
            </p>
          </div>
        </header>

        <BudgetOverview />
        <BudgetProgress />
      </div>
    </div>
  );
}

export default FoodBudget;
