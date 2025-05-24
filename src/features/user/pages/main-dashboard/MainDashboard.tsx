import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  ArrowUpRight,
  BarChart,
  ChevronDown,
  Clock,
  Heart,
  Plus,
  Siren,
} from "lucide-react";
import { useState } from "react";
import AddExerciseModal from "./components/add-exercise-modal/AddExerciseModal";
import AddFoodModal from "./components/add-food-modal/AddFoodModal";
import AddGoalModal from "./components/add-goal-modal/AddGoalModal";
import CardActivityInformation from "./components/card-activity-information/CardActivityInformation";
import ChartCalories from "./components/chart-activity/ChartCalories";
import ChartMacronutrients from "./components/chart-activity/ChartMacronutrients";
import ChartTotalCalories from "./components/chart-activity/ChartTotalCalories";
import DraggableFood from "./components/draggable-food/DraggableFood";
import MealDropzone from "./components/meal-dropzone/MealDropzone";
import { useFoodStore } from "./store/foodStore";
import type { Food, Meal } from "./types/food";

const informationActivity = [
  {
    icon: Siren,
    iconColor: "transparent",
    backgroundColor: "transparent",
    title: "Calorías",
    value: "2,000",
    percentage: "12% más que ayer",
    percentageIcon: ArrowUpRight,
    percentageColor: "text-green-600",
  },
  {
    icon: Heart,
    iconColor: "text-blue-600",
    backgroundColor: "bg-blue-200",
    title: "Ingesta de proteinas",
    value: "82g",
    percentage: "8% sobre el objetivo",
    percentageIcon: ArrowUpRight,
    percentageColor: "text-green-600",
  },
  {
    icon: Clock,
    iconColor: "text-pink-600",
    backgroundColor: "bg-pink-200",
    title: "Recuento de comidas",
    value: "4/5",
    percentage: "En camino",
    percentageIcon: ArrowUpRight,
    percentageColor: "text-yellow-600",
  },
  {
    icon: BarChart,
    iconColor: "text-purple-600",
    backgroundColor: "bg-purple-200",
    title: "Ingesta de agua",
    value: "1.8L",
    percentage: "0.7L restantes",
    percentageIcon: ChevronDown,
    percentageColor: "text-red-600",
  },
];

const dataMeals = [
  { id: 1, title: "Desayuno", foods: [] },
  { id: 2, title: "Almuerzo", foods: [] },
  { id: 3, title: "Cena", foods: [] },
  { id: 4, title: "Snacks", foods: [] },
];

interface modalState {
  open: boolean;
  type: "comida" | "ejercicio" | "objetivo";
}

// TODO permitir añadir otro meal segun el usuario quiero
// TODO ordenamiento de meals para que prefiera cual va primero
// TODO terminar el dialog de ejercicio
// TODO terminar el dialog de objetivo

const MainDashboard = () => {
  const [openModal, setOpenModal] = useState<modalState["type"] | null>(null);
  const { selectedFoods, removeFood } = useFoodStore();

  const [meals, setMeals] = useState<Meal[]>(dataMeals);
  const [newMealTitle, setNewMealTitle] = useState("");

  const unassignedFoods = selectedFoods.filter(
    (food) => !meals.some((meal) => meal.foods.some((f) => f.id === food.id))
  );

  const handleRemoveFoodFromMeal = (mealId: number, foodId: number) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === mealId
          ? { ...meal, foods: meal.foods.filter((f) => f.id !== foodId) }
          : meal
      )
    );
  };

  const handleRemoveFoodEverywhere = (food: Food) => {
    // Quita de selectedFoods
    removeFood(food);
    // Quita de todos los meals
    setMeals((prev) =>
      prev.map((meal) => ({
        ...meal,
        foods: meal.foods.filter((f) => f.id !== food.id),
      }))
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const foodId = Number(active.id);
    const mealId = Number(over.id);

    // Encuentra el alimento
    const food = selectedFoods.find((f) => f.id === foodId);
    if (!food) return;

    setMeals((prev) =>
      prev.map((meal) => {
        // Si es el meal destino, agrega el alimento si no está
        if (meal.id === mealId && !meal.foods.some((f) => f.id === foodId)) {
          return { ...meal, foods: [...meal.foods, food] };
        }
        // Si el alimento estaba en otro meal, lo quita
        return { ...meal, foods: meal.foods.filter((f) => f.id !== foodId) };
      })
    );
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-8 p-8">
          <div className="col-span-12">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <span className="text-gray-500 text-normal">
              Seguimiento de sus objetivos de nutrición y salud
            </span>
          </div>

          {informationActivity.map((item, index) => (
            <div
              className="col-span-3"
              key={index}
            >
              <CardActivityInformation
                icon={item.icon}
                backgroundColor={item.backgroundColor}
                iconColor={item.iconColor}
                title={item.title}
                value={item.value}
                percentage={item.percentage}
                percentageIcon={item.percentageIcon}
                percentageColor={item.percentageColor}
              />
            </div>
          ))}

          <div
            className={cn(
              "border-2 border-gray-300 border-dashed rounded shadow col-span-4 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out bg-white",
              selectedFoods && selectedFoods.length > 0 ? "bg-gray-100" : ""
            )}
            onClick={() => setOpenModal("comida")}
          >
            {unassignedFoods.length > 0 ? (
              <div className="grid grid-cols-2 p-4 items-center justify-center gap-6 max-h-[23.5rem] overflow-y-auto">
                {unassignedFoods.map((food) => (
                  <DraggableFood
                    key={food.id}
                    food={food}
                    removeFood={removeFood}
                  />
                ))}
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2 text-lg">
                <Plus />
                Añadir Comida
              </span>
            )}
          </div>

          <button
            className="flex items-center justify-center col-span-4 p-4 transition duration-200 ease-in-out bg-white border-2 border-gray-300 border-dashed rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => setOpenModal("ejercicio")}
          >
            <span className="flex items-center justify-center gap-2 text-lg">
              <Plus />
              Registrar Ejercicio
            </span>
          </button>
          <button
            className="flex items-center justify-center col-span-4 p-4 transition duration-200 ease-in-out bg-white border-2 border-gray-300 border-dashed rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => setOpenModal("objetivo")}
          >
            <span className="flex items-center justify-center gap-2 text-lg">
              <Plus />
              Fijar un nuevo objetivo
            </span>
          </button>

          {openModal === "comida" && (
            <AddFoodModal
              open={openModal === "comida"}
              onOpenChange={(open) => {
                if (!open) setOpenModal(null);
              }}
              removeFoodEverywhere={handleRemoveFoodEverywhere}
            />
          )}
          {openModal === "ejercicio" && (
            <AddExerciseModal
              open={openModal === "ejercicio"}
              onOpenChange={(open) => {
                if (!open) setOpenModal(null);
              }}
            />
          )}
          {openModal === "objetivo" && (
            <AddGoalModal
              open={openModal === "objetivo"}
              onOpenChange={(open) => {
                if (!open) setOpenModal(null);
              }}
            />
          )}

          <div className="flex flex-col gap-2 p-4 bg-white rounded col-span-full drop-shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Comidas de hoy</span>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600">
                    <Plus /> Añadir comida personalizada
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Añadir comida personalizada</DialogTitle>
                    <DialogDescription>
                      Añade otra comida a tu dieta
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const title = newMealTitle.trim();
                      if (!title) return;
                      const newId =
                        meals.length > 0
                          ? Math.max(...meals.map((m) => m.id)) + 1
                          : 1;
                      setMeals([
                        ...meals,
                        {
                          id: newId,
                          title,
                          foods: [],
                        },
                      ]);
                      setNewMealTitle("");
                    }}
                  >
                    <div>
                      <Label
                        className="text-sm font-semibold text-gray-700"
                        htmlFor="custom-food-name"
                      >
                        Nombre de la comida
                      </Label>
                      <Input
                        id="custom-food-name"
                        placeholder="Nombre de la comida"
                        value={newMealTitle}
                        onChange={(e) => setNewMealTitle(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="mt-2 cursor-pointer"
                      >
                        Agregar
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {meals.map((meal) => (
                <MealDropzone
                  key={meal.id}
                  meal={meal}
                  removeFood={(food) =>
                    handleRemoveFoodFromMeal(meal.id, food.id)
                  }
                />
              ))}
            </div>
          </div>

          <div className="col-span-6 p-8 bg-white rounded drop-shadow-2xl">
            <span className="text-lg font-bold">
              Consumo semanal de calorías
            </span>
            <div className="flex flex-col items-center justify-center">
              <ChartTotalCalories />
            </div>
          </div>
          <div className="col-span-6 p-8 bg-white rounded drop-shadow-2xl">
            <span className="text-lg font-bold">Total de calorías</span>
            <ChartCalories />
          </div>

          <div className="col-span-6 p-8 bg-white rounded drop-shadow-2xl">
            <span className="text-lg font-bold">
              Distribución de macronutrientes
            </span>
            <ChartMacronutrients />
          </div>

          <div className="col-span-6 p-8 bg-white rounded drop-shadow-2xl">
            <span className="text-lg font-bold">Comidas registradas</span>
            <div className="flex items-center justify-center h-full">
              <div className="bg-blue-800/10 w-[30rem] h-[16rem] p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1 text-white uppercase rounded-full bg-gray-400/60 w-fit">
                    Desayuno
                  </span>
                  <ChartTotalCalories
                    value={60} // porcentaje de progreso, por ejemplo 60%
                    size={48} // tamaño pequeño
                    strokeWidth={6}
                    color="#2563eb" // azul, puedes cambiarlo
                    bgColor="#dbeafe" // azul claro, puedes cambiarlo
                    text="83"
                    showPercentageText={false}
                    className="justify-end"
                  />
                </div>
                <div className="flex flex-col px-6 py-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-300">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 text-white bg-red-300 rounded-full">
                        P
                      </span>
                      <span>4 Huevos Blancos</span>
                    </div>
                    <span className="text-blue-700/80">60 Cal</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-300">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 text-white bg-green-300 rounded-full">
                        F
                      </span>
                      <span>1 Aguacate</span>
                    </div>
                    <span className="text-blue-700/80">60 Cal</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-300">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 text-white bg-blue-300 rounded-full">
                        C
                      </span>
                      <span>1 Taza de avena</span>
                    </div>
                    <span className="text-blue-700/80">60 Cal</span>
                  </div>

                  <div className="flex items-center justify-center">
                    <button className="absolute p-2 text-white -translate-x-1/2 bg-blue-500 rounded-full cursor-pointer left-1/2 bottom-10 drop-shadow-xl">
                      <Plus size={34} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default MainDashboard;
