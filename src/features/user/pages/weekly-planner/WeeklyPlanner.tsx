import GenerateShoppingListButton from "./components/GenerateShoppingListButton";
import WeeklyCalendar from "./components/WeeklyCalendar";

function WeeklyPlanner() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6 space-y-4">
        <header>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            📅 Planificador Semanal
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Organiza tus comidas y recetas para toda la semana. Haz tu vida más
            simple y económica.
          </p>
        </header>

        <GenerateShoppingListButton />
        <WeeklyCalendar />
      </div>
    </div>
  );
}

export default WeeklyPlanner;
