import type { DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import MonthlyCalendar from "../../components/monthly-calendar/MonthlyCalendar";
import ScheduleHeader from "../../components/schedule-header/ScheduleHeader";
import WeeklyCalendar from "../../components/weekly-calendar/WeeklyCalendar";
import { INITIAL_EVENTS } from "../../data/data";
import { useWeekDays } from "../../hooks/useWeekDays";
import { useScheduleStore } from "../../store/useScheduleStore";

const Schedule = () => {
  const {
    items,
    setItems,
    activeEvent,
    setActiveEvent,
    updateEvent,
    currentDate,
    setCurrentDate,
  } = useScheduleStore();
  const { weekDays } = useWeekDays();
  const timeSlots = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return { hour, minute };
  });
  const [view, setView] = useState<"week" | "month">("week");

  useEffect(() => {
    setItems(INITIAL_EVENTS);
  }, [setItems]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const match = /^cell-(\d+)-(\d+)-(\d+)$/.exec(over.id as string);
      if (match) {
        const dayIdx = parseInt(match[1], 10);
        const hour = parseInt(match[2], 10);
        const minute = parseInt(match[3], 10);

        const targetDate = weekDays[dayIdx];
        const eventToUpdate = items.find((ev) => ev.id === active.id);
        if (!eventToUpdate) return;

        // Crea la nueva fecha con año, mes, día, hora y minuto explícitos
        const newStartDate = new Date(
          targetDate.getFullYear(),
          targetDate.getMonth(),
          targetDate.getDate(),
          hour,
          minute,
          0,
          0
        );

        const durationMs =
          eventToUpdate.endDate.getTime() - eventToUpdate.startDate.getTime();
        const newEndDate = new Date(newStartDate.getTime() + durationMs);

        updateEvent(eventToUpdate.id as number, {
          startDate: newStartDate,
          endDate: newEndDate,
          startTime: newStartDate.toTimeString().slice(0, 5),
          endTime: newEndDate.toTimeString().slice(0, 5),
        });
      }
    }
  }

  return (
    <div className="container mx-auto mt-4 bg-white">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold">Calendario Semanal</h1>
        <ScheduleHeader
          date={currentDate}
          setDate={setCurrentDate}
          view={view}
          setView={setView}
        />

        {view === "week" && (
          <WeeklyCalendar
            weekDays={weekDays}
            timeSlots={timeSlots}
            items={items}
            activeEvent={activeEvent}
            setActiveEvent={setActiveEvent}
            handleDragEnd={handleDragEnd}
          />
        )}

        {view === "month" && (
          <MonthlyCalendar
            currentDate={currentDate}
            items={items}
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;
