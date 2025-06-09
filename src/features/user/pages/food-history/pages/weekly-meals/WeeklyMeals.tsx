import { useGetMealsWeeklyByUser } from "@/features/user/hooks/foods/useFoods";
import { Button } from "@/shared/ui/button";
import { addDays, startOfWeek } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

function normalizeMealType(name: string) {
  const n = name.trim().toLowerCase();
  if (n === "comida" || n === "almuerzo") return "Almuerzo";
  if (n === "desayuno") return "Desayuno";
  if (n === "cena") return "Cena";
  if (n === "snack") return "Snack";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

const WeeklyMeals = () => {
  const navigate = useNavigate();

  const initialStartDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(addDays(initialStartDate, 6));

  const { data: mealsWeekly } = useGetMealsWeeklyByUser(startDate, endDate);
  const mealTypes = Array.from(
    new Set((mealsWeekly ?? []).map((meal) => normalizeMealType(meal.name)))
  );

  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="p-4">
      <div className="container mx-auto bg-white p-6 rounded shadow">
        <span
          className="flex items-center gap-2 mb-4 cursor-pointer text-sm text-gray-500 hover:text-gray-800 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver
        </span>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Comidas Semanales
        </h1>
        <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
          >
            <ArrowLeft /> Semana anterior
          </Button>
          <div className="flex gap-2">
            <input
              type="date"
              className="cursor-pointer border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
              value={startDate.toISOString().split("T")[0]}
              onChange={(e) => {
                const date = new Date(e.target.value);
                setStartDate(date);
                setEndDate(addDays(date, 6));
              }}
            />
            <input
              type="date"
              className="cursor-pointer border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
              value={endDate.toISOString().split("T")[0]}
              onChange={(e) => {
                const date = new Date(e.target.value);
                setEndDate(date);
                setStartDate(addDays(date, -6));
              }}
            />
          </div>
          <Button
            variant="outline"
            className="cursor-pointer"
          >
            <ArrowRight /> Semana siguiente
          </Button>
        </div>

        <table className="w-full border text-center mt-6">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-100"></th>
              {weekDates.map((date) => (
                <th
                  key={date.toISOString()}
                  className="border px-2 py-1 bg-gray-100"
                >
                  {daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1]}
                  <br />
                  {date.getDate()}/{date.getMonth() + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes?.map((mealType) => (
              <tr key={mealType}>
                <td className="border px-2 py-1 font-semibold bg-gray-50">
                  {mealType}
                </td>
                {weekDates.map((day) => {
                  const mealsForCell =
                    mealsWeekly?.filter(
                      (meal) =>
                        normalizeMealType(meal.name) === mealType &&
                        new Date(meal.dateTime).getFullYear() ===
                          day.getFullYear() &&
                        new Date(meal.dateTime).getMonth() === day.getMonth() &&
                        new Date(meal.dateTime).getDate() === day.getDate()
                    ) ?? [];

                  const foodsForCell = mealsForCell.flatMap(
                    (meal) => meal.foods
                  );

                  return (
                    <td
                      key={day.toString()}
                      className="border px-2 py-1"
                    >
                      {foodsForCell.length > 0 ? (
                        foodsForCell.map((food) => (
                          <div
                            key={food.id}
                            className="flex items-center gap-1 justify-center"
                          >
                            {food.imagePath && (
                              <img
                                src={food.imagePath}
                                alt={food.name}
                                className="w-5 h-5 inline"
                              />
                            )}
                            <span className="text-xs">{food.name}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyMeals;
