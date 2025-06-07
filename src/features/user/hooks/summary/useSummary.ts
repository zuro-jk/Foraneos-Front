import { useQuery } from "@tanstack/react-query";
import { getSummaryOfUserAuth } from "../../api/foods/foodsUserApi";

export function useGetSummaryByUserAuth() {
  return useQuery({
    queryKey: ["summaryByUserAuth"],
    queryFn: getSummaryOfUserAuth,
  });
}
