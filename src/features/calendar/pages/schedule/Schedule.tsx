import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";

const Schedule = () => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="container mx-auto">
      <div>
        <h1>Calendario Semanal</h1>
        <div className="flex justify-between">
          <div>
            <Button>Hoy</Button>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <span className="font-bold">12 may - 18 may 2025</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[120px] justify-center text-left font-normal cursor-pointer",
                    !date && "text-muted-foreground"
                  )}
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
          </div>
          <div className="flex gap-4">
            <Input placeholder="Buscar eventos" />
            <Popover>
              <PopoverTrigger asChild>
                <Button className="cursor-pointer" variant="outline">
                  <Filter className="w-4 h-4" /> Filtrar
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                  <div className="p-2">
                    <h3>Categorias</h3>
                  </div>
              </PopoverContent>
            </Popover>
            <Button className="cursor-pointer">+ Nuevo Evento</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
