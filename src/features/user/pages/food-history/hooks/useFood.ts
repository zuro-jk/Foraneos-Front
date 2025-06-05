import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addMealByUserIdWithFoods,
  getMealsByUserAndDate,
} from "../api/foodApi";
import type { MealRequest } from "../dto/request/MealRequest";

export function useGetMealsByUserAndDate(userId: number, date: string) {
  return useQuery({
    queryKey: ["meals", userId, date],
    queryFn: () => getMealsByUserAndDate(userId, date),
    enabled: !!userId && !!date,
  });
}

export function useAddMealByUserIdWithFoods() {
  return useMutation({
    mutationFn: (meal: MealRequest) => addMealByUserIdWithFoods(meal),
  });
}

// export function useFoodHistory(userId: number) {
//   return useQuery({
//     queryKey: ["foodHistory", userId],
//     queryFn: () => getFoodHistory(userId),
//     enabled: !!userId,
//   });
// }

// export function useAddFoodToHistory(userId: number) {
//   return useMutation({
//     mutationFn: (foodItem: Food) => addFoodToHistory(userId, foodItem),
//   });
// }

// export function useDeleteFoodFromHistory(userId: number) {
//   return useMutation({
//     mutationFn: (foodId: number) => deleteFoodFromHistory(userId, foodId),
//   });
// }

// export function useUpdateFoodInHistory(userId: number) {
//   return useMutation({
//     mutationFn: ({ foodId, foodItem }: { foodId: number; foodItem: Food }) =>
//       updateFoodInHistory(userId, foodId, foodItem),
//   });
// }
