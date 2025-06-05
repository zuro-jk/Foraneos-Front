import api from "@/lib/api";
import { format } from "date-fns";
import type { MealRequest } from "../dto/request/MealRequest";
import type { MealResponse } from "../dto/response/MealResponse";

export const getMealsByUserAndDate = async (
  userId: number,
  date: string
): Promise<MealResponse[]> => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const formattedDate = format(dateObj, "yyyy-MM-dd'T'HH:mm:ss");
  return (
    await api.get(`/meals/user/${userId}/date`, {
      params: { date: formattedDate },
    })
  ).data;
};

export const addMealByUserIdWithFoods = async (meal: MealRequest) =>
  await api.post(`/meals`, meal);

// export const getFoodHistory = async (userId: number) => {
//   try {
//     const response = await api.get(`/foods/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching food history:", error);
//     throw error;
//   }
// };

// export const addFoodToHistory = async (userId: number, foodItem: Food) => {
//   try {
//     const response = await api.post(`/foods/${userId}`, foodItem);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding food to history:", error);
//     throw error;
//   }
// };

// export const deleteFoodFromHistory = async (userId: number, foodId: number) => {
//   try {
//     const response = await api.delete(`/foods/${userId}/${foodId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting food from history:", error);
//     throw error;
//   }
// };

// export const updateFoodInHistory = async (
//   userId: number,
//   foodId: number,
//   foodItem: Food
// ) => {
//   try {
//     const response = await api.put(`/foods/${userId}/${foodId}`, foodItem);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating food in history:", error);
//     throw error;
//   }
// };
