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
import { List, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildInformationActivity } from "../../../../utils/summary";
import type { FoodResponse } from "../../dto/response/food/foodResponse";
import { useGetDailyCaloriesByUserAuthenticated } from "../../hooks/foods/useFoods";
import { useGetSummaryByUserAuthByPeriod } from "../../hooks/summary/useSummary";
import { useExerciseStore } from "../../store/overview/exerciseStore";
import { useFoodStore } from "../../store/overview/foodStore";
import { useGoalStore } from "../../store/overview/goalStore";
import type { Meal } from "../../types/foods/food";
import AddExerciseModal from "./components/add-exercise-modal/AddExerciseModal";
import AddFoodModal from "./components/add-food-modal/AddFoodModal";
import AddGoalModal from "./components/add-goal-modal/AddGoalModal";
import CardActivityInformation from "./components/card-activity-information/CardActivityInformation";
import ChartCalories from "./components/chart-activity/ChartCalories";
import ChartMacronutrients from "./components/chart-activity/ChartMacronutrients";
import ChartTotalCalories from "./components/chart-activity/ChartTotalCalories";
import DraggableFood from "./components/draggable-food/DraggableFood";
import MealDropzone from "./components/meal-dropzone/MealDropzone";

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

// TODO ordenamiento de meals para que prefiera cual va primero

const MainDashboard = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<modalState["type"] | null>(null);
  const { selectedFoods, removeFood } = useFoodStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { selectedExercises } = useExerciseStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { selectedGoals } = useGoalStore();

  const { data: informationActivityData } = useGetSummaryByUserAuthByPeriod();
  const { data: dailyCalories } = useGetDailyCaloriesByUserAuthenticated();
  const informationActivity = buildInformationActivity(informationActivityData);
  const totalWeeklyCalories = dailyCalories
    ? dailyCalories.reduce((acc, curr) => acc + curr.totalCalories, 0)
    : 0;

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

  const handleRemoveFoodEverywhere = (food: FoodResponse) => {
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
              className="col-span-12 sm:col-span-6 xl:col-span-3"
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
              "flex items-center justify-center p-4 transition duration-200 ease-in-out bg-white border-2 border-gray-300 border-dashed rounded shadow cursor-pointer hover:bg-gray-100 col-span-12",
              selectedFoods && selectedFoods.length > 0 ? "bg-gray-100" : ""
            )}
            onClick={() => setOpenModal("comida")}
          >
            {unassignedFoods.length > 0 ? (
              <div className="flex p-4 items-center justify-center gap-6 max-h-[23.5rem] overflow-y-auto">
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

          {/* <button
            className="flex items-center justify-center p-4 transition duration-200 ease-in-out bg-white border-2 border-gray-300 border-dashed rounded shadow cursor-pointer hover:bg-gray-100 col-span-12 md:col-span-6 lg:col-span-4"
            onClick={() => setOpenModal("ejercicio")}
          >
            <span className="flex items-center justify-center gap-2 text-lg">
              <Plus />
              Registrar Ejercicio
            </span>
          </button>
          <button
            className="flex items-center justify-center p-4 transition duration-200 ease-in-out bg-white border-2 border-gray-300 border-dashed rounded shadow cursor-pointer hover:bg-gray-100 col-span-12 md:col-span-12 lg:col-span-4"
            onClick={() => setOpenModal("objetivo")}
          >
            <span className="flex items-center justify-center gap-2 text-lg">
              <Plus />
              Fijar un nuevo objetivo
            </span>
          </button> */}

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

          <div className="flex flex-col gap-2 p-4 bg-white rounded drop-shadow-lg col-span-12">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Comidas de hoy</span>
              <div className="flex items-center">
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
                <Button
                  variant="outline"
                  className="ml-2 cursor-pointer"
                  onClick={() => navigate("/user/food-history")}
                >
                  <List /> Ver Historial
                </Button>
              </div>
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

          {/* <div className="p-4 bg-white rounded drop-shadow-lg col-span-12">
            <span className="text-lg font-bold">Ejercicios de hoy</span>
            {selectedExercises.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No has registrado ejercicios hoy.
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {selectedExercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="flex flex-col items-center p-4 border rounded shadow"
                  >
                    <img
                      src={exercise.imagen}
                      alt={exercise.name}
                      className="object-cover w-24 h-24 mb-2 rounded"
                    />
                    <span className="font-semibold">{exercise.name}</span>
                    <span className="text-xs text-center text-gray-500">
                      {exercise.description}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div> */}

          {/* Sección de metas */}
          {/* <div className="col-span-12 p-4 bg-white rounded drop-shadow-lg">
            <span className="text-lg font-bold">Metas de hoy</span>
            {selectedGoals.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No tienes metas registradas.
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {selectedGoals.map((goal) => (
                  <li
                    key={goal.id}
                    className="flex flex-col items-center p-4 border rounded shadow"
                  >
                    <img
                      src={goal.image}
                      alt={goal.name}
                      className="object-cover w-24 h-24 mb-2 rounded"
                    />
                    <span className="font-semibold">{goal.name}</span>
                    <span className="text-xs text-center text-gray-500">
                      {goal.type} - {goal.time} - {goal.calories} kcal
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div> */}

          <div className="p-8 bg-white rounded drop-shadow-2xl col-span-12 md:col-span-6 lg:col-span-4">
            <span className="text-lg font-bold">
              Consumo semanal de calorías
            </span>
            <div className="flex flex-col items-center justify-center">
              <ChartTotalCalories text={totalWeeklyCalories} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 p-8 bg-white rounded drop-shadow-2xl">
            <span className="text-lg font-bold">Total de calorías</span>
            <ChartCalories calories={dailyCalories!} />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4 p-8 bg-white rounded drop-shadow-2xl">
            <span className="text-lg font-bold">
              Distribución de macronutrientes
            </span>
            <ChartMacronutrients
              carbsPercentage={informationActivityData?.carbsPercentage || 0}
              proteinPercentage={
                informationActivityData?.proteinPercentage || 0
              }
              fatsPercentage={informationActivityData?.fatsPercentage || 0}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default MainDashboard;
