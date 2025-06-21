import { knownIngredients } from "@/data/ingredientSuggestions";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/ui/command";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import useShoppingListStore from "@/store/useShoppingListStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  amount: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(0.01, "La cantidad debe ser mayor a 0"),
  unit: z.string().min(1, "Selecciona una unidad"),
  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .min(0.01, "El precio debe ser mayor a 0")
    .max(9999, "El precio no puede ser tan alto"),
  category: z.enum([
    "Granos",
    "Lácteos",
    "Vegetales",
    "Frutas",
    "Proteínas",
    "Enlatados",
    "Condimentos",
    "Otros",
  ]),
});

type FormValues = z.infer<typeof formSchema>;

interface ShoppingListAddItemProps {
  closeModal?: () => void;
}

export default function ShoppingListAddItem({
  closeModal,
}: ShoppingListAddItemProps) {
  const [search, setSearch] = useState("");
  const filteredIngredients = knownIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(search.toLowerCase())
  );

  const addItem = useShoppingListStore((state) => state.addItem);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 1,
      unit: "unidades",
      price: 0,
      category: "Otros",
    },
  });

  const onSubmit = (data: FormValues) => {
    addItem({
      id: Date.now() + Math.random(),
      name: data.name,
      category: data.category,
      checked: false,
      price: data.price,
      amount: data.amount,
      unit: data.unit,
    });

    form.reset();
    toast.success("Ingrediente agregado a la lista de compras");
    closeModal?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Nombre con sugerencias */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Input
                        placeholder="Ej. Tomate"
                        {...field}
                      />
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Buscar ingrediente..."
                        onValueChange={(val) => setSearch(val)}
                      />
                      <CommandEmpty>No encontrado</CommandEmpty>
                      <CommandGroup>
                        {filteredIngredients.map((item) => (
                          <CommandItem
                            key={item.name}
                            value={item.name}
                            onSelect={() => {
                              form.setValue("name", item.name);
                              form.setValue("category", item.category);
                              if (item.defaultQuantity) {
                                form.setValue(
                                  "amount",
                                  parseFloat(item.defaultQuantity)
                                );
                              }
                              if (item.defaultUnit) {
                                form.setValue("unit", item.defaultUnit);
                              }
                            }}
                          >
                            <span className="mr-2">{item.icon}</span>{" "}
                            {item.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cantidad */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ej. 1.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Unidad */}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidad</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una unidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "unidades",
                      "kg",
                      "g",
                      "L",
                      "ml",
                      "taza",
                      "cucharada",
                      "cucharadita",
                      "lata",
                      "pieza",
                      "botella",
                    ].map((unit) => (
                      <SelectItem
                        key={unit}
                        value={unit}
                      >
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Precio */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="S/ 0.00"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Categoría */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "Granos",
                      "Lácteos",
                      "Vegetales",
                      "Frutas",
                      "Proteínas",
                      "Enlatados",
                      "Condimentos",
                      "Otros",
                    ].map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          Añadir a la lista
        </Button>
      </form>
    </Form>
  );
}
