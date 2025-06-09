import { useUserStore } from "@/features/auth/store/userStore";
import {
  useAddMealByUserIdWithFoods,
  useGetFoodsFromUser,
  useGetMealById,
  useUpdateMealById,
} from "@/features/user/hooks/foods/useFoods";
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
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  mealSchema,
  type MealFormValues,
} from "../../../../types/meal/mealFormType";

const AddEditMeal = () => {
  const { mealId } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { user } = useUserStore();
  const { data: foodsFromUser } = useGetFoodsFromUser(search);
  const { data: meal } = useGetMealById(
    Number(mealId && !isNaN(Number(mealId)) ? mealId : undefined)
  );
  const { mutate: addMeal } = useAddMealByUserIdWithFoods();
  const { mutate: updateMeal } = useUpdateMealById();

  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: "",
      dateTime: new Date().toISOString(),
      userId: user?.id,
      foodIds: [],
    },
  });

  useEffect(() => {
    if (mealId) {
      form.setValue("name", meal?.name || "");
      form.setValue("foodIds", meal?.foods.map((food) => food.id) || []);
      form.setValue("dateTime", meal?.dateTime || new Date().toISOString());
      form.setValue("userId", Number(user?.id));
    }
  }, [meal, mealId, form, user]);

  const selectedFoodsIds = form.watch("foodIds");
  const selectedFoods =
    foodsFromUser?.filter((food) => selectedFoodsIds.includes(food.id)) || [];
  console.log(foodsFromUser);

  const onSubmit = (data: MealFormValues) => {
    if (mealId) {
      updateMeal(
        {
          mealId: Number(mealId),
          data,
        },
        {
          onSuccess: () => {
            toast("Comida actualizada exitosamente");
            navigate("/user/food-history");
          },
          onError: (error) => {
            toast.error("Error al actualizar la comida: " + error.message);
          },
        }
      );
      return;
    }
    addMeal(data, {
      onSuccess: () => {
        toast("Comida guardada exitosamente");
        navigate("/user/food-history");
      },
      onError: (error) => {
        toast.error("Error al guardar la comida: " + error.message);
      },
    });
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
              </div>
              {/* Sugerencias de alimentos */}
              <div className="bg-gray-50 rounded-lg shadow p-2 mt-2">
                <span className="text-gray-500 text-xs mb-1">
                  Alimentos disponibles:
                  {foodsFromUser
                    ?.filter((food) => !selectedFoodsIds.includes(food.id))
                    .map((food) => (
                      <div
                        key={food.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          form.setValue("foodIds", [
                            ...form.getValues("foodIds"),
                            food.id,
                          ]);
                        }}
                      >
                        <div className="w-12 h-12">
                          <img
                            src={food.imagePath}
                            alt={food.name}
                            className="w-full h-full rounded-md object-cover"
                          />
                        </div>
                        <span>{food.name}</span>
                        <span className="text-gray-400 text-xs">
                          {food.calories} kcal
                        </span>
                      </div>
                    ))}
                </span>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <span className="text-gray-500 text-xs mb-1">
                  Alimentos añadidos:
                  {selectedFoods.map((food) => (
                    <div
                      key={food.id}
                      className="flex items-center justify-between p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        const currentFoodIds = form.getValues("foodIds");
                        form.setValue(
                          "foodIds",
                          currentFoodIds.filter((id) => id !== food.id)
                        );
                      }}
                    >
                      <div className="w-12 h-12">
                        <img
                          src={food.imagePath}
                          alt={food.name}
                          className="w-full h-full rounded-md object-cover"
                        />
                      </div>
                      <span>{food.name}</span>
                      <span className="text-gray-400 text-xs">
                        {food.calories} kcal
                      </span>
                    </div>
                  ))}
                </span>
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
                className="mt-6 w-full py-3 text-lg font-bold cursor-pointer"
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
