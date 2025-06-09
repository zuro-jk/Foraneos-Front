import { useGetFoods } from "@/features/user/hooks/foods/useFoods";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CardRecipe from "../../components/card-recipe/CardRecipe";
import ErrorRecipes from "./components/ErrorRecipes";
import LoadingRecipes from "./components/LoadingRecipes";

const TABS = [
  { key: "DESAYUNO", label: "Desayuno" },
  { key: "ALMUERZO", label: "Almuerzo" },
  { key: "CENA", label: "Cena" },
];

const Recipes = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const { data: recipes, isLoading, isError } = useGetFoods();

  if (isLoading) return <LoadingRecipes />;
  if (isError) return <ErrorRecipes />;

  const filteredRecipes =
    recipes?.filter((recipe) => recipe.mealType === activeTab) || [];

  return (
    <div className="bg-[url('/images/recipes/fondo.jpg')] bg-cover bg-no-repeat bg-center h-full">
      <div className="container p-4 mx-auto">
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
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`flex justify-center items-center flex-1 cursor-pointer transition-colors ${
                      activeTab === tab.key ? "bg-white rounded" : ""
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                    type="button"
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="bg-transparent rounded-b min-h-[80px]">
                <div className="grid grid-cols-3 gap-4">
                  {filteredRecipes.length === 0 && (
                    <span className="col-span-3 text-center text-gray-400">
                      No hay recetas para este tipo de comida.
                    </span>
                  )}
                  {filteredRecipes.map((recipe) => (
                    <CardRecipe
                      key={recipe.id}
                      recipe={recipe}
                    />
                  ))}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
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
                  <span className="font-bold">Pollo a la plancha</span>
                  <span className="text-xs font-extralight">Proteina</span>
                </div>
                <span>
                  <span className="text-xs font-extralight">2 unidades</span>
                  <span className="text-xs font-extralight text-gray-500">
                    (200g)
                  </span>
                </span>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="cursor-pointer shadow/25">
                    <PlusCircle className="w-4 h-4 " />
                    Añadir ingrediente
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Añadir ingrediente</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-3">
                    <Input
                      placeholder="Nombre"
                      value={""}
                    />
                    <Input placeholder="Tipo (ej: Proteina)" />
                    <Input placeholder="Cantidad (ej: 2 unidades)" />
                  </div>
                  <DialogFooter>
                    <Button>Guardar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* <Foods /> */}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
