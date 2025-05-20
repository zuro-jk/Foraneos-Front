import { useTheme } from "@/shared/theme-provider/useTheme";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Switch } from "@/shared/ui/switch";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const languages = [
  {
    value: "español",
    label: "Español",
  },
  {
    value: "ingles",
    label: "Inglés",
  },
  {
    value: "frances",
    label: "Francés",
  },
];

const Preferences = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-8">
      <span className="text-2xl font-bold">Preferencias</span>

      <div className="flex flex-col gap-4">
        <Label className="text-lg font-bold">Lenguaje de Preferencia</Label>
        <Popover
          open={open}
          onOpenChange={setOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded="false"
              className="w-full justify-between"
            >
              {value
                ? languages.find((lang) => lang.value === value)?.label
                : "Selecciona un idioma"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-[var(--radix-popover-trigger-width)]  p-0">
            <Command>
              <CommandInput placeholder="Buscar idioma..." />
              <CommandList>
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                <CommandGroup>
                  {languages.map((lang) => (
                    <CommandItem
                      key={lang.value}
                      value={lang.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          lang.value === value ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {lang.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">Unidades de Medida</span>
          <RadioGroup
            defaultValue="metric"
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="metric"
                id="metric"
                className="cursor-pointer"
              />
              <Label
                htmlFor="metric"
                className="text-lg text-gray-500"
              >
                Metric (g,ml)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="imperial"
                id="imperial"
                className="cursor-pointer"
              />
              <Label
                htmlFor="imperial"
                className="text-lg text-gray-500"
              >
                Imperial (oz, lb)
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Tema */}
        <div className="flex items-center justify-between gap-4 py-2">
          <span className="text-lg font-bold">Tema Oscuro</span>
          <div className="flex items-center gap-2">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
              id="theme-toggle"
            />
          </div>
        </div>

        {/* Notificaciones generales */}
        <div className="flex items-center justify-between gap-4 py-2">
          <span className="text-lg font-bold">Notificaciones generales</span>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
            id="general-notifications"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-lg font-bold">Ajustes de notificación</span>
          <div className="flex items-center space-x-2">
            <Checkbox id="notifications-email" />
            <label
              htmlFor="notifications-email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 h-[12px]"
            >
              Notificaciones por email
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="recipe-recommendations" />
            <label
              htmlFor="recipe-recommendations"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 h-[12px]"
            >
              Recomendaciones de recetas
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="meal-plan-reminders" />
            <label
              htmlFor="meal-plan-reminders"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 h-[12px]"
            >
              Recordatorios de plan de comidas
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
