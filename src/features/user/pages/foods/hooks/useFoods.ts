import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFoodFromUser,
  deleteFoodFromUser,
  getCategoriesOfFoods,
  getFoodById,
  getFoods,
  getFoodsFromGeneral,
  getFoodsFromUser,
  getUnitsOfFoods,
  updateFoodFromUser,
} from "../api/foodsUserApi";
import type { FoodPayload } from "../dto/request/foodPayload";

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
