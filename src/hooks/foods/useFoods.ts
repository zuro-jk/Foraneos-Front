import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFoodFromUser,
  addMealByUserIdWithFoods,
  deleteFoodFromUser,
  deleteMealById,
  getCategoriesOfFoods,
  getDailyCaloriesByUserAuthenticated,
  getFoodById,
  getFoods,
  getFoodsFromGeneral,
  getFoodsFromUser,
  getMealById,
  getMealsByUserAndDate,
  getMealsWeeklyByUser,
  getUnitsOfFoods,
  updateFoodFromUser,
  updateMealById,
} from "../../api/foods/foodsUserApi";
import type { FoodPayload } from "../../dto/request/food/foodPayload";
import type { MealRequest } from "../../dto/request/meal/MealRequest";

export function useGetFoods() {
  return useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });
}

export function useGetFoodsFromUser(search?: string, categories?: number[]) {
  return useQuery({
    queryKey: ["foodsFromUser", search, categories],
    queryFn: () => getFoodsFromUser(search, categories),
    placeholderData: (prev) => prev,
  });
}

export function useGetFoodsFromGeneral(search: string) {
  return useQuery({
    queryKey: ["foodsFromGeneral", search],
    queryFn: () => getFoodsFromGeneral(search),
  });
}

export function useGetFoodById(foodId: number) {
  return useQuery({
    queryKey: ["food", foodId],
    queryFn: () => getFoodById(foodId),
    enabled: !!foodId,
  });
}

export function useAddFoodFromUser() {
  return useMutation({
    mutationFn: (data: FoodPayload) => addFoodFromUser(data),
  });
}

export function useUpdateFoodFromUser() {
  return useMutation({
    mutationFn: ({ foodId, data }: { foodId: number; data: FoodPayload }) =>
      updateFoodFromUser(foodId, data),
  });
}

export function useDeleteFoodFromUser() {
  return useMutation({
    mutationFn: (foodId: number) => deleteFoodFromUser(foodId),
  });
}

export function useGetCategoriesOfFoods() {
  return useQuery({
    queryKey: ["foodCategories"],
    queryFn: getCategoriesOfFoods,
  });
}

export function useGetUnitsOfFoods() {
  return useQuery({
    queryKey: ["units"],
    queryFn: getUnitsOfFoods,
  });
}

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

export function useUpdateMealById() {
  return useMutation({
    mutationFn: ({ mealId, data }: { mealId: number; data: MealRequest }) =>
      updateMealById(mealId, data),
  });
}

export function useGetMealById(mealId: number) {
  return useQuery({
    queryKey: ["meal", mealId],
    queryFn: () => getMealById(mealId),
    enabled: !!mealId,
  });
}

export function useDeleteMealById() {
  return useMutation({
    mutationFn: (mealId: number) => deleteMealById(mealId),
  });
}

export function useGetMealsWeeklyByUser(startDate?: Date, endDate?: Date) {
  return useQuery({
    queryKey: ["mealsWeekly", startDate, endDate],
    queryFn: () => getMealsWeeklyByUser(startDate, endDate),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}

export function useGetDailyCaloriesByUserAuthenticated(
  startDate?: Date,
  endDate?: Date
) {
  return useQuery({
    queryKey: ["dailyCalories"],
    queryFn: () => getDailyCaloriesByUserAuthenticated(startDate, endDate),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
