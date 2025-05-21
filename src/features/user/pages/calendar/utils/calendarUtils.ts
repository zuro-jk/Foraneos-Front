import type { CalendarEvent } from "../store/useScheduleStore";

export type Placed = { index: number; count: number };

export function getPlacedEvents(
  dayEvents: CalendarEvent[]
): Record<string, Placed> {
  const placed: Record<string, Placed> = {};
  dayEvents.forEach((event) => {
    const overlapping = dayEvents.filter(
      (ev) =>
        Math.max(ev.hour, event.hour) <
        Math.min(
          ev.hour + (ev.duration || 1),
          event.hour + (event.duration || 1)
        )
    );
    overlapping.sort((a, b) => a.hour - b.hour || a.id.localeCompare(b.id));
    const index = overlapping.findIndex((ev) => ev.id === event.id);
    placed[event.id] = { index, count: overlapping.length };
  });
  return placed;
}
