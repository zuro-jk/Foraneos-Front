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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const restrictionOptions = [
  "Sin gluten",
  "Vegetariano",
  "Vegano",
  "Sin lactosa",
  "Sin frutos secos",
  "Sin huevo",
];

const completeProfileSchema = z.object({
  age: z.number().min(18, "You must be at least 18 years old"),
  weight: z.number().min(30, "Weight must be at least 30 kg"),
  height: z.number().min(100, "Height must be at least 100 cm"),
  gender: z.enum(["male", "female", "other"], {
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

type CompleteProfileValues = z.infer<typeof completeProfileSchema>;

const CompleteProfile = () => {
  const navigate = useNavigate();
  const signupData = useUserStore((state) => state.signupData);
  const resetUserStore = useUserStore((state) => state.reset);

  const form = useForm<CompleteProfileValues>({
    defaultValues: {
      age: undefined,
      weight: undefined,
      height: undefined,
      gender: undefined,
      activityLevel: undefined,
      goal: undefined,
      restrictions: [],
    },
  });

  const onSubmit = (values: CompleteProfileValues) => {
    const registrationPayload = {
      ...signupData,
      ...values,
    };
    resetUserStore();
    navigate("/user/main-dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Completa tu perfil
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Edad"
                      min={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso (kg)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Peso en kg"
                      min={20}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura (cm)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Altura en cm"
                      min={80}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded p-2"
                    >
                      <option value="">Selecciona</option>
                      <option value="male">Masculino</option>
                      <option value="female">Femenino</option>
                      <option value="other">Otro</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel de actividad</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded p-2"
                    >
                      <option value="">Selecciona</option>
                      <option value="sedentary">Sedentario</option>
                      <option value="moderate">Moderado</option>
                      <option value="active">Activo</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivo</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded p-2"
                    >
                      <option value="">Selecciona</option>
                      <option value="lose">Bajar de peso</option>
                      <option value="maintain">Mantener peso</option>
                      <option value="gain">Ganar masa muscular</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="restrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restricciones alimenticias (opcional)</FormLabel>
                  <div className="flex flex-col gap-2">
                    {restrictionOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={field.value?.includes(option) || false}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), option]);
                            } else {
                              field.onChange(
                                (field.value || []).filter((v) => v !== option)
                              );
                            }
                          }}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#D2EBBC] text-black font-bold mt-4"
            >
              Guardar y continuar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CompleteProfile;
