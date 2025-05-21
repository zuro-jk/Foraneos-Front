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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Textarea } from "@/shared/ui/textarea";
import { CalendarIcon, Check, ChevronsUpDown, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EVENT_CATEGORIES } from "../../data/data";
import type { CalendarEvent } from "../../store/useScheduleStore";

interface FormEventDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  showTrigger?: boolean;
  event?: CalendarEvent | null;
}

type FormValues = {
  title: string;
  description: string;
  category: string;
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
};

const FormEventDialog = ({
  open,
  setOpen,
  showTrigger = true,
  event,
}: FormEventDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      startDate: undefined,
      endDate: undefined,
      startTime: "",
      endTime: "",
    },
  });

  useEffect(() => {
    if (event) {
      form.reset({
        title: event.label,
        description: event.description,
        category: event.category,
        startDate: event.startDate,
        endDate: event.endDate,
        startTime: event.startDate.toLocaleTimeString("es-ES", {
          hour: "2-digit",
        }),
        endTime: event.endDate.toLocaleTimeString("es-ES", {
          hour: "2-digit",
        }),
      });
    } else {
      form.reset();
    }
  }, [event, open, form]);

  const onSubmit = (data: FormValues) => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="w-4 h-4" /> Nuevo Evento
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{event ? "Editar Evento" : "Nuevo Evento"}</DialogTitle>
          <DialogDescription>
            {event
              ? "Edita los datos del evento."
              : "Crea un nuevo evento para tu calendario."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Titulo del evento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Fecha de inicio</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("pl-3 text-left font-normal w-full")}
                        >
                          {field.value ? (
                            <span>
                              {field.value.toLocaleDateString("es-ES", {
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
                          selected={field.value}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Hora de inicio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hora de inicio"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Fecha de fin</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("pl-3 text-left font-normal w-full")}
                        >
                          {field.value ? (
                            <span>
                              {field.value.toLocaleDateString("es-ES", {
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
                          selected={field.value}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Hora de fin</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hora de fin"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Descripción del evento"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value ? (
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-3 h-3 rounded-full ${
                                EVENT_CATEGORIES.find(
                                  (event) => event.name === field.value
                                )?.color ?? ""
                              }`}
                            />
                            {
                              EVENT_CATEGORIES.find(
                                (event) => event.name === field.value
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
                                    currentValue === field.value
                                      ? ""
                                      : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === event.name
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormEventDialog;
