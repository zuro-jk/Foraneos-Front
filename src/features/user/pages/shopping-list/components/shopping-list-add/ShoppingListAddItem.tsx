import { knownIngredients } from "@/data/ingredientSuggestions";
import useShoppingListStore from "@/store/useShoppingListStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  amount: z.number({ invalid_type_error: "Debe ser un número" }).min(0.01),
  unit: z.string().min(1, "Selecciona una unidad"),
  price: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(0.01)
    .max(9999),
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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Nombre con búsqueda */}
        <div>
          <label>Nombre</label>
          <input
            type="text"
            {...form.register("name")}
            placeholder="Ej. Tomate"
            className="w-full border p-2 rounded"
            onChange={(e) => {
              form.setValue("name", e.target.value);
              setSearch(e.target.value);
            }}
            value={form.watch("name")}
          />
          <ul className="border mt-1 rounded max-h-40 overflow-auto bg-white text-sm">
            {filteredIngredients.map((ingredient) => (
              <li
                key={ingredient.name}
                className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                onClick={() => {
                  form.setValue("name", ingredient.name);
                  form.setValue("category", ingredient.category);
                  if (ingredient.defaultQuantity) {
                    form.setValue(
                      "amount",
                      parseFloat(ingredient.defaultQuantity)
                    );
                  }
                  if (ingredient.defaultUnit) {
                    form.setValue("unit", ingredient.defaultUnit);
                  }
                  setSearch("");
                }}
              >
                <span>{ingredient.icon}</span> {ingredient.name}
              </li>
            ))}
            {filteredIngredients.length === 0 && (
              <li className="p-2 text-gray-500">No encontrado</li>
            )}
          </ul>
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Cantidad */}
        <div>
          <label>Cantidad</label>
          <input
            type="number"
            step="0.01"
            placeholder="Ej. 1.5"
            className="w-full border p-2 rounded"
            {...form.register("amount", {
              valueAsNumber: true,
            })}
          />
          {form.formState.errors.amount && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.amount.message}
            </p>
          )}
        </div>

        {/* Unidad */}
        <div>
          <label>Unidad</label>
          <select
            className="w-full border p-2 rounded"
            {...form.register("unit")}
          >
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
              <option
                key={unit}
                value={unit}
              >
                {unit}
              </option>
            ))}
          </select>
          {form.formState.errors.unit && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.unit.message}
            </p>
          )}
        </div>

        {/* Precio */}
        <div>
          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            placeholder="S/ 0.00"
            className="w-full border p-2 rounded"
            {...form.register("price", {
              valueAsNumber: true,
            })}
          />
          {form.formState.errors.price && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.price.message}
            </p>
          )}
        </div>

        {/* Categoría */}
        <div>
          <label>Categoría</label>
          <select
            className="w-full border p-2 rounded"
            {...form.register("category")}
          >
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
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {form.formState.errors.category && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* Botón de enviar */}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
      >
        Añadir a la lista
      </button>
    </form>
  );
}
