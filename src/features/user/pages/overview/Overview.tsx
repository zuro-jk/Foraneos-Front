import BudgetSummary from "./components/budget-summary/BudgetSummary";
import QuickActions from "./components/quick-actions/QuickActions";
import RecipeSuggestions from "./components/recipe-suggestions/RecipeSuggestions";
import ShoppingListPreview from "./components/shopping-list-preview/ShoppingListPreview";
import WeeklyPlan from "./components/weekly-plan/WeeklyPlan";
import WelcomeBanner from "./components/welcome-banner/WelcomeBanner";

function Overview() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 bg-white p-6 gap-6 rounded-2xl shadow-md dark:bg-zinc-800">
        {/* Panel de Bienvenida */}
        <WelcomeBanner />

        {/* Accesos Rápidos */}
        <QuickActions />

        {/* Recetas Sugeridas */}
        <RecipeSuggestions />

        {/* Plan semanal */}
        <WeeklyPlan />

        {/* Presupuesto */}
        <ShoppingListPreview />

        {/* Lista de compras */}
        <BudgetSummary />
      </div>
    </div>
  );
}

export default Overview;
