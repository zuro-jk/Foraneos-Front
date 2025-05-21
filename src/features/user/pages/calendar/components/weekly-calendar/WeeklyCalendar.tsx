import { ScrollArea } from "@/shared/ui/scroll-area";
import { DndContext, DragOverlay, type DragEndEvent } from "@dnd-kit/core";
import type { CalendarEvent } from "../../store/useScheduleStore";
import DraggableEvent from "../draggable-event/DraggableEvent";
import ScheduleDayColumn from "../schedule-day-column/ScheduleDayColumn";
import ScheduleDaysHeader from "../schedule-days-header/ScheduleDaysHeader";
import ScheduleHoursColumn from "../schedule-header-column/ScheduleHoursColumns";

type WeeklyCalendarProps = {
  weekDays: Date[];
  timeSlots: {
    hour: number;
    minute: number;
  }[];
  items: CalendarEvent[];
  activeEvent: CalendarEvent | null;
  setActiveEvent: (event: CalendarEvent | null) => void;
  handleDragEnd: (event: DragEndEvent) => void;
};

const WeeklyCalendar = ({
  weekDays,
  timeSlots,
  items,
  activeEvent,
  setActiveEvent,
  handleDragEnd,
}: WeeklyCalendarProps) => {
  console.log(timeSlots);
  return (
    <>
      {/* Encabezado */}
      <ScheduleDaysHeader weekDays={weekDays} />

      {/* Cuadriculas */}
      <ScrollArea className="h-[900px] w-full mb-8">
        <DndContext
          onDragStart={(event) => {
            const item = items.find((i) => i.id === event.active.id);
            if (item) setActiveEvent(item);
          }}
          onDragEnd={(event) => {
            setActiveEvent(null);
            handleDragEnd(event);
          }}
          onDragCancel={() => setActiveEvent(null)}
        >
          <div className="grid grid-cols-[70px_repeat(7,1fr)] h-full">
            <ScheduleHoursColumn timeSlots={timeSlots} />
            {weekDays.map((date, dayIdx) => {
              const dayEvents = items
                .filter(
                  (i) =>
                    i.startDate.getFullYear() === date.getFullYear() &&
                    i.startDate.getMonth() === date.getMonth() &&
                    i.startDate.getDate() === date.getDate()
                )
                .sort(
                  (a, b) =>
                    a.startDate.getTime() - b.startDate.getTime() || a.id - b.id
                );

              return (
                <ScheduleDayColumn
                  key={dayIdx}
                  dayIdx={dayIdx}
                  timeSlots={timeSlots}
                  dayEvents={dayEvents}
                />
              );
            })}
          </div>
          <DragOverlay>
            {activeEvent ? (
              <DraggableEvent
                {...activeEvent}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </ScrollArea>
    </>
  );
};

export default WeeklyCalendar;
