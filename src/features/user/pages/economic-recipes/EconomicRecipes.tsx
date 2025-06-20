import RecipesFilterBar from "./components/recipes-filter-bar/RecipesFilterBar";
import RecipesGrid from "./components/recipes-grid/RecipesGrid";

function EconomicRecipes() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Titulo y descripción */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md space-y-4">
        <header>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            🥗 Recetas Economicas
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Descubre recetas deliciosas, fáciles y con bajo presupuesto. Ideales
            para foráneos
          </p>
        </header>
  
        {/* Barra de filtros y búsqueda */}
        <RecipesFilterBar />
  
        {/* Resultados de recetas */}
        <RecipesGrid />
      </div>
    </div>
  );
}

export default EconomicRecipes;
