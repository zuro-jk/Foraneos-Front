import { format } from "date-fns";
import { BarChart2, Calendar, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const mockMeals = [
  {
    id: 1,
    title: "Desayuno",
    icon: "🍳",
    foods: [
      {
        id: 1,
        name: "Huevos",
        calories: 120,
        image:
          "https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2022/07/22/huevos.jpeg", // ejemplo
      },
      {
        id: 2,
        name: "Pan integral",
        calories: 80,
        image:
          "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/f1ec1b78-4db1-45ac-9189-40619b7fad74/Derivates/2c238c6b-e380-486e-b9dc-39e41695a5ba.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Almuerzo",
    icon: "🍗",
    foods: [
      {
        id: 3,
        name: "Pollo a la plancha",
        calories: 200,
        image:
          "https://www.paulinacocina.net/wp-content/uploads/2023/06/pollo-a-la-plancha-receta.jpg",
      },
      {
        id: 4,
        name: "Arroz",
        calories: 150,
        image:
          "https://recetas.encolombia.com/wp-content/uploads/2021/02/Arroz-blanco-receta.webp",
      },
      {
        id: 5,
        name: "Ensalada",
        calories: 60,
        image:
          "https://imag.bonviveur.com/ensalada-de-lechuga-y-tomate-foto-cerca.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Merienda",
    icon: "☕",
    foods: [
      {
        id: 6,
        name: "Batido",
        calories: 150,
        image:
          "https://s2.abcstatics.com/media/bienestar/2020/07/04/batidos-saludables-kdhH--1248x698@abc.jpeg",
      },
    ],
  },
  {
    id: 4,
    title: "Cena",
    icon: "🍽️",
    foods: [],
  },
];

const macroGoals = { calories: 2000, protein: 120, carbs: 250, fat: 70 };
const macroToday = { calories: 1320, protein: 70, carbs: 180, fat: 40 };

const FoodHistory = () => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [meals, setMeals] = useState(mockMeals);
  const navigate = useNavigate();

  // Helpers
  const getMealTotal = (meal: (typeof mockMeals)[0]) =>
    meal.foods.reduce((sum, f) => sum + f.calories, 0);

  // Handlers de ejemplo
  const handleEditMeal = (mealId: number) => navigate(`/user/food-history/add/${mealId}`);
  const handleDeleteMeal = (mealId: number) =>
    setMeals(meals.filter((m) => m.id !== mealId));
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
            {macroToday.calories} / {macroGoals.calories}
          </span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
          <span className="font-semibold text-green-700">Proteínas</span>
          <span className="text-lg font-bold">
            {macroToday.protein}g / {macroGoals.protein}g
          </span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center">
          <span className="font-semibold text-yellow-700">Carbohidratos</span>
          <span className="text-lg font-bold">
            {macroToday.carbs}g / {macroGoals.carbs}g
          </span>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 flex flex-col items-center">
          <span className="font-semibold text-pink-700">Grasas</span>
          <span className="text-lg font-bold">
            {macroToday.fat}g / {macroGoals.fat}g
          </span>
        </div>
      </div>

      {/* Comidas del día */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold flex items-center gap-2">
                <span className="text-2xl">{meal.icon}</span>
                {meal.title}
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
                      {food.image && (
                        <img
                          src={food.image}
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
                Total: {getMealTotal(meal)} kcal
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
