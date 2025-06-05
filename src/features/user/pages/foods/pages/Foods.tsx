import { useUserStore } from "@/features/auth/store/userStore";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useQueryClient } from "@tanstack/react-query";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { FoodPayload } from "../dto/request/foodPayload";
import type { FoodResponse } from "../dto/response/foodResponse";
import {
  useAddFoodFromUser,
  useDeleteFoodFromUser,
  useGetCategoriesOfFoods,
  useGetFoodsFromGeneral,
  useGetFoodsFromUser,
} from "../hooks/useFoods";

const Foods = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategoriesInput, setSelectedCategoriesInput] = useState<
    number[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const {
    data: userFoods,
    isLoading,
    isError,
    isFetching,
  } = useGetFoodsFromUser(search, selectedCategories);
  const { data: generalFoods } = useGetFoodsFromGeneral(search);
  const { data: categoriesOfFoods } = useGetCategoriesOfFoods();
  const { user } = useUserStore();
  const addFoodMutation = useAddFoodFromUser();
  const deleteFoodMutation = useDeleteFoodFromUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleAddGeneralFood = (food: FoodResponse) => {
    if (!user?.id) {
      toast("Debes iniciar sesión para añadir alimentos.", {
        type: "error",
      });
      return;
    }

    const payload: FoodPayload = {
      name: food.name,
      description: food.description,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      brand: food.brand || "",
      barcode: food.barcode || "",
      categoryIds: food.categories.map((category) => category.id),
      ingredients: food.ingredients.map((ingredient) => ({
        unitId: ingredient.unit ? ingredient.unit.id : null,
        name: ingredient.name,
        amount: ingredient.amount,
      })),
      preparationSteps: food.preparationSteps.map((step, idx) => ({
        stepNumber: step.stepNumber ?? idx + 1,
        description: step.description,
      })),
      userId: user.id,
      originalFoodId: food.id,
    };

    addFoodMutation.mutate(payload, {
      onSuccess: () => {
        toast("Alimento añadido correctamente.", {
          type: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["foodsFromUser"] });
        queryClient.invalidateQueries({ queryKey: ["foodsFromGeneral"] });
      },
      onError: (error) => {
        toast(`Error al añadir el alimento: ${error.message}`, {
          type: "error",
        });
      },
    });
  };

  const handleDeleteFood = (foodId: number) => {
    deleteFoodMutation.mutate(foodId, {
      onSuccess: () => {
        toast("Alimento eliminado correctamente.", {
          type: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["foodsFromUser"] });
        queryClient.invalidateQueries({ queryKey: ["foodsFromGeneral"] });
      },
      onError: (error) => {
        toast(`Error al eliminar el alimento: ${error.message}`, {
          type: "error",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="col-span-2 text-gray-500 text-center">
        Cargando tus alimentos...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="col-span-2 text-red-500 text-center">
        Error al cargar tus alimentos.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Mis alimentos</h1>
          <Button
            className="cursor-pointer"
            onClick={() => navigate("add")}
            title="Añadir nuevo alimento"
            variant="outline"
            size="icon"

          >
            <Plus size={18} />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Buscar alimento..."
            className="w-full p-2 border rounded"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-start justify-start min-w-[180px] max-w-[220px] cursor-pointer"
              >
                {selectedCategoriesInput.length > 0
                  ? (() => {
                      const selected =
                        categoriesOfFoods
                          ?.filter((cat) =>
                            selectedCategoriesInput.includes(cat.id)
                          )
                          .map((cat) => cat.name) ?? [];
                      if (selected.length === 1) return selected[0];
                      if (selected.length === 2)
                        return `${selected[0]}, ${selected[1]}`;
                      if (selected.length > 2)
                        return `${selected[0]}, ${selected[1]} +${
                          selected.length - 2
                        }`;
                      return "Filtrar por categorías";
                    })()
                  : "Filtrar por categorías"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {categoriesOfFoods?.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      checked={selectedCategoriesInput.includes(category.id)}
                      onCheckedChange={(checked) => {
                        setSelectedCategoriesInput((prev) =>
                          checked
                            ? [...prev, category.id]
                            : prev.filter((c) => c !== category.id)
                        );
                      }}
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => {
              setSearch(searchInput);
              setSelectedCategories(selectedCategoriesInput);
            }}
            size="sm"
            className="cursor-pointer"
          >
            Filtrar
          </Button>
        </div>

        {/* Alimentos del usuario */}
        <div className="flex items-center my-2">
          <h2 className="text-lg font-semibold">Tus alimentos</h2>
          {isFetching && (
            <span className="text-xs text-gray-400">Actualizando...</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {!userFoods ? (
            <div className="col-span-2 text-gray-500 text-center">
              Cargando tus alimentos...
            </div>
          ) : userFoods.length === 0 ? (
            <div className="col-span-2 text-gray-500 text-center">
              No tienes alimentos añadidos.
            </div>
          ) : (
            userFoods!.map((food) => (
              <div
                key={food.id}
                className="flex gap-4 bg-white rounded-xl shadow p-4 items-center"
              >
                <img
                  src={"/images/recipes/receta-1.png"}
                  alt={food.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <div className="font-bold text-lg">{food.name}</div>
                  <div className="text-sm text-gray-600">
                    Calorías: {food.calories} kcal | Proteínas: {food.protein}g
                    | Carbs: {food.carbs}g | Grasas: {food.fat}g
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    className="p-2 rounded hover:bg-blue-100 cursor-pointer"
                    title="Editar"
                    variant="ghost"
                    onClick={() => navigate(`edit/${food.id}`)}
                  >
                    <Edit2
                      className="text-blue-600"
                      size={18}
                    />
                  </Button>
                  <button
                    className="p-2 rounded hover:bg-red-100 cursor-pointer"
                    title="Eliminar"
                    onClick={() => handleDeleteFood(food.id)}
                  >
                    <Trash2
                      className="text-red-600"
                      size={18}
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Catálogo general */}
        <h2 className="text-lg font-semibold mb-2">Catálogo general</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!generalFoods ? (
            <div className="col-span-2 text-gray-500 text-center">
              Cargando catálogo general...
            </div>
          ) : generalFoods!.length === 0 ? (
            <div className="col-span-2 text-gray-500 text-center">
              No hay alimentos en el catálogo.
            </div>
          ) : (
            generalFoods!.map((food) => (
              <div
                key={food.id}
                className="flex gap-4 bg-white rounded-xl shadow p-4 items-center"
              >
                <img
                  src={"/images/recipes/receta-1.png"}
                  alt={food.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <div className="font-bold text-lg">{food.name}</div>
                  <div className="text-sm text-gray-600">
                    Calorías: {food.calories} kcal | Proteínas: {food.protein}g
                    | Carbs: {food.carbs}g | Grasas: {food.fat}g
                  </div>
                </div>
                <Button
                  className="p-2 rounded hover:bg-green-100 cursor-pointer"
                  size="icon"
                  variant="ghost"
                  title="Añadir a mis alimentos"
                  onClick={() => handleAddGeneralFood(food)}
                >
                  <Plus
                    className="text-green-600"
                    size={18}
                  />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Foods;
