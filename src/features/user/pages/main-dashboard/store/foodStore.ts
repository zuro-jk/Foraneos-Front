import { create } from "zustand";
import type { Food } from "../types/food";

interface FoodState {
  selectedFoods: Food[];
  setSelectedFoods: (foods: Food[]) => void;
  addFood: (food: Food) => void;
  removeFood: (food: Food) => void;
  clearSelectedFoods: () => void;
}

export const useFoodStore = create<FoodState>((set) => ({
  selectedFoods: [],
  setSelectedFoods: (foods) => set({ selectedFoods: foods }),
  addFood: (food) =>
    set((state) => ({
      selectedFoods: [...state.selectedFoods, food],
    })),
  removeFood: (food) =>
    set((state) => ({
      selectedFoods: state.selectedFoods.filter(
        (item) => item.id !== food.id
      ),
    })),
  clearSelectedFoods: () => set({ selectedFoods: [] }),
}));
