import api from "@/lib/api";
import type { Food } from "../types/food";

export const getFoodHistory = async (userId: number) => {
  try {
    const response = await api.get(`/foods/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food history:", error);
    throw error;
  }
};

export const addFoodToHistory = async (userId: number, foodItem: Food) => {
  try {
    const response = await api.post(`/foods/${userId}`, foodItem);
    return response.data;
  } catch (error) {
    console.error("Error adding food to history:", error);
    throw error;
  }
};

export const deleteFoodFromHistory = async (userId: number, foodId: number) => {
  try {
    const response = await api.delete(`/foods/${userId}/${foodId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting food from history:", error);
    throw error;
  }
};

export const updateFoodInHistory = async (
  userId: number,
  foodId: number,
  foodItem: Food
) => {
  try {
    const response = await api.put(`/foods/${userId}/${foodId}`, foodItem);
    return response.data;
  } catch (error) {
    console.error("Error updating food in history:", error);
    throw error;
  }
};
