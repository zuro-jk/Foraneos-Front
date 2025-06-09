import { useUserStore } from "@/features/auth/store/userStore";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImageIcon, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useUploadImageToCloudinary } from "@/features/user/hooks/cloudinary/cloudinary";
import {
  useAddFoodFromUser,
  useGetCategoriesOfFoods,
  useGetFoodById,
  useGetUnitsOfFoods,
  useUpdateFoodFromUser,
} from "@/features/user/hooks/foods/useFoods";
import {
  foodFormDefaultValues,
  foodFormSchema,
  type FoodFormValues,
} from "../../../../types/foods/foodFormType";

const FoodForm = () => {
  const { foodId } = useParams();
  const { data: categories } = useGetCategoriesOfFoods();
  const { data: units } = useGetUnitsOfFoods();
  const { user } = useUserStore();
  const { data: food } = useGetFoodById(Number(foodId));

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const addFoodMutation = useAddFoodFromUser();
  const updateFoodMutation = useUpdateFoodFromUser();
  const uploadImageMutation = useUploadImageToCloudinary();

  const form = useForm({
    resolver: zodResolver(foodFormSchema),
    defaultValues: foodFormDefaultValues,
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: "preparationSteps",
  });

  useEffect(() => {
    if (food) {
      form.reset({
        name: food.name ?? "",
        description: food.description ?? "",
        imagePath: food.imagePath ?? "",
        imagePublicId: food.imagePublicId ?? "",
        calories:
          food.calories !== undefined && food.calories !== null
            ? food.calories.toString()
            : "",
        protein:
          food.protein !== undefined && food.protein !== null
            ? food.protein.toString()
            : "",
        carbs:
          food.carbs !== undefined && food.carbs !== null
            ? food.carbs.toString()
            : "",
        fat:
          food.fat !== undefined && food.fat !== null
            ? food.fat.toString()
            : "",
        brand: food.brand ?? "",
        barcode: food.barcode ?? "",
        category: food.categories.map((cat) => cat.name) ?? [],
        ingredients: food.ingredients.map((ingredient) => ({
          name: ingredient.name ?? "",
          amount:
            ingredient.amount !== undefined && ingredient.amount !== null
              ? ingredient.amount.toString()
              : "",
          unit: ingredient.unit ? ingredient.unit.name : "",
        })),
        preparationSteps: food.preparationSteps.map((step) => ({
          description: step.description ?? "",
        })),
      });
    }
  }, [food, form]);

  const onSubmit = async (data: FoodFormValues) => {
    if (!selectedImage && !data.imagePath) {
      toast.error("Por favor, selecciona una imagen para el alimento.");
      return;
    }

    if (!user?.id) {
      toast.error("Usuario no encontrado. Por favor, inicia sesión.");
      return;
    }

    let imageUrl = data.imagePath;
    let imagePublicId = "";

    if (selectedImage) {
      try {
        const res = await uploadImageMutation.mutateAsync(selectedImage);
        imageUrl = res.imagePath;
        imagePublicId = res.publicId;
      } catch (error) {
        toast.error("Error al subir la imagen: " + error);
        console.error("Error al subir la imagen:", error);
        return;
      }
    }

    const categoryIds =
      categories
        ?.filter((cat) => data.category.includes(cat.name))
        .map((cat) => cat.id) ?? [];

    const ingredients = data.ingredients.map((ing) => {
      const unitObj = units?.find((u) => u.name === ing.unit);
      return {
        name: ing.name,
        amount: Number(ing.amount),
        unitId: unitObj ? unitObj.id : null,
      };
    });

    const preparationSteps = data.preparationSteps.map((step, index) => ({
      stepNumber: index + 1,
      description: step.description,
    }));

    const payload = {
      ...data,
      imagePath: imageUrl || "",
      imagePublicId: imagePublicId,
      categoryIds,
      ingredients,
      preparationSteps,
      userId: user.id,
    };

    if (foodId) {
      updateFoodMutation.mutate(
        { foodId: Number(foodId), data: payload },
        {
          onSuccess: () => {
            toast("Alimento actualizado exitosamente");
            navigate(-1);
          },
          onError: (error) => {
            toast.error("Error al actualizar el alimento: " + error.message);
          },
        }
      );
    } else {
      addFoodMutation.mutate(payload, {
        onSuccess: () => {
          toast("Alimento creado exitosamente");
          navigate(-1);
        },
        onError: (error) => {
          toast.error("Error al crear el alimento: " + error.message);
          console.error("Error al crear el alimento:", error);
        },
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 mt-8">
      <div className="flex items-center">
        <Button
          className="text-sm text-gray-500 flex items-center cursor-pointer"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver atras
        </Button>
      </div>
      <h1 className="flex-1 text-2xl font-bold text-center">
        {foodId ? "Editar alimento" : "Crear alimento"}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 gap-4 mt-4"
        >
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="imagePath"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Imagen del alimento</FormLabel>
                  <div
                    className="w-32 h-32 flex items-center justify-center rounded-md bg-gray-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-zinc-400 transition"
                    onClick={() => fileInputRef.current?.click()}
                    title="Haz click para seleccionar una imagen"
                  >
                    {imagePreview || field.value ? (
                      <img
                        src={imagePreview || field.value}
                        alt="Vista previa"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-500" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setSelectedImage(file);
                        setImagePreview(URL.createObjectURL(file));

                        form.setValue("imagePath", "temporal");
                      }
                    }}
                  />
                  {/* <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          try {
                            const imagePath =
                              await uploadImageMutation.mutateAsync(file);
                            field.onChange(imagePath);
                          } catch (error) {
                            toast.error("Error al subir la imagen: " + error);
                          }
                        }
                      }}
                    />
                  </FormControl> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Nombre del alimento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre del alimento"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Descripción del alimento"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-4 col-span-4 gap-4">
            <FormField
              control={form.control}
              name="calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calorias</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="350"
                      type="number"
                      step="0.01"
                      {...field}
                      value={
                        typeof field.value === "string" ||
                        typeof field.value === "number"
                          ? field.value
                          : ""
                      }
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="protein"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proteina</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="12.6"
                      type="number"
                      step="0.01"
                      {...field}
                      value={
                        typeof field.value === "string" ||
                        typeof field.value === "number"
                          ? field.value
                          : ""
                      }
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carbohidratos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="20.0"
                      type="number"
                      step="0.01"
                      {...field}
                      value={
                        typeof field.value === "string" ||
                        typeof field.value === "number"
                          ? field.value
                          : ""
                      }
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grasas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10.0"
                      type="number"
                      step="0.01"
                      {...field}
                      value={
                        typeof field.value === "string" ||
                        typeof field.value === "number"
                          ? field.value
                          : ""
                      }
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Hecho en casa"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de barras</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123213213"
                    type="text"
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
              <FormItem className="col-span-2">
                <FormLabel>Categorias</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {field.value && field.value.length > 0
                          ? field.value.join(", ")
                          : "Selecciona categorías"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                        {categories?.map((category) => (
                          <label
                            key={category.id}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              checked={field.value?.includes(category.name)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...(field.value || []), category.name]
                                  : (field.value || []).filter(
                                      (v) => v !== category.name
                                    );
                                field.onChange(newValue);
                              }}
                            />
                            {category.name}
                          </label>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2 col-span-2">
            <Label>Ingredientes</Label>
            {ingredientFields.map((field, idx) => (
              <div
                key={field.id}
                className="flex gap-2 items-center"
              >
                <div className="flex-1">
                  <Input
                    placeholder="Nombre del ingrediente"
                    {...form.register(`ingredients.${idx}.name`)}
                    className="flex-1"
                    autoComplete="off"
                  />
                  {form.formState.errors.ingredients?.[idx]?.name && (
                    <div className="text-red-500 text-xs">
                      {form.formState.errors.ingredients[idx].name.message}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Cantidad"
                    type="number"
                    {...form.register(`ingredients.${idx}.amount`)}
                    className="flex-1"
                    step="0.01"
                    min="0.01"
                  />
                  {form.formState.errors.ingredients?.[idx]?.amount && (
                    <div className="text-red-500 text-xs ml-2">
                      {form.formState.errors.ingredients[idx]?.amount?.message}
                    </div>
                  )}
                </div>
                <div>
                  <Select
                    onValueChange={(value) =>
                      form.setValue(`ingredients.${idx}.unit`, value)
                    }
                    value={form.watch(`ingredients.${idx}.unit`)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {units &&
                        units.map((unit) => (
                          <SelectItem
                            key={unit.id}
                            value={unit.name}
                          >
                            {unit.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.ingredients?.[idx]?.unit && (
                    <div className="text-red-500 text-xs ml-2">
                      {form.formState.errors.ingredients[idx]?.unit?.message}
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeIngredient(idx)}
                  className="cursor-pointer"
                >
                  <Trash />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendIngredient({ name: "", amount: "", unit: "" })
              }
            >
              Añadir ingrediente
            </Button>
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <Label>Pasos de preparación</Label>
            {stepFields.map((field, idx) => (
              <div
                key={field.id}
                className="flex gap-2 items-center"
              >
                <Input
                  placeholder={`Paso ${idx + 1}`}
                  {...form.register(`preparationSteps.${idx}.description`)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeStep(idx)}
                  className="cursor-pointer"
                >
                  <Trash />
                </Button>
              </div>
            ))}
            {form.formState.errors.preparationSteps &&
              Array.isArray(form.formState.errors.preparationSteps) &&
              form.formState.errors.preparationSteps.map(
                (error, idx) =>
                  error && (
                    <div
                      key={idx}
                      className="text-red-500 text-xs ml-2"
                    >
                      {error.description?.message}
                    </div>
                  )
              )}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendStep({ description: "" })}
            >
              Añadir paso
            </Button>
          </div>

          <Button
            type="submit"
            className="col-span-full cursor-pointer bg-zinc-950 backdrop-blur-2xl"
          >
            Guardar alimento
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FoodForm;
