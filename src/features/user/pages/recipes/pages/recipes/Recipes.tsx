import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CardRecipe from "../../components/card-recipe/CardRecipe";
import { recipes } from "../../data/recipes-data";

const CARDS_PER_PAGE = 6;

const Recipes = () => {
  const [activeTab, setActiveTab] = useState<"desayuno" | "almuerzo" | "cena">(
    "desayuno"
  );
  const [page, setPage] = useState(1);

  const filteredRecipes = recipes;

  const totalPages = Math.ceil(filteredRecipes.length / CARDS_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice(
    (page - 1) * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE
  );

  const handleTabChange = (tab: "desayuno" | "almuerzo" | "cena") => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="bg-[url('/images/recipes/fondo.jpg')] bg-cover bg-no-repeat bg-center h-full">
      <div className="container py-4 mx-auto">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-9 ">
            <div className="flex flex-col col-span-7 gap-4 p-4 rounded drop-shadow bg-white/70 backdrop-blur-[70px]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">
                    Sugerencia de comidas
                  </span>
                  <span className="text-gray-500">
                    Tus comidas recomendadas para hoy
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 transition-all duration-200 ease-in-out bg-white rounded shadow cursor-pointer hover:bg-gray-100 hover:scale-105">
                    Ver Todas
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 px-2 py-1 bg-[#71CE6F] rounded">
                <button
                  className={`flex justify-center items-center flex-1 cursor-pointer transition-colors ${
                    activeTab === "desayuno" ? "bg-white rounded" : ""
                  }`}
                  onClick={() => setActiveTab("desayuno")}
                  type="button"
                >
                  <span>Desayuno</span>
                </button>
                <button
                  className={`flex justify-center items-center flex-1 py-1 cursor-pointer ease-in-out duration-200 transition-colors ${
                    activeTab === "almuerzo" ? "bg-white rounded" : ""
                  }`}
                  onClick={() => setActiveTab("almuerzo")}
                  type="button"
                >
                  <span>Almuerzo</span>
                </button>
                <button
                  className={`flex justify-center items-center cursor-pointer transition-colors ${
                    activeTab === "cena" ? "bg-white rounded" : ""
                  }`}
                  onClick={() => setActiveTab("cena")}
                  type="button"
                >
                  <span>Cena</span>
                </button>
              </div>
              <div className="bg-transparent rounded-b min-h-[80px]">
                {activeTab === "desayuno" && (
                  <div className="grid grid-cols-3 gap-4">
                    {paginatedRecipes.map((recipe) => (
                      <CardRecipe
                        key={recipe.id}
                        title={recipe.title}
                        time={recipe.time}
                        kcal={recipe.kcal}
                        protein={recipe.protein}
                        carbs={recipe.carbs}
                        fats={recipe.fats}
                      />
                    ))}
                  </div>
                )}
                {activeTab === "almuerzo" && (
                  <div className="p-4 bg-white"></div>
                )}
                {activeTab === "cena" && <div className="p-4 bg-white"></div>}
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Anterior
                  </button>
                  <span className="px-2 py-1">
                    {page} / {totalPages}
                  </span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-[70px] rounded drop-shadow p-4 col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">Mis ingredientes</span>
                  <span className="text-gray-500">
                    Ingredientes disponibles
                  </span>
                </div>
                <button className="cursor-pointer h-fit">
                  <PlusCircle className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  className="text-black bg-green-200 border-zinc-800/80 border-1"
                  variant="outline"
                >
                  Todos
                </Badge>
                <Badge
                  className="text-black bg-white"
                  variant="outline"
                >
                  Proteinas
                </Badge>
                <Badge
                  className="text-black bg-white"
                  variant="outline"
                >
                  Carbohidratos
                </Badge>
                <Badge
                  className="text-black bg-white"
                  variant="outline"
                >
                  Grasas
                </Badge>
                <Badge
                  className="text-black bg-white"
                  variant="outline"
                >
                  Liquidos
                </Badge>
                <Badge
                  className="text-black bg-white"
                  variant="outline"
                >
                  Frutas
                </Badge>
                <Badge
                  className="text-black bg-white"
                  variant="outline"
                >
                  Verduras
                </Badge>
                <Badge
                  className="text-black bg-white"
                  variant="outline"
                >
                  Condimentos
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-[7px] drop-shadow/25">
                <div className="flex flex-col">
                  <span className="font-bold">Huevo</span>
                  <span className="text-xs font-extralight">Proteina</span>
                </div>
                <span>4 unidades</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-[7px] drop-shadow/25">
                <div className="flex flex-col">
                  <span className="font-bold">Pollo/Pierna</span>
                  <span className="text-xs font-extralight">Proteina</span>
                </div>
                <span>1 unidades</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-[7px] drop-shadow/25">
                <div className="flex flex-col">
                  <span className="font-bold">Sal</span>
                  <span className="text-xs font-extralight">Condimentos</span>
                </div>
                <span>500 gramos</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-[7px] drop-shadow/25">
                <div className="flex flex-col">
                  <span className="font-bold">Atún</span>
                  <span className="text-xs font-extralight">Proteina</span>
                </div>
                <span>4 unidades</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-[7px] drop-shadow/25">
                <div className="flex flex-col">
                  <span className="font-bold">Azucar</span>
                  <span className="text-xs font-extralight">Condimentos</span>
                </div>
                <span>1k gramo</span>
              </div>

              <Button className="cursor-pointer shadow/25">
                <PlusCircle className="w-4 h-4 " />
                Añadir ingrediente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
