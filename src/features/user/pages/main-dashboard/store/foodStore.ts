import { create } from "zustand";
import type { FoodResponse } from "../../foods/dto/response/foodResponse";

interface FoodState {
  selectedFoods: FoodResponse[];
  setSelectedFoods: (foods: FoodResponse[]) => void;
  addFood: (food: FoodResponse) => void;
  removeFood: (food: FoodResponse) => void;
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
      selectedFoods: state.selectedFoods.filter((item) => item.id !== food.id),
    })),
  clearSelectedFoods: () => set({ selectedFoods: [] }),
}));
