import api from "@/lib/api";
import type { FoodPayload } from "../dto/request/foodPayload";
import type { FoodResponse } from "../dto/response/foodResponse";
import type { FoodCategory, FoodUnit } from "../types/foodType";

export const getFoods = async () => await api.get("/foods");

export const getFoodsFromUser = async (
  search?: string,
  categoryIds?: number[]
): Promise<FoodResponse[]> =>
  (
    await api.get("/foods/me", {
      params: {
        search: search || undefined,
        categoryIds:
          categoryIds && categoryIds.length > 0 ? categoryIds : undefined,
      },
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        if (params.search) searchParams.append("search", params.search);
        if (params.categoryIds) {
          params.categoryIds.forEach((id: number) =>
            searchParams.append("categoryIds", id.toString())
          );
        }
        return searchParams.toString();
      },
    })
  ).data;

export const getFoodsFromGeneral = async (
  search = ""
): Promise<FoodResponse[]> =>
  (await api.get("/foods/general", { params: { search } })).data;

export const getFoodById = async (foodId: number): Promise<FoodResponse> =>
  (await api.get(`/foods/${foodId}`)).data;

export const addFoodFromUser = async (data: FoodPayload) =>
  (await api.post("/foods", data)).data;

export const updateFoodFromUser = async (foodId: number, data: FoodPayload) =>
  await api.put(`/foods/${foodId}`, data);

export const deleteFoodFromUser = async (foodId: number) =>
  await api.delete(`/foods/${foodId}`);

export const getCategoriesOfFoods = async (): Promise<FoodCategory[]> =>
  (await api.get("/food-categories")).data;

export const getUnitsOfFoods = async (): Promise<FoodUnit[]> =>
  (await api.get("/units")).data;
