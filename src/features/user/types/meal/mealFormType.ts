import { z } from "zod";

export const mealSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  dateTime: z.string().min(1, "La fecha y hora son obligatorias"),
  userId: z
    .number()
    .int()
    .positive("El ID de usuario debe ser un número positivo"),
  foodIds: z
    .array(
      z
        .number()
        .int()
        .positive("Los IDs de alimentos deben ser números positivos")
    )
    .min(1, "Debe seleccionar al menos un alimento"),
});

export type MealFormValues = z.infer<typeof mealSchema>;
