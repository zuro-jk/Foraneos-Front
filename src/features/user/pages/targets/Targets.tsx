import { Button } from "@/shared/ui/button";
import { Edit2, PlusCircle, Target } from "lucide-react";

// Simulación de progreso
const currentGoal = {
  title: "Bajar de peso",
  type: "Definición / Pérdida de grasa",
  since: "20 Mayo 2025",
  note: "Quiero bajar 5kg antes de agosto.",
  calories: 1800,
  protein: 140,
  carbs: 160,
  fat: 50,
  progress: 40, // %
  progressText: "Has bajado 2kg de 5kg",
};

const goalsHistory = [
  {
    title: "Mantenimiento",
    period: "ene–feb",
    calories: 2000,
    status: "Finalizada",
  },
  {
    title: "Subir masa",
    period: "mar–abr",
    calories: 2500,
    status: "Finalizada",
  },
  {
    title: "Bajar peso",
    period: "mayo–...",
    calories: 1800,
    status: "En curso",
  },
];

const Targets = () => {
  return (
    <div className="container mx-auto max-w-4xl py-8 flex flex-col gap-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between border-b pb-4">
        <span className="text-3xl font-extrabold flex items-center gap-2">
          <Target
            className="text-green-600"
            size={32}
          />
          MIS METAS
        </span>
        <Button className="flex items-center gap-2 text-base font-semibold px-4 py-2">
          <PlusCircle size={20} />
          Nueva meta
        </Button>
      </div>

      {/* Objetivo actual con progreso */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow p-6 flex flex-col gap-4 border">
        <div className="flex items-center gap-4">
          <span className="text-2xl">🔄</span>
          <div>
            <span className="font-bold text-xl text-green-800">
              Objetivo actual:
            </span>{" "}
            <span className="font-semibold text-lg">{currentGoal.title}</span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              En curso
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-gray-700">
          <span>
            🏋️ <b>Tipo de meta:</b> {currentGoal.type}
          </span>
          <span>
            📊 <b>Activa desde:</b> {currentGoal.since}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span>
            📝 <b>Nota personal:</b> “{currentGoal.note}”
          </span>
        </div>
        {/* Progreso visual */}
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-sm text-gray-600">
            {currentGoal.progressText}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${currentGoal.progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            Progreso: <b>{currentGoal.progress}%</b>
          </span>
        </div>
        <div>
          <Button
            variant="outline"
            className="mt-2 flex items-center gap-2"
          >
            <Edit2 size={16} /> Editar Meta
          </Button>
        </div>
      </div>

      {/* Detalle objetivo nutricional */}
      <div>
        <span className="font-bold text-lg block mb-2">
          DETALLE DE OBJETIVO NUTRICIONAL
        </span>
        <div className="grid grid-cols-4 gap-4 bg-white rounded-xl shadow p-4 text-center font-semibold border">
          <div>
            <span className="block text-gray-500">Calorías</span>
            <span className="text-xl">{currentGoal.calories} kcal</span>
          </div>
          <div>
            <span className="block text-gray-500">Proteínas</span>
            <span className="text-xl">{currentGoal.protein}g</span>
          </div>
          <div>
            <span className="block text-gray-500">Carbohidratos</span>
            <span className="text-xl">{currentGoal.carbs}g</span>
          </div>
          <div>
            <span className="block text-gray-500">Grasas</span>
            <span className="text-xl">{currentGoal.fat}g</span>
          </div>
        </div>
      </div>

      {/* Historial de metas */}
      <div>
        <span className="font-bold text-lg block mb-2">HISTORIAL DE METAS</span>
        <div className="grid grid-cols-3 gap-4 bg-white rounded-xl shadow p-4 text-center border">
          {goalsHistory.map((goal, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-1"
            >
              <span className="font-bold">{goal.title}</span>
              <span className="text-xs text-gray-500">{goal.period}</span>
              <span className="text-sm">{goal.calories} kcal</span>
              <span
                className={`text-xs font-semibold rounded-full px-2 py-1 ${
                  goal.status === "En curso"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {goal.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Targets;
