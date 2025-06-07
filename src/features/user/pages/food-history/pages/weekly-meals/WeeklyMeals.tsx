import { useGetMealsWeeklyByUser } from "@/features/user/hooks/foods/useFoods";
import { Button } from "@/shared/ui/button";
import { addDays, format, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
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

const mealTypes = ["DESAYUNO", "ALMUERZO", "CENA", "SNACK"] as const;

function getDayName(dateString: string) {
  return format(new Date(dateString), "EEEE", { locale: es }).replace(
    /^\w/,
    (c) => c.toUpperCase()
  );
}

const WeeklyMeals = () => {
  const navigate = useNavigate();

  const initialStartDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(addDays(initialStartDate, 6));

  const { data: mealsWeekly } = useGetMealsWeeklyByUser(startDate, endDate);

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

        {/* <div>Filtro: Categoria [Todas | Alta Proteina | Vegetariana]</div> */}

        <table className="w-full border text-center mt-6">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-100"></th>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="border px-2 py-1 bg-gray-100"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map((mealType) => (
              <tr key={mealType}>
                <td className="border px-2 py-1 font-semibold bg-gray-50">
                  {mealType}
                </td>
                {daysOfWeek.map((day) => {
                  const meal = mealsWeekly?.find(
                    (m) =>
                      getDayName(m.dateTime) === day &&
                      m.name.toUpperCase() === mealType
                  );

                  return (
                    <td
                      key={day}
                      className="border px-2 py-1"
                    >
                      {meal && meal.foods.length > 0 ? (
                        meal.foods.map((food) => (
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
