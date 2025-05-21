import { useDroppable } from "@dnd-kit/core";
import DraggableEvent from "../../components/draggable-event/DraggableEvent";
import type { CalendarEvent } from "../../store/useScheduleStore";
import { getPlacedEvents } from "../../utils/calendarUtils";

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

const ScheduleDayColumn = ({
  dayIdx,
  timeSlots,
  dayEvents,
}: Props) => {
  const placed = getPlacedEvents(dayEvents);

  const slotHeight = `calc(100% / ${timeSlots.length})`;


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
        
        return (
          <div key={event.id}>
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
