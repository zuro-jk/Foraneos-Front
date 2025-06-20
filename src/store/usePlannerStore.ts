import type { PlannedRecipe } from "@/types/planned-recipe/PlannedRecipe.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface PlannerState {
  planner: Record<string, PlannedRecipe[]>;
  addRecipeToDay: (day: string, recipe: PlannedRecipe) => void;
  removeRecipeFromDay: (day: string, recipeId: number) => void;
  clearPlanner: () => void;
}

const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      planner: {
        Lunes: [],
        Martes: [],
        Miércoles: [],
        Jueves: [],
        Viernes: [],
        Sábado: [],
        Domingo: [],
      },
      addRecipeToDay: (day, recipe) =>
        set((state) => ({
          planner: {
            ...state.planner,
            [day]: [...state.planner[day], recipe],
          },
        })),
      removeRecipeFromDay: (day, recipeId) =>
        set((state) => ({
          planner: {
            ...state.planner,
            [day]: state.planner[day].filter((r) => r.id !== recipeId),
          },
        })),
      clearPlanner: () =>
        set(() => ({
          planner: {
            Lunes: [],
            Martes: [],
            Miércoles: [],
            Jueves: [],
            Viernes: [],
            Sábado: [],
            Domingo: [],
          },
        })),
    }),
    {
      name: "planner-storage",
    }
  )
);

export default usePlannerStore;
