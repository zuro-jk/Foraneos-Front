import { Button } from "@/shared/ui/button";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const initialTargets = [
  {
    id: 1,
    title: "Bajar de peso",
    description:
      "Perder 5kg en 3 meses siguiendo un plan alimenticio saludable.",
    progress: 40,
  },
  {
    id: 2,
    title: "Comer más verduras",
    description: "Incluir al menos 2 porciones de verduras en cada comida.",
    progress: 70,
  },
  {
    id: 3,
    title: "Beber más agua",
    description: "Tomar al menos 2 litros de agua al día.",
    progress: 90,
  },
];

const Targets = () => {
  const [targets, setTargets] = useState(initialTargets);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">Mis Objetivos</span>
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          Nuevo objetivo
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {targets.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No tienes objetivos registrados.
          </div>
        ) : (
          targets.map((target) => (
            <div
              key={target.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 hover:shadow-lg transition"
            >
              <span className="font-semibold text-lg">{target.title}</span>
              <span className="text-gray-500 text-sm">
                {target.description}
              </span>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${target.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  Progreso: {target.progress}%
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="text-xs px-3 py-1"
                  >
                    <Edit2
                      size={14}
                      className="mr-1"
                    />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    className="text-xs px-3 py-1"
                  >
                    <Trash2
                      size={14}
                      className="mr-1"
                    />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Targets;
