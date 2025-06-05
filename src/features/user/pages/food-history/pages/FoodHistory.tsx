import { useUserStore } from "@/features/auth/store/userStore";
import { format } from "date-fns";
import { BarChart2, Calendar, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { macroGoals, macroToday } from "../data/mockMeals";
import { useGetMealsByUserAndDate } from "../hooks/useFood";

const FoodHistory = () => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { data: meals } = useGetMealsByUserAndDate(
    Number(user?.id),
    selectedDate
  );

  const dailyTotals = meals?.reduce(
    (totals, meal) => {
      meal.foods.forEach((food) => {
        totals.calories += food.calories;
        totals.protein += food.protein;
        totals.carbs += food.carbs;
        totals.fat += food.fat;
      });
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const handleEditMeal = (mealId: number) => {
    // Lógica para editar la comida
    navigate(`/user/food-history/edit/${mealId}`);
  };

  const handleDeleteMeal = (mealId: number) => {
    // Lógica para eliminar la comida
  };

  const handleAddMeal = () => navigate(`/user/food-history/add`);

  const handleViewWeekly = () => alert("Ver historial semanal");

  return (
    <div className="container mx-auto max-w-4xl p-6">
      {/* Encabezado */}
      <div className="bg-white rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-bold">🍽️ MI ALIMENTACIÓN</span>
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            <span>
              🎯 <b>Meta:</b> {macroGoals.calories} kcal
            </span>
            <span>
              🔥 <b>Hoy:</b> {macroToday.calories} kcal
            </span>
            <span>
              📅 <b>{format(new Date(selectedDate), "dd MMMM yyyy")}</b>
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition cursor-pointer"
            onClick={() => document.getElementById("date-input")?.focus()}
          >
            <Calendar size={18} /> Cambiar fecha
          </button>
          <input
            id="date-input"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="hidden"
          />
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
            onClick={handleAddMeal}
          >
            <Plus size={18} /> Agregar comida
          </button>
        </div>
      </div>

      {/* Progreso diario */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
          <span className="font-semibold text-blue-700">Calorías</span>
          <span className="text-lg font-bold">
            {dailyTotals?.calories} / {macroGoals.calories}
          </span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
          <span className="font-semibold text-green-700">Proteínas</span>
          <span className="text-lg font-bold">
            {dailyTotals?.protein}g / {macroGoals.protein}g
          </span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center">
          <span className="font-semibold text-yellow-700">Carbohidratos</span>
          <span className="text-lg font-bold">
            {dailyTotals?.carbs}g / {macroGoals.carbs}g
          </span>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 flex flex-col items-center">
          <span className="font-semibold text-pink-700">Grasas</span>
          <span className="text-lg font-bold">
            {dailyTotals?.fat}g / {macroGoals.fat}g
          </span>
        </div>
      </div>

      {/* Comidas del día */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meals?.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold flex items-center gap-2">
                <span className="text-2xl">
                  🍳
                  {/* {meal.icon} */}
                </span>
                {meal.name}
              </span>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full hover:bg-blue-100 transition"
                  title="Editar comida"
                  onClick={() => handleEditMeal(meal.id)}
                >
                  <Pencil
                    size={18}
                    className="text-blue-600"
                  />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-red-100 transition"
                  title="Eliminar comida"
                  onClick={() => handleDeleteMeal(meal.id)}
                >
                  <Trash2
                    size={18}
                    className="text-red-600"
                  />
                </button>
              </div>
            </div>
            <ul className="flex flex-col gap-1">
              {meal.foods.length === 0 ? (
                <li className="text-gray-400 italic">
                  Vacío{" "}
                  <button
                    className="ml-2 text-blue-600 underline text-xs"
                    onClick={handleAddMeal}
                  >
                    Agregar
                  </button>
                </li>
              ) : (
                meal.foods.map((food) => (
                  <li
                    key={food.id}
                    className="flex justify-between items-center bg-gray-50 rounded px-3 py-1"
                  >
                    <div className="flex items-center gap-2">
                      {food.imagePath && (
                        <img
                          src={food.imagePath}
                          alt={food.name}
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                      )}
                      <span>{food.name}</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      {food.calories} cal
                    </span>
                  </li>
                ))
              )}
            </ul>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-semibold text-gray-600">
                {/* Total: {getMealTotal(meal)} kcal */}
                Total: {meal.foods.reduce((sum, f) => sum + f.calories, 0)} kcal
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Ver historial semanal */}
      <div className="flex justify-center mt-10">
        <button
          className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-full shadow hover:bg-blue-100 transition font-semibold text-lg"
          onClick={handleViewWeekly}
        >
          <BarChart2 size={22} /> Ver historial semanal
        </button>
      </div>
    </div>
  );
};

export default FoodHistory;
