import type { CalendarEvent } from "../store/useScheduleStore";

export function getPlacedEvents(events: CalendarEvent[]) {
  // Ordena por hora de inicio
  const sorted = [...events].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );
  const placement: Record<number, { index: number; count: number }> = {};

  let groups: CalendarEvent[][] = [];
  let currentGroup: CalendarEvent[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const event = sorted[i];
    if (
      currentGroup.length === 0 ||
      event.startDate.getTime() <
        Math.max(...currentGroup.map((e) => e.endDate.getTime()))
    ) {
      currentGroup.push(event);
    } else {
      groups.push(currentGroup);
      currentGroup = [event];
    }
  }
  if (currentGroup.length > 0) groups.push(currentGroup);

  for (const group of groups) {
    group.forEach((event, idx) => {
      placement[event.id] = { index: idx, count: group.length };
    });
  }
  return placement;
}