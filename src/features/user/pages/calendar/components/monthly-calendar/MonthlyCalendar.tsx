import { cn } from "@/lib/utils";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
  useScheduleStore,
  type CalendarEvent,
} from "../../store/useScheduleStore";
import DraggableEvent from "../draggable-event/DraggableEvent";
import DroppableMonthCell from "../droppable-month-cell/DroppableMonthCell";
import FormEventDialog from "../form-event-dialog/FormEventDialog";

type MonthlyCalendarProps = {
  currentDate: Date;
  items: CalendarEvent[];
};

function getFullMonthGrid(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const endDay = lastDayOfMonth.getDay();

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();
  const prevMonthDays = [];
  for (let i = startDay - 1; i >= 0; i--) {
    prevMonthDays.push({
      date: new Date(prevYear, prevMonth, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  const currentMonthDays = [];
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    currentMonthDays.push({
      date: new Date(year, month, d),
      isCurrentMonth: true,
    });
  }

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const nextMonthDays = [];
  for (let i = 1; i < 7 - endDay; i++) {
    nextMonthDays.push({
      date: new Date(nextYear, nextMonth, i),
      isCurrentMonth: false,
    });
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}

const MonthlyCalendar = ({ currentDate, items }: MonthlyCalendarProps) => {
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [dialog, setDialog] = useState(false);
  const updateEvent = useScheduleStore((s) => s.updateEvent);
  const weekDaysLabels = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const today = new Date();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <div className="w-full overflow-x-auto">
      <DndContext
        sensors={sensors}
        onDragStart={(event) => {
          const item = items.find((i) => i.id === event.active.id);
          if (item) setActiveEvent(item);
        }}
        onDragEnd={(event) => {
          setActiveEvent(null);
          const { active, over } = event;
          if (over && active.id !== over.id) {
            const match = /^cell-(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(
              over.id as string
            );
            if (match) {
              const year = parseInt(match[1], 10);
              const month = parseInt(match[2], 10);
              const day = parseInt(match[3], 10);
              const original = items.find((ev) => ev.id === active.id);
              if (!original) return;
              const newStartDate = new Date(
                year,
                month,
                day,
                original.startDate.getHours(),
                original.startDate.getMinutes(),
                0,
                0
              );
              const durationMs =
                original.endDate.getTime() - original.startDate.getTime();
              const newEndDate = new Date(newStartDate.getTime() + durationMs);

              updateEvent(original.id, {
                startDate: newStartDate,
                endDate: newEndDate,
                startTime: newStartDate.toTimeString().slice(0, 5),
                endTime: newEndDate.toTimeString().slice(0, 5),
              });
            }
          }
        }}
        onDragCancel={() => setActiveEvent(null)}
      >
        <div className="grid grid-cols-7 border rounded bg-white">
          {weekDaysLabels.map((label) => (
            <div
              key={label}
              className="p-2 font-bold text-center border-b bg-gray-50"
            >
              {label}
            </div>
          ))}
          {getFullMonthGrid(currentDate).map(({ date, isCurrentMonth }) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            const dayEvents = items
              .filter((ev) => {
                return (
                  ev.startDate.getFullYear() === year &&
                  ev.startDate.getMonth() === month &&
                  ev.startDate.getDate() === day
                );
              })
              .sort((a, b) => {
                // Ordena por hora de inicio
                return a.startDate.getTime() - b.startDate.getTime();
              });

            return (
              <DroppableMonthCell
                key={date.toISOString()}
                year={year}
                month={month}
                day={day}
                isCurrentMonth={isCurrentMonth}
              >
                <div className="flex flex-col gap-1 h-full overflow-hidden p-2">
                  <div className="font-semibold flex justify-between items-center">
                    <span
                      className={cn(
                        "text-sm",
                        isToday &&
                          "bg-blue-600 text-white font-bold rounded-full px-[5px] py-[3px]"
                      )}
                    >
                      {date.getDate()}
                    </span>
                    {dayEvents.length > 0 && (
                      <CalendarIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-h-0 overflow-hidden relative">
                    {dayEvents.slice(0, 3).map((ev) => (
                      <DraggableEvent
                        key={ev.id}
                        id={ev.id}
                        title={ev.title}
                        description={ev.description}
                        category={ev.category}
                        startDate={ev.startDate}
                        endDate={ev.endDate}
                        startTime={ev.startTime}
                        endTime={ev.endTime}
                        compact={true}
                        onClick={() => {
                          setSelectedEvent(ev);
                          setDialog(true);
                        }}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-xs text-gray-500 mt-1 select-none">
                        +{dayEvents.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              </DroppableMonthCell>
            );
          })}
        </div>
        <DragOverlay>
          {activeEvent && (
            <DraggableEvent
              id={activeEvent.id}
              title={activeEvent.title}
              category={activeEvent.category}
              description={activeEvent.description}
              startDate={activeEvent.startDate}
              endDate={activeEvent.endDate}
              startTime={activeEvent.startTime}
              endTime={activeEvent.endTime}
              compact={true}
            />
          )}
        </DragOverlay>
      </DndContext>

      <FormEventDialog
        open={dialog}
        setOpen={setDialog}
        showTrigger={false}
        event={selectedEvent}
      />
    </div>
  );
};

export default MonthlyCalendar;
