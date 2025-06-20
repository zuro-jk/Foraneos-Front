import usePlannerStore from "@/store/usePlannerStore";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import AddRecipeModal from "./AddRecipeModal";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

function WeeklyCalendar() {
  const planner = usePlannerStore((state) => state.planner);
  const removeRecipe = usePlannerStore((state) => state.removeRecipeFromDay);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const openModal = (day: string) => {
    setSelectedDay(day);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {day}
              </h2>
              <button
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={() => openModal(day)}
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>

            {planner[day]?.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Sin recetas planificadas.
              </p>
            ) : (
              <ul className="text-sm space-y-1">
                {planner[day].map((recipe) => (
                  <li
                    key={recipe.id}
                    className="bg-zinc-100 dark:bg-zinc-700 px-3 py-2 rounded-lg flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-800 dark:text-white">
                      🍽 {recipe.title}
                    </span>
                    <button
                      onClick={() => removeRecipe(day, recipe.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {modalOpen && selectedDay && (
        <AddRecipeModal
          day={selectedDay}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default WeeklyCalendar;
