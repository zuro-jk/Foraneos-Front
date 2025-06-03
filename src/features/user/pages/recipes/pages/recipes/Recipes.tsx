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
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CardRecipe from "../../components/card-recipe/CardRecipe";
import { useRecipes } from "../../hooks/useRecipe";
import ErrorRecipes from "./components/ErrorRecipes";
import LoadingRecipes from "./components/LoadingRecipes";

const Recipes = () => {
  const { data: recipes, isLoading, isError } = useRecipes();

  const [activeTab, setActiveTab] = useState<"desayuno" | "almuerzo" | "cena">(
    "desayuno"
  );
  const [page, setPage] = useState(1);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    type: "",
    amount: "",
  });
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [userIngredients, setUserIngredients] = useState<
    { name: string; type: string; amount: string }[]
  >([]);

  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.type && newIngredient.amount) {
      setUserIngredients((prev) => [...prev, newIngredient]);
      setNewIngredient({ name: "", type: "", amount: "" });
      setShowIngredientModal(false);
    }
  };

  if (isLoading) return <LoadingRecipes />;
  if (isError) return <ErrorRecipes />;

  const CARDS_PER_PAGE = 6;
  const filteredRecipes = recipes?.filter((r) => r.mealType === activeTab) ?? [];
  const totalPages = Math.ceil(filteredRecipes.length / CARDS_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice(
    (page - 1) * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE
  );

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
                        title={recipe.name}
                        time={"5 min"}
                        kcal={recipe.calories}
                        protein={recipe.protein}
                        carbs={recipe.carbs}
                        fats={recipe.fat}
                      />
                    ))}
                  </div>
                )}
                {activeTab === "almuerzo" && (
                  <div className="grid grid-cols-3 gap-4">
                    {paginatedRecipes.map((recipe) => (
                      <CardRecipe
                        key={recipe.id}
                        title={recipe.name}
                        time={"5 min"}
                        kcal={recipe.calories}
                        protein={recipe.protein}
                        carbs={recipe.carbs}
                        fats={recipe.fat}
                      />
                    ))}
                  </div>
                )}
                {activeTab === "cena" && (
                  <div className="grid grid-cols-3 gap-4">
                    {paginatedRecipes.map((recipe) => (
                      <CardRecipe
                        key={recipe.id}
                        title={recipe.name}
                        time={"5 min"}
                        kcal={recipe.calories}
                        protein={recipe.protein}
                        carbs={recipe.carbs}
                        fats={recipe.fat}
                      />
                    ))}
                  </div>
                )}
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
              {userIngredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-white rounded-[7px] drop-shadow/25"
                >
                  <div className="flex flex-col">
                    <span className="font-bold">{ing.name}</span>
                    <span className="text-xs font-extralight">{ing.type}</span>
                  </div>
                  <span>{ing.amount}</span>
                </div>
              ))}

              <Dialog
                open={showIngredientModal}
                onOpenChange={setShowIngredientModal}
              >
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
                      value={newIngredient.name}
                      onChange={(e) =>
                        setNewIngredient({
                          ...newIngredient,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Tipo (ej: Proteina)"
                      value={newIngredient.type}
                      onChange={(e) =>
                        setNewIngredient({
                          ...newIngredient,
                          type: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Cantidad (ej: 2 unidades)"
                      value={newIngredient.amount}
                      onChange={(e) =>
                        setNewIngredient({
                          ...newIngredient,
                          amount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddIngredient}>Guardar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
