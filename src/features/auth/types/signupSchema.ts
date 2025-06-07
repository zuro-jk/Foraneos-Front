import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("El correo no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export type SignupValues = z.infer<typeof signupSchema>;


export const completeProfileSchema = z.object({
  age: z.number().min(18, "You must be at least 18 years old"),
  weight: z.number().min(30, "Weight must be at least 30 kg"),
  height: z.number().min(100, "Height must be at least 100 cm"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  activityLevel: z.enum(
    ["sedentary", "light", "moderate", "active", "very_active"],
    {
      errorMap: () => ({ message: "Activity level is required" }),
    }
  ),
  goal: z.enum(["lose_weight", "maintain_weight", "gain_weight"], {
    errorMap: () => ({ message: "Goal is required" }),
  }),
  restrictions: z.array(z.string()).optional(),
});


export type CompleteProfileValues = z.infer<typeof completeProfileSchema>;
