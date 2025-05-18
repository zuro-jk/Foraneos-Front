import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Textarea } from "@/shared/ui/textarea";
import { CalendarIcon, Check, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { EVENT_CATEGORIES } from "../../pages/schedule/Schedule";

const NewEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog
      open={openDialog}
      onOpenChange={setOpenDialog}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4" /> Nuevo Evento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo Evento</DialogTitle>
          <DialogDescription>
            Crea un nuevo evento para tu calendario.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label htmlFor="title">Titulo</Label>
          <Input
            id="title"
            placeholder="Titulo del evento"
          />
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <Label htmlFor="start-date">Fecha de inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("pl-3 text-left font-normal w-full")}
                  >
                    {startDate ? (
                      <span>
                        {startDate.toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Selecciona una fecha
                      </span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      if (date) {
                        setStartDate(date);
                      }
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <Label htmlFor="start-time">Hora de inicio</Label>
              <Input
                id="start-time"
                placeholder="Hora de inicio"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <Label htmlFor="end-date">Fecha de fin</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("pl-3 text-left font-normal w-full")}
                  >
                    {endDate ? (
                      <span>
                        {endDate.toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Selecciona una fecha
                      </span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => {
                      if (date) {
                        setEndDate(date);
                      }
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <Label htmlFor="end-time">Hora de fin</Label>
              <Input
                id="end-time"
                placeholder="Hora de fin"
              />
            </div>
          </div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Descripción del evento"
            rows={3}
          />
          <Label htmlFor="category">Categoría</Label>
          <Popover
            open={open}
            onOpenChange={setOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedCategory ? (
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        EVENT_CATEGORIES.find(
                          (event) => event.name === selectedCategory
                        )?.color ?? ""
                      }`}
                    />
                    {
                      EVENT_CATEGORIES.find(
                        (event) => event.name === selectedCategory
                      )?.label
                    }
                  </span>
                ) : (
                  <span className="text-muted-foreground font-normal">
                    Selecciona una categoria
                  </span>
                )}
                <ChevronsUpDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
              <Command>
                <CommandInput placeholder="Buscar categoria..." />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {EVENT_CATEGORIES.map((event) => (
                      <CommandItem
                        key={event.name}
                        value={event.name}
                        onSelect={(currentValue) => {
                          setSelectedCategory(
                            currentValue === selectedCategory
                              ? ""
                              : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCategory === event.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${event.color}`}
                        />
                        {event.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenDialog(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            variant="default"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewEventDialog;
