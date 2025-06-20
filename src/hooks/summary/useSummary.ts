import { useQuery } from "@tanstack/react-query";
import {
  getSummaryOfUserAuth,
  getSummaryOfUserAuthByPeriod,
} from "../../api/foods/foodsUserApi";

export function useGetSummaryByUserAuth() {
  return useQuery({
    queryKey: ["summaryByUserAuth"],
    queryFn: getSummaryOfUserAuth,
  });
}

export function useGetSummaryByUserAuthByPeriod(
  startDate?: Date,
  endDate?: Date
) {
  return useQuery({
    queryKey: ["summaryByUserAuthByPeriod"],
    queryFn: () => getSummaryOfUserAuthByPeriod(startDate, endDate),
  });
}
