import { getPlacedEvents } from "@/features/user/utils/calendarUtils";
import { useDroppable } from "@dnd-kit/core";
import type { CalendarEvent } from "../../../../store/calendar/useScheduleStore";
import DraggableEvent from "../../components/draggable-event/DraggableEvent";

type Props = {
  dayIdx: number;
  timeSlots: {
    hour: number;
    minute: number;
  }[];
  dayEvents: CalendarEvent[];
};

function DroppableCell({
  dayIdx,
  hour,
  minute,
  slotHeight,
}: {
  dayIdx: number;
  hour: number;
  minute: number;
  slotHeight: string;
}) {
  const { setNodeRef } = useDroppable({
    id: `cell-${dayIdx}-${hour}-${minute}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ height: slotHeight }}
      className={`border-r hover:bg-green-50 transition relative border-b`}
    />
  );
}

const ScheduleDayColumn = ({ dayIdx, timeSlots, dayEvents }: Props) => {
  const placed = getPlacedEvents(dayEvents);
  const slotHeight = `calc(100% / ${timeSlots.length})`;

  const MINUTES_IN_DAY = 24 * 60;

  return (
    <div className="relative flex-1">
      {timeSlots.map((timeSlot) => (
        <DroppableCell
          key={`drop-${dayIdx}-${timeSlot.hour}-${timeSlot.minute}`}
          dayIdx={dayIdx}
          hour={timeSlot.hour}
          minute={timeSlot.minute}
          slotHeight={slotHeight}
        />
      ))}
      {dayEvents.map((event) => {
        const { index, count } = placed[event.id];
        const left = `${(100 / count) * index}%`;
        const width = `${100 / count}%`;

        const startMinutes =
          event.startDate.getHours() * 60 + event.startDate.getMinutes();
        const endMinutes =
          event.endDate.getHours() * 60 + event.endDate.getMinutes();

        // Calcula top y height en porcentaje
        const top = (startMinutes / MINUTES_IN_DAY) * 100;
        const height = ((endMinutes - startMinutes) / MINUTES_IN_DAY) * 100;

        return (
          <div
            key={event.id}
            style={{
              position: "absolute",
              top: `${top}%`,
              left,
              width,
              height: `${height}%`,
              zIndex: 10,
              paddingRight: "2px",
              paddingLeft: "2px",
              boxSizing: "border-box",
            }}
          >
            <DraggableEvent
              id={event.id}
              title={event.title}
              description={event.description}
              category={event.category}
              startDate={event.startDate}
              endDate={event.endDate}
              startTime={event.startTime}
              endTime={event.endTime}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleDayColumn;
