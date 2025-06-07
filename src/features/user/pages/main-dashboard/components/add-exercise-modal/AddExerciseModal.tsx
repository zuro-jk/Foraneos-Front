import { cn } from "@/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { Grid2x2, List } from "lucide-react";
import { useState } from "react";
import { useExerciseStore } from "../../../../store/overview/exerciseStore";

interface AddExerciseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ejercicios = [
  {
    id: 1,
    imagen: "/images/exercises/genre/man/exercise-chest-pull.gif",
    name: "Jalon al pecho",
    description:
      "Un ejercicio de fuerza que trabaja los músculos de la espalda y los brazos.",
  },
  {
    id: 2,
    imagen: "/images/exercises/genre/man/exercise-lat-pull-down.jpg",
    name: "Jalon al pecho con agarre amplio",
    description:
      "Un ejercicio de fuerza que trabaja los músculos de la espalda y los brazos.",
  },
  {
    id: 3,
    imagen: "/images/exercises/genre/man/exercise-with-dumbbells.jpg",
    name: "Ejercicio con mancuernas",
    description:
      "Un ejercicio de fuerza que trabaja los músculos de la espalda y los brazos.",
  },
  {
    id: 4,
    imagen: "/images/exercises/genre/man/armless-prayer-stretch-male.webp",
    name: "Estiramiento de oración sin brazos",
    description:
      "Un ejercicio de fuerza que trabaja los músculos de la espalda y los brazos.",
  },
  {
    id: 5,
    imagen: "/images/exercises/genre/man/lying-bicycle-crunch.webp",
    name: "Curl de bíceps",
    description:
      "Un ejercicio de fuerza que trabaja los músculos de los brazos.",
  },
];

const AddExerciseModal = ({ open, onOpenChange }: AddExerciseModalProps) => {
  const { selectedExercises, addExercise, removeExercise } = useExerciseStore();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState<string>("");

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const selectedExercise = ejercicios.find((exercise) => exercise.id === id);
    if (selectedExercise) {
      if (checked) {
        addExercise(selectedExercise);
      } else {
        removeExercise(selectedExercise);
      }
    }
  };

  const filteredExercises = ejercicios.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase()) ||
      exercise.description.toLowerCase().includes(search.toLowerCase())
  );

  const isSelected = (id: number) =>
    selectedExercises.some((exercise) => exercise.id === id);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir Ejercicio</DialogTitle>
          <DialogDescription>
            Selecciona el ejercicio que deseas añadir a tu rutina.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(val) => val && setViewMode(val as "grid" | "list")}
            size="lg"
            defaultValue="grid"
          >
            <ToggleGroupItem
              value="grid"
              aria-label="Vista de grilla"
              className="cursor-pointer data-[state=on]:bg-zinc-900/20 data-[state=on]:border-gray-700 bg-zinc-200 border"
            >
              <Grid2x2 />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="list"
              aria-label="Vista de lista"
              className="cursor-pointer data-[state=on]:bg-zinc-900/20 data-[state=on]:border-gray-700 bg-zinc-200 border"
            >
              <List />
            </ToggleGroupItem>
          </ToggleGroup>
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            className="p-2 border rounded"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {viewMode === "grid" ? (
          <>
            <div className="grid grid-cols-2 gap-4 mt-4 max-h-[400px] overflow-y-auto">
              {/* Aquí irían los ejercicios en vista de grilla */}
              {filteredExercises.map((ejercicio) => (
                <div
                  key={ejercicio.id}
                  className={cn(
                    "relative p-2 border rounded shadow-xl cursor-pointer flex flex-col items-center",
                    isSelected(ejercicio.id) ? "bg-gray-200" : "bg-white"
                  )}
                  onClick={() =>
                    handleCheckboxChange(
                      ejercicio.id,
                      !isSelected(ejercicio.id)
                    )
                  }
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      handleCheckboxChange(
                        ejercicio.id,
                        !isSelected(ejercicio.id)
                      );
                    }
                  }}
                >
                  <img
                    src={ejercicio.imagen}
                    alt={ejercicio.name}
                    className="w-full h-48 rounded"
                  />
                  <span className="block mt-2 text-lg font-bold text-center">
                    {ejercicio.name}
                  </span>
                  <span className="block text-xs text-center text-gray-600">
                    {ejercicio.description}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          viewMode === "list" && (
            <>
              <div className="flex flex-col mt-4 max-h-[400px] overflow-y-auto">
                {filteredExercises.map((ejercicio) => (
                  <div
                    key={ejercicio.id}
                    className={cn(
                      "flex items-center p-4 mb-2 border rounded cursor-pointer",
                      isSelected(ejercicio.id) ? "bg-gray-200" : "bg-white"
                    )}
                    onClick={() =>
                      handleCheckboxChange(
                        ejercicio.id,
                        !isSelected(ejercicio.id)
                      )
                    }
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        handleCheckboxChange(
                          ejercicio.id,
                          !isSelected(ejercicio.id)
                        );
                      }
                    }}
                  >
                    <Checkbox
                      className="mr-4"
                      checked={isSelected(ejercicio.id)}
                      tabIndex={-1}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(ejercicio.id, !!checked)
                      }
                    />
                    <img
                      src={ejercicio.imagen}
                      alt={ejercicio.name}
                      className="w-24 h-24 mr-4 rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">
                        {ejercicio.name}
                      </span>
                      <span>{ejercicio.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseModal;
