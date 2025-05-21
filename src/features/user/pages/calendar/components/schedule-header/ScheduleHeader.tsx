import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";
import { EVENT_CATEGORIES } from "../../data/data";
import FormEventDialog from "../form-event-dialog/FormEventDialog";

type ScheduleHeaderProps = {
  date: Date | undefined;
  setDate: (date: Date) => void;
  view: "week" | "month";
  setView: (view: "week" | "month") => void;
};

const ScheduleHeader = ({
  date,
  setDate,
  view,
  setView,
}: ScheduleHeaderProps) => {
  const [open, setOpen] = useState(false);

  function getRangeLabel(date: Date, view: "week" | "month") {
    if (view === "week") {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.getDate()} ${start.toLocaleString("es-MX", {
        month: "short",
      })} - ${end.getDate()} ${end.toLocaleString("es-MX", {
        month: "short",
      })} ${start.getFullYear()}`;
    } else {
      return `${date.toLocaleString("es-MX", {
        month: "long",
      })} ${date.getFullYear()}`;
    }
  }

  function goToday() {
    setDate(new Date());
  }

  function goToPrev() {
    if (!date) return;
    const newDate = new Date(date);
    if (view === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setDate(newDate);
  }

  function goToNext() {
    if (!date) return;
    const newDate = new Date(date);
    if (view === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setDate(newDate);
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Button
          className="font-semibold cursor-pointer"
          variant="outline"
          size="sm"
          onClick={goToday}
        >
          Hoy
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrev}
          className="cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <span className="font-bold">{getRangeLabel(date!, view)}</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[120px] justify-center text-left cursor-pointer font-semibold"
              )}
              size="sm"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Calendario</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                if (selectedDate) setDate(selectedDate);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          variant={view === "month" ? "default" : "outline"}
          size="sm"
          className="font-semibold cursor-pointer"
          onClick={() => setView(view === "week" ? "month" : "week")}
        >
          <CalendarIcon className="w-4 h-4" />
          <span>Vista Mensual</span>
        </Button>
      </div>
      <div className="flex gap-4">
        <Input placeholder="Buscar eventos" />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="cursor-pointer"
              variant="outline"
            >
              <Filter className="w-4 h-4" /> Filtrar
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <div className="p-2">
              <h3>Categorias</h3>
              <div className="space-y-1">
                {EVENT_CATEGORIES.map((event) => (
                  <div
                    className="flex items-center"
                    key={event.name}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex items-center justify-start px-2 w-full cursor-pointer"
                      )}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${event.color} mr-2`}
                      />
                      {event.label}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <FormEventDialog
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default ScheduleHeader;
