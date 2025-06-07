import { z } from "zod";

export const foodFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z
    .string({ required_error: "La descripción es obligatoria" })
    .min(1, "La descripción es obligatoria"),
  calories: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "Las calorías son obligatorias" })
      .min(0, "Las calorías deben ser un número positivo")
  ),
  protein: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "Las proteínas son obligatorias" })
      .min(0, "Las proteínas deben ser un número positivo")
  ),
  carbs: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "Los carbohidratos son obligatorios" })
      .min(0, "Los carbohidratos deben ser un número positivo")
  ),
  fat: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "Las grasas son obligatorias" })
      .min(0, "Las grasas deben ser un número positivo")
  ),
  brand: z.string().optional(),
  barcode: z.string().optional(),
  category: z
    .array(z.string().min(1, "La categoria es obligatoria"))
    .min(1, "Selecciona al menos una categoría"),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "El nombre es obligatorio"),
        amount: z.preprocess(
          (val) => (val === "" ? undefined : Number(val)),
          z
            .number({ required_error: "La cantidad es obligatoria" })
            .min(0.01, "La cantidad debe ser positiva")
        ),
        unit: z.string().min(1, "La unidad es obligatoria"),
      })
    )
    .min(1, "Debe haber al menos un ingrediente"),
  preparationSteps: z
    .array(
      z.object({
        description: z.string().min(1, "La descripción es obligatoria"),
      })
    )
    .min(1, "Debe haber al menos un paso de preparación"),
});

export type FoodFormValues = z.infer<typeof foodFormSchema>;

type FoodFormDefaultValues = {
  name: string;
  description: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  brand?: string;
  barcode?: string;
  category: string[];
  ingredients: { name: string; amount: string; unit: string }[];
  preparationSteps: { description: string }[];
};

export const foodFormDefaultValues: FoodFormDefaultValues = {
  name: "",
  description: "",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
  brand: "",
  barcode: "",
  category: [],
  ingredients: [{ name: "", amount: "", unit: "" }],
  preparationSteps: [{ description: "" }],
};
