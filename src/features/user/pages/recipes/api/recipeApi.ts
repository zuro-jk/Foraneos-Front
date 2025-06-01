import api from "@/lib/api";

export const recipesApi = async () => (await api.get("/foods")).data;

export const detailRecipeApi = async (id: number) =>
  (await api.get(`/foods/${id}`)).data;
