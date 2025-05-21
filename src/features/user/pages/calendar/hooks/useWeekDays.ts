// src/features/user/pages/calendar/hooks/useWeekDays.ts
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { useScheduleStore } from "../store/useScheduleStore";

export function useWeekDays() {
  const currentDate = useScheduleStore((s) => s.currentDate);
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  return { weekStart, weekEnd, weekDays };
}
