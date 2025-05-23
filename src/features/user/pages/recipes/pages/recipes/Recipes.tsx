import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CardRecipe from "../../components/card-recipe/CardRecipe";

const Recipes = () => {
  const [activeTab, setActiveTab] = useState<"desayuno" | "almuerzo" | "cena">(
    "desayuno"
  );

  return (
    <div className="bg-[url('/images/recipes/fondo.jpg')] bg-cover bg-no-repeat bg-center h-full">
      <div className="container mx-auto py-4">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <span className="text-2xl font-bold">
              Bienvenido [Usuario | Nombre]
            </span>
            <Button className="cursor-pointer flex items-center gap-2">
              <PlusCircle size={18} />
              Nueva receta
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-4">
            <div className="flex flex-col gap-4 col-span-6 drop-shadow bg-white/70 rounded p-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-3xl">
                    Sugerencia de comidas
                  </span>
                  <span className="text-gray-500">
                    Tus comidas recomendadas para hoy
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="cursor-pointer px-4 py-2 bg-white shadow  rounded hover:bg-gray-100 hover:scale-105 transition-all ease-in-out duration-200">
                    Ver Todas
                  </button>
                </div>
              </div>

              <div className="w-full grid grid-cols-3 bg-white border-3 border-green-800 rounded">
                <button
                  className={`flex justify-center items-center hover:text-gray-500 flex-1 cursor-pointer hover:bg-gray-200 transition-colors ${
                    activeTab === "desayuno" ? "bg-gray-300/80" : ""
                  }`}
                  onClick={() => setActiveTab("desayuno")}
                  type="button"
                >
                  <span>Desayuno</span>
                </button>
                <button
                  className={`flex justify-center items-center flex-1 border-l-3 border-r-3 border-green-800 py-1 cursor-pointer hover:text-gray-500 ease-in-out duration-200 hover:bg-gray-200 transition-colors ${
                    activeTab === "almuerzo" ? "bg-gray-300/80" : ""
                  }`}
                  onClick={() => setActiveTab("almuerzo")}
                  type="button"
                >
                  <span>Almuerzo</span>
                </button>
                <button
                  className={`flex justify-center items-center hover:text-gray-500 flex-1 cursor-pointer hover:bg-gray-200 transition-colors ${
                    activeTab === "cena" ? "bg-gray-300/80" : ""
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
                    <CardRecipe
                      title="Tostadas de aguacate"
                      time="5 min"
                      kcal={320}
                      protein={12}
                      carbs={30}
                      fats={18}
                    />
                    <CardRecipe
                      title="Yogur con granola"
                      time="5 min"
                      kcal={350}
                      protein={15}
                      carbs={45}
                      fats={12}
                      className="bg-green-200"
                    />
                    <CardRecipe
                      title="Batido de proteínas"
                      time="5 min"
                      kcal={280}
                      protein={24}
                      carbs={25}
                      fats={8}
                      className="bg-green-200"
                    />
                  </div>
                )}
                {activeTab === "almuerzo" && (
                  <div className="p-4 bg-white"></div>
                )}
                {activeTab === "cena" && <div className="p-4 bg-white"></div>}
              </div>
            </div>

            <div className="bg-white/70 rounded drop-shadow p-4 col-span-3 flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="font-bold text-3xl">Mis ingredientes</span>
                <span className="text-gray-500">Ingredientes disponibles</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  className="bg-green-200 text-black border-zinc-800/80 border-1"
                  variant="outline"
                >
                  Todos
                </Badge>
                <Badge
                  className="bg-white text-black"
                  variant="outline"
                >
                  Proteinas
                </Badge>
                <Badge
                  className="bg-white text-black"
                  variant="outline"
                >
                  Carbohidratos
                </Badge>
                <Badge
                  className="bg-white text-black"
                  variant="outline"
                >
                  Grasas
                </Badge>
                <Badge
                  className="bg-white text-black"
                  variant="outline"
                >
                  Liquidos
                </Badge>
                <Badge
                  className="bg-white text-black"
                  variant="outline"
                >
                  Frutas
                </Badge>
                <Badge
                  className="bg-white text-black"
                  variant="outline"
                >
                  Verduras
                </Badge>
                <Badge
                  className="bg-white text-black"
                  variant="outline"
                >
                  Condimentos
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
