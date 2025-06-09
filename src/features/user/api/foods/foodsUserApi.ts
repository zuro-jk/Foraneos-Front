import api from "@/lib/api";
import { endOfWeek, format, startOfWeek } from "date-fns";
import type { FoodPayload } from "../../dto/request/food/foodPayload";
import type { MealRequest } from "../../dto/request/meal/MealRequest";
import type { FoodResponse } from "../../dto/response/food/foodResponse";
import type {
  DailyCaloriesResponse,
  MealResponse,
} from "../../dto/response/meal/MealResponse";
import type { SummaryResponse } from "../../dto/response/summary/SummaryResponse";
import type { FoodCategory, FoodUnit } from "../../types/foods/foodType";

export const getFoods = async (): Promise<FoodResponse[]> =>
  (await api.get("/foods")).data;

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

export const getMealsByUserAndDate = async (
  userId: number,
  date: string
): Promise<MealResponse[]> => {
  let dateObj: Date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-").map(Number);
    dateObj = new Date(year, month - 1, day, 0, 0, 0); // Local time
  } else {
    dateObj = new Date(date);
  }
  const formattedDate = format(dateObj, "yyyy-MM-dd'T'HH:mm:ss");
  return (
    await api.get(`/meals/user/${userId}/date`, {
      params: { date: formattedDate },
    })
  ).data;
};

export const getMealById = async (mealId: number): Promise<MealResponse> =>
  (await api.get(`/meals/${mealId}`)).data;

export const addMealByUserIdWithFoods = async (meal: MealRequest) =>
  await api.post(`/meals`, meal);

export const updateMealById = async (mealId: number, meal: MealRequest) =>
  await api.put(`/meals/${mealId}`, meal);

export const deleteMealById = async (mealId: number) =>
  await api.delete(`/meals/${mealId}`);

export const getMealsWeeklyByUser = async (
  startDate?: Date,
  endDate?: Date
): Promise<MealResponse[]> => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const start = startDate ?? weekStart;
  const end = endDate ?? weekEnd;

  const formattedStart = format(start, "yyyy-MM-dd'T'00:00:00");
  const formattedEnd = format(end, "yyyy-MM-dd'T'23:59:59");

  return (
    await api.get(`/meals/user/weekly`, {
      params: { startDate: formattedStart, endDate: formattedEnd },
    })
  ).data;
};

export const getDailyCaloriesByUserAuthenticated = async (
  startDate?: Date,
  endDate?: Date
): Promise<DailyCaloriesResponse[]> => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const start = startDate ?? weekStart;
  const end = endDate ?? weekEnd;

  const formattedStart = format(start, "yyyy-MM-dd'T'00:00:00");
  const formattedEnd = format(end, "yyyy-MM-dd'T'23:59:59");

  return (
    await api.get(`/meals/user/weekly/daily-calories`, {
      params: { startDate: formattedStart, endDate: formattedEnd },
    })
  ).data;
};

export const getSummaryOfUserAuth = async (): Promise<SummaryResponse> =>
  (await api.get(`/summary/user`)).data;

export const getSummaryOfUserAuthByPeriod = async (
  startDate?: Date,
  endDate?: Date
): Promise<SummaryResponse> => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const start = startDate ?? weekStart;
  const end = endDate ?? weekEnd;

  const formattedStart = format(start, "yyyy-MM-dd'T'00:00:00");
  const formattedEnd = format(end, "yyyy-MM-dd'T'23:59:59");

  return (
    await api.get(`/summary/user/period`, {
      params: { startDate: formattedStart, endDate: formattedEnd },
    })
  ).data;
};
