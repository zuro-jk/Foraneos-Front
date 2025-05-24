import { cn } from "@/lib/utils";
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
import { useFoodStore } from "./store/foodStore";
import { DndContext } from "@dnd-kit/core";
import type { Food } from "./types/food";

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


const MainDashboard = () => {
  const [openModal, setOpenModal] = useState<
    null | "comida" | "ejercicio" | "objetivo"
  >(null);
  const selectedFoods = useFoodStore((state) => state.selectedFoods);

  const [meals, setMeals] = useState<
    { id: number; title: string; foods: Food[] }[]
  >([
    { id: 1, title: "Desayuno", foods: [] },
    { id: 2, title: "Almuerzo", foods: [] },
    { id: 3, title: "Cena", foods: [] },
    { id: 4, title: "Snacks", foods: [] },
  ]);

  const unassignedFoods = selectedFoods.filter(
    (food) => !meals.some((meal) => meal.foods.some((f) => f.id === food.id))
  );

  const addMeal = () => {
    setMeals([
      ...meals,
      { id: Date.now(), title: `Comida ${meals.length + 1}`, foods: [] },
    ]);
  };

  const removeFoodFromMeal = (mealId: number, foodId: number) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === mealId
          ? { ...meal, foods: meal.foods.filter((f) => f.id !== foodId) }
          : meal
      )
    );
  };

  // Drag & drop handler
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const foodId = active.id;
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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-8 p-8">
          <div className="col-span-12">
            <h1 className="font-bold text-2xl">Dashboard</h1>
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
  
          
          <button
            className={cn(
              "border-2 border-gray-300 border-dashed rounded shadow p-4 col-span-4 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out",
              selectedFoods && selectedFoods.length > 0 ? "bg-gray-100" : ""
            )}
            onClick={() => setOpenModal("comida")}
          >
            {selectedFoods && selectedFoods.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-2 max-h-[23.5rem] overflow-y-auto">
                {selectedFoods.map((food) => (
                  <DraggableFood
                    key={food.id}
                    food={food}
                  />
                ))}
              </div>
            ) : (
              <span className="text-lg flex items-center justify-center gap-2">
                <Plus />
                Añadir Comida
              </span>
            )}
          </button>
          <button
            className="border-2 border-gray-300 border-dashed rounded shadow p-4 col-span-4 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
            onClick={() => setOpenModal("ejercicio")}
          >
            <span className="text-lg flex items-center justify-center gap-2">
              <Plus />
              Registrar Ejercicio
            </span>
          </button>
          <button className="border-2 border-gray-300 border-dashed rounded shadow p-4 col-span-4 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out">
            <span
              className="text-lg flex items-center justify-center gap-2"
              onClick={() => setOpenModal("objetivo")}
            >
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
  
          <div className="col-span-full flex flex-col gap-2 p-4 drop-shadow-lg rounded bg-white">
            <span className="font-bold text-lg">Comidas de hoy</span>
            <div className="grid grid-cols-4 gap-4">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="border border-solid rounded shadow p-4 flex flex-col gap-2 min-h-[120px]"
                >
                  <span className="font-bold">{meal.title}</span>
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="border-2 border-dashed rounded p-2 text-center text-gray-400 cursor-pointer hover:bg-gray-100 transition">
                      <Plus className="inline mr-1" /> Añadir{" "}
                      {meal.title.toLowerCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="bg-white drop-shadow-2xl rounded p-8 col-span-6">
            <span className="font-bold text-lg">Consumo semanal de calorías</span>
            <div className="flex flex-col items-center justify-center">
              <ChartTotalCalories />
            </div>
          </div>
          <div className="bg-white drop-shadow-2xl rounded p-8 col-span-6">
            <span className="font-bold text-lg">Total de calorías</span>
            <ChartCalories />
          </div>
  
          <div className="bg-white drop-shadow-2xl rounded p-8 col-span-6">
            <span className="font-bold text-lg">
              Distribución de macronutrientes
            </span>
            <ChartMacronutrients />
          </div>
  
          <div className="bg-white drop-shadow-2xl rounded p-8 col-span-6">
            <span className="font-bold text-lg">Comidas registradas</span>
            <div className="flex items-center justify-center h-full">
              <div className="bg-blue-800/10 w-[30rem] h-[16rem] p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="bg-gray-400/60 rounded-full px-4 py-1 w-fit text-white uppercase">
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
                <div className="flex flex-col py-2 px-6">
                  <div className="flex items-center justify-between border-b border-gray-300 py-2">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-red-300 rounded-full text-white">
                        P
                      </span>
                      <span>4 Huevos Blancos</span>
                    </div>
                    <span className="text-blue-700/80">60 Cal</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-300 py-2">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-green-300 rounded-full text-white">
                        F
                      </span>
                      <span>1 Aguacate</span>
                    </div>
                    <span className="text-blue-700/80">60 Cal</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-300 py-2">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-blue-300 rounded-full text-white">
                        C
                      </span>
                      <span>1 Taza de avena</span>
                    </div>
                    <span className="text-blue-700/80">60 Cal</span>
                  </div>
  
                  <div className="flex items-center justify-center">
                    <button className="absolute left-1/2 bottom-10 -translate-x-1/2 cursor-pointer drop-shadow-xl bg-blue-500 text-white rounded-full p-2">
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
