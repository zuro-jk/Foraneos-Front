import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ScrollArea } from "@/shared/ui/scroll-area";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";
import { addDays, format, isSameDay, parseISO, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DraggableEvent from "../../components/draggable-event/DraggableEvent";
import NewEventDialog from "../../components/neweventdialog/NewEventDialog";

export const EVENT_CATEGORIES = [
  {
    name: "comida",
    label: "Comidas",
    color: "bg-green-500",
  },
  {
    name: "estudio",
    label: "Estudio",
    color: "bg-blue-500",
  },
  {
    name: "ejercicio",
    label: "Ejercicio",
    color: "bg-red-500",
  },
  {
    name: "compras",
    label: "Compras",
    color: "bg-yellow-500",
  },
  {
    name: "social",
    label: "Social",
    color: "bg-purple-500",
  },
  {
    name: "otro",
    label: "Otro",
    color: "bg-gray-500",
  },
];

function DroppableCell({
  dayIdx,
  hour,
  children,
}: {
  dayIdx: number;
  hour: number;
  children?: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({
    id: `cell-${dayIdx}-${hour}`,
  });
  return (
    <div
      ref={setNodeRef}
      className="h-12 border-b border-r hover:bg-green-50 transition relative"
    >
      {children}
    </div>
  );
}

const Schedule = () => {
  const searchParam = useSearchParams();
  const dateParam = searchParam[0].get("date");
  const [date, setDate] = useState<Date>();
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 a 23
  const [activeEvent, setActiveEvent] = useState<null | {
    id: string;
    label: string;
    category?: string;
    description?: string;
    location?: string;
  }>(null);
  const [items, setItems] = useState([
    {
      id: "1",
      day: 0,
      hour: 9,
      duration: 2,
      label: "Evento 1",
      category: "comida",
      description: "Desayuno saludable",
      location: "Cocina",
    },
    {
      id: "2",
      day: 1,
      hour: 10,
      duration: 2,
      label: "Evento 2",
      category: "comida",
      description: "Almuerzo ligero",
      location: "Comedor",
    },
    {
      id: "3",
      day: 2,
      hour: 11,
      duration: 2,
      label: "Evento 3",
      category: "estudio",
      description: "Estudiar React",
      location: "Biblioteca",
    },
    {
      id: "4",
      day: 3,
      hour: 12,
      duration: 2,
      label: "Evento 4",
      category: "ejercicio",
      description: "Gimnasio",
      location: "Gym",
    },
    {
      id: "5",
      day: 4,
      hour: 13,
      duration: 2,
      label: "Evento 5",
      category: "compras",
      description: "Comprar verduras",
      location: "Mercado",
    },
    {
      id: "6",
      day: 5,
      hour: 14,
      duration: 3,
      label: "Evento 6",
      category: "social",
      description: "Café con amigos",
      location: "Starbucks",
    },
    {
      id: "7",
      day: 6,
      hour: 14,
      duration: 3,
      label: "Evento 7",
      category: "otro",
      description: "Leer un libro",
      location: "Casa",
    },
  ]);

  const [currentDate, setCurrentDate] = useState<Date>(() => {
    if (dateParam) {
      try {
        return parseISO(dateParam);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return new Date();
      }
    }
    return new Date();
  });

  const [weekStart, setWeekStart] = useState(
    startOfWeek(currentDate, { weekStartsOn: 1 })
  );
  const [weekDays, setWeekDays] = useState(
    Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const match = /^cell-(\d+)-(\d+)$/.exec(over.id as string);
      if (match) {
        const day = parseInt(match[1], 10);
        const hour = parseInt(match[2], 10);

        // Elimina la validación de isOccupied para permitir solapamiento
        setItems((prev) =>
          prev.map((item) =>
            item.id === active.id ? { ...item, day, hour } : item
          )
        );
      }
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-bold text-3xl">Calendario Semanal</h1>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Button
              className="font-semibold"
              variant="outline"
              size="sm"
            >
              Hoy
            </Button>
            <Button
              variant="ghost"
              size="icon"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <span className="font-bold">12 may - 18 may 2025</span>
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
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="sm"
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
            <NewEventDialog />
          </div>
        </div>

        {/* Encabezado */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b">
          <div className="border-r p-2 bg-gray-50"></div>
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={cn(
                "p-2 text-center border-r",
                isSameDay(day, new Date()) && "bg-blue-50"
              )}
            >
              <div className="font-medium">
                {format(day, "EEE", { locale: es })}
              </div>
              <div
                className={cn(
                  "text-2xl font-bold",
                  isSameDay(day, new Date()) && "text-blue-600"
                )}
              >
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>

        {/* Cuadriculas */}
        <ScrollArea className="h-[600px] w-full mb-8">
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
            <div className="grid grid-cols-[60px_repeat(7,1fr)]">
              <div className="flex flex-col">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-12 border-b flex items-center justify-end pr-2 text-xs text-gray-500"
                  >
                    {hour}:00
                  </div>
                ))}
              </div>
              {weekDays.map((_, dayIdx) => {
                const dayEvents = items
                  .filter((i) => i.day === dayIdx)
                  .sort(
                    (a, b) =>
                      a.hour - b.hour ||
                      a.duration - b.duration ||
                      a.id.localeCompare(b.id)
                  );

                // Para cada evento, encuentra todos los eventos que se solapan con él
                type Placed = { index: number; count: number };
                const placed: Record<string, Placed> = {};
                const assigned = new Set<string>();

                for (let i = 0; i < dayEvents.length; i++) {
                  const base = dayEvents[i];
                  if (assigned.has(base.id)) continue;

                  const group = dayEvents.filter((ev) => {
                    const startA = base.hour;
                    const endA = base.hour + (base.duration || 1);
                    const startB = ev.hour;
                    const endB = ev.hour + (ev.duration || 1);
                    return (
                      (startA < endB && endA > startB) || // se solapan
                      startA === startB // mismo inicio
                    );
                  });

                  group.sort(
                    (a, b) => a.hour - b.hour || a.id.localeCompare(b.id)
                  );

                  group.forEach((ev, index) => {
                    placed[ev.id] = { index, count: group.length };
                    assigned.add(ev.id);
                  });
                }

                return (
                  <div
                    key={dayIdx}
                    className="relative flex-1"
                  >
                    {hours.map((hour) => (
                      <DroppableCell
                        key={`drop-${dayIdx}-${hour}`}
                        dayIdx={dayIdx}
                        hour={hour}
                      />
                    ))}
                    {dayEvents.map((event) => {
                      const { index, count } = placed[event.id];
                      return (
                        <div
                          key={event.id}
                          style={{
                            position: "absolute",
                            top: `${event.hour * 48}px`,
                            left: `${(100 / count) * index}%`,
                            width: `${100 / count}%`,
                            height: `${event.duration * 48}px`,
                            zIndex: 10,
                            padding: "0 2px",
                          }}
                        >
                          <DraggableEvent
                            id={event.id}
                            label={event.label}
                            category={event.category}
                            description={event.description}
                            location={event.location}
                            duration={event.duration}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <DragOverlay>
              {activeEvent ? (
                <DraggableEvent
                  id={activeEvent.id}
                  label={activeEvent.label}
                  category={activeEvent.category}
                  description={activeEvent.description}
                  location={activeEvent.location}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Schedule;
