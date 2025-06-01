import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImagePlus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import AddFoodModal from "../../../main-dashboard/components/add-food-modal/AddFoodModal";

const FOOD_OPTIONS = [
  {
    id: 1,
    name: "Pollo a la plancha",
    calories: 200,
    image:
      "https://www.paulinacocina.net/wp-content/uploads/2023/06/pollo-a-la-plancha-receta.jpg",
  },
  {
    id: 2,
    name: "Arroz integral",
    calories: 150,
    image:
      "https://cdn7.kiwilimon.com/recetaimagen/37043/640x640/37043.jpg.jpg",
  },
  {
    id: 3,
    name: "Ensalada mixta",
    calories: 80,
    image:
      "https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/7e7e3e7e8e3e8e3e8e3e8e3e8e3e8e3e.jpg",
  },
];

const mealSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  emoji: z.string().min(1, "El emoji es obligatorio"),
});

type MealFormValues = z.infer<typeof mealSchema>;

const AddEditMeal = () => {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedFoods, setSelectedFoods] = useState<typeof FOOD_OPTIONS>([]);
  const [showFoodModal, setShowFoodModal] = useState(false);

  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: "",
      emoji: "",
    },
  });

  useEffect(() => {
    if (mealId) {
      // Aquí puedes cargar los datos de la comida para editar
      // form.reset({ name: "Ejemplo", emoji: "🍽️" });
    }
  }, [mealId]);

  const filteredFoods = FOOD_OPTIONS.filter(
    (food) =>
      food.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedFoods.some((f) => f.id === food.id)
  );

  // Agregar alimento
  const handleAddFood = (food: (typeof FOOD_OPTIONS)[0]) => {
    setSelectedFoods((prev) => [...prev, food]);
    setSearch("");
  };

  // Quitar alimento
  const handleRemoveFood = (id: number) => {
    setSelectedFoods((prev) => prev.filter((f) => f.id !== id));
  };

  const onSubmit = (data: MealFormValues) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto max-w-5xl py-8">
      {/* Encabezado */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} /> Volver
        </Button>
        <h1 className="text-3xl font-extrabold tracking-tight">
          {mealId ? "Editar comida" : "Agregar comida"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Columna 1: Datos básicos */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 border border-gray-100 md:col-span-1">
              <span className="font-semibold text-xl mb-2 text-blue-900">
                1. Datos básicos
              </span>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la comida</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Almuerzo saludable"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="emoji"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icono o emoji</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: 🍽️"
                          maxLength={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">
                  Imagen (opcional)
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                    <ImagePlus
                      className="text-gray-400"
                      size={28}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Subir imagen
                  </Button>
                </div>
              </div>
            </div>

            {/* Columna 2: Selección de alimentos */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 md:col-span-1">
              <span className="font-semibold text-xl mb-2 text-green-900">
                2. Agrega alimentos a tu comida
              </span>
              <span className="text-gray-500 text-sm mb-2">
                Busca y añade alimentos existentes a esta comida.
              </span>
              <div className="flex gap-2">
                <Input
                  placeholder="Buscar alimento..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* El botón solo muestra sugerencias, no es necesario para buscar */}
              </div>
              {/* Sugerencias de alimentos */}
              {search && filteredFoods.length > 0 && (
                <div className="bg-gray-50 rounded-lg shadow p-2 mt-2">
                  {filteredFoods.map((food) => (
                    <div
                      key={food.id}
                      className="flex items-center justify-between p-2 hover:bg-green-100 rounded cursor-pointer"
                      onClick={() => handleAddFood(food)}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-8 h-8 rounded object-cover border"
                        />
                        <span>{food.name}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">
                          {food.calories} cal
                        </span>
                      </div>
                      <Plus size={16} />
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-3 mt-4">
                <span className="text-gray-500 text-xs mb-1">
                  Alimentos añadidos:
                </span>
                {/* Lista de alimentos seleccionados */}
                {selectedFoods.length > 0 ? (
                  selectedFoods.map((food) => (
                    <div
                      key={food.id}
                      className="flex items-center justify-between bg-green-50 rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-10 h-10 rounded object-cover border"
                        />
                        <span className="font-semibold">{food.name}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">
                          {food.calories} cal
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-100"
                        type="button"
                        onClick={() => handleRemoveFood(food.id)}
                      >
                        ×
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-between bg-green-50 rounded-lg p-3 shadow-sm opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-400">
                        ?
                      </div>
                      <span className="font-semibold">Añade más alimentos</span>
                    </div>
                  </div>
                )}
                <AddFoodModal
                  open={showFoodModal}
                  onOpenChange={setShowFoodModal}
                  removeFoodEverywhere={(food) => handleRemoveFood(food.id)}
                />
              </div>
            </div>

            {/* Columna 3: Resumen nutricional y guardar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 border border-gray-100 md:col-span-1">
              <span className="font-semibold text-xl mb-2 text-purple-900">
                3. Resumen nutricional
              </span>
              <span className="text-gray-500 text-sm mb-2">
                Revisa los nutrientes totales de esta comida antes de guardar.
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center bg-blue-50 rounded-lg p-3">
                  <span className="text-xs text-blue-700">Calorías</span>
                  <span className="font-bold text-2xl">350</span>
                </div>
                <div className="flex flex-col items-center bg-green-50 rounded-lg p-3">
                  <span className="text-xs text-green-700">Proteínas</span>
                  <span className="font-bold text-2xl">20g</span>
                </div>
                <div className="flex flex-col items-center bg-yellow-50 rounded-lg p-3">
                  <span className="text-xs text-yellow-700">Carbohidratos</span>
                  <span className="font-bold text-2xl">40g</span>
                </div>
                <div className="flex flex-col items-center bg-pink-50 rounded-lg p-3">
                  <span className="text-xs text-pink-700">Grasas</span>
                  <span className="font-bold text-2xl">10g</span>
                </div>
              </div>
              <Button
                className="mt-6 w-full py-3 text-lg font-bold"
                variant="default"
                type="submit"
              >
                {mealId ? "Guardar cambios" : "Guardar comida"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEditMeal;
