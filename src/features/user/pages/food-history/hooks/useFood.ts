import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFoodToHistory,
  deleteFoodFromHistory,
  getFoodHistory,
  updateFoodInHistory,
} from "../api/foodApi";
import type { Food } from "../types/food";

export function useFoodHistory(userId: number) {
  return useQuery({
    queryKey: ["foodHistory", userId],
    queryFn: () => getFoodHistory(userId),
    enabled: !!userId,
  });
}

export function useAddFoodToHistory(userId: number) {
  return useMutation({
    mutationFn: (foodItem: Food) => addFoodToHistory(userId, foodItem),
  });
}

export function useDeleteFoodFromHistory(userId: number) {
  return useMutation({
    mutationFn: (foodId: number) => deleteFoodFromHistory(userId, foodId),
  });
}

export function useUpdateFoodInHistory(userId: number) {
  return useMutation({
    mutationFn: ({ foodId, foodItem }: { foodId: number; foodItem: Food }) =>
      updateFoodInHistory(userId, foodId, foodItem),
  });
}
