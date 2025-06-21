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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  quantity: z.string().min(1, "La cantidad es requerida"),
  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .min(0, "El precio no puede ser negativo"),
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

function ShoppingListAddItem({ closeModal }: ShoppingListAddItemProps) {
  const addItem = useShoppingListStore((state) => state.addItem);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: "",
      price: 0,
      category: "Otros",
    },
  });

  const onSubmit = (data: FormValues) => {
    addItem({
      id: Date.now() + Math.random(),
      checked: false,
      ...data,
    });
    form.reset();
    toast.success("Ingrediente agregado a la lista de compras");

    closeModal?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
                      <CommandInput placeholder="Buscar ingrediente..." />
                      <CommandEmpty>No encontrado</CommandEmpty>
                      <CommandGroup>
                        {knownIngredients.map((ingredient) => (
                          <CommandItem
                            key={ingredient}
                            value={ingredient}
                            onSelect={() => {
                              form.setValue("name", ingredient);
                            }}
                          >
                            {ingredient}
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
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. 2 unidades"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione una categoria" />
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
                    ].map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                      >
                        {category}
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
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          Añadir a la lista
        </Button>
      </form>
    </Form>
  );
}

export default ShoppingListAddItem;
