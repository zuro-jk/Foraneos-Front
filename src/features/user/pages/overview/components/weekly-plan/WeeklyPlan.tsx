const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const plan = {
  Lunes: { recipe: "Arroz con Pollo", cost: 5.0 },
  Martes: null,
  Miércoles: { recipe: "Tallarines Rojos", cost: 4.5 },
  Jueves: null,
  Viernes: { recipe: "Lentejas", cost: 4.8 },
  Sábado: null,
  Domingo: null,
};

type DiaSemana = keyof typeof plan;

function obtenerMenu(dia: DiaSemana) {
  return plan[dia];
}

function WeeklyPlan() {
  return (
    <div className="col-span-1 lg:col-span-2 xl:col-span-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        📅 Planificación Semanal
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {days.map((day) => {
          const item = obtenerMenu(day as DiaSemana);

          return (
            <div
              key={day}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-4"
            >
              <h3 className="font-semibold text-md text-gray-700 dark:text-white mb-1">
                {day}
              </h3>

              {item ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.recipe}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Costo: S/ {item.cost.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-sm italic text-gray-400 dark:text-gray-500">
                  Sin receta asignada
                </p>
              )}

              <button className="mt-2 text-sm text-blue-500 hover:underline cursor-pointer">{item ? "Cambiar receta" : "Añadir receta"}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyPlan;
