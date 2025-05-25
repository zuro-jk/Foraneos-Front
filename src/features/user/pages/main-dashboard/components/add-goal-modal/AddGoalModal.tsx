import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { CalculatorIcon, Grid2x2, List, Timer } from "lucide-react";
import { useState, useEffect } from 'react';
import { useGoalStore } from "../../store/goalStore";

const targetsData = [
  {
    id: 1,
    name: "Quemar Grasa",
    image: "/images/targets/target-cardio.avif",
    type: "Cardio",
    time: "30 min",
    calories: 300,
  },
  {
    id: 2,
    name: "Aumentar Masa Muscular",
    image: "/images/targets/target-increase-muscle-mass.jpg",
    type: "Fuerza",
    time: "45 min",
    calories: 500,
  },
  {
    id: 3,
    name: "Mejorar Resistencia",
    image: "/images/targets/target-improve-endurance.jpeg",
    type: "Cardio",
    time: "60 min",
    calories: 400,
  },
  {
    id: 4,
    name: "Aumentar Flexibilidad",
    image: "/images/targets/target-increase-flexibility.jpeg",
    type: "Estiramiento",
    time: "20 min",
    calories: 200,
  },
];

interface AddGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddGoalModal = ({ open, onOpenChange }: AddGoalModalProps) => {
  const { selectedGoals, setSelectedGoals } = useGoalStore();

  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedIds(selectedGoals.map((goal) => goal.id));
    }
  }, [open, selectedGoals]);

  const filteredTargets = targetsData.filter(
    (target) =>
      target.name.toLowerCase().includes(search.toLowerCase()) ||
      target.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      let newSelected;
      if (prev.includes(id)) {
        newSelected = prev.filter((sid) => sid !== id);
      } else {
        newSelected = [...prev, id];
      }
      // Actualiza el store cada vez que cambia la selección
      const selectedTargets = targetsData.filter((target) =>
        newSelected.includes(target.id)
      );
      setSelectedGoals(selectedTargets);
      return newSelected;
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-2xl font-bold">Agregar Objetivo</span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-sm text-gray-500">
              Selecciona un objetivo para tu entrenamiento.
            </span>
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
          <div className="mb-2">
            <input
              type="text"
              placeholder="Buscar comida..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {viewMode === "grid" && (
          <div className="grid grid-cols-2 gap-4">
            {filteredTargets.map((target) => (
              <div
                key={target.id}
                className={cn(
                  "flex flex-col gap-4 cursor-pointer border rounded transition",
                  selectedIds.includes(target.id)
                    ? "bg-gray-300/80"
                    : "border-transparent"
                )}
                onClick={() => handleSelect(target.id)}
              >
                <div className="shadow-md">
                  <img
                    src={target.image}
                    alt="target"
                    className="w-full h-32 rounded"
                  />
                  <div className="flex flex-col p-2">
                    <span className="font-bold">{target.name}</span>
                    <span className="text-sm text-gray-500">{target.type}</span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>
                        <Timer className="w-4 h-4" />
                      </span>
                      <span>{target.time}</span>
                    </div>
                    <div className="flex gap-2 text-sm text-gray-500">
                      <CalculatorIcon className="w-4 h-4" /> {target.calories}{" "}
                      kcal
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {viewMode === "list" && (
          <div className="flex flex-col gap-4">
            {filteredTargets.map((target) => (
              <div
                key={target.id}
                className={cn(
                  "flex items-center gap-2 shadow-md cursor-pointer border rounded transition",
                  selectedIds.includes(target.id)
                    ? "bg-gray-300/80"
                    : "border-transparent"
                )}
                onClick={() => handleSelect(target.id)}
              >
                <img
                  src={target.image}
                  alt="target"
                  className="w-32 h-24 rounded"
                />
                <div className="flex flex-col">
                  <span className="font-bold">{target.name}</span>
                  <span className="text-sm text-gray-500">{target.type}</span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>
                      <Timer className="w-4 h-4" />
                    </span>
                    <span>{target.time}</span>
                  </div>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <CalculatorIcon className="w-4 h-4" /> {target.calories}{" "}
                    kcal
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalModal;
