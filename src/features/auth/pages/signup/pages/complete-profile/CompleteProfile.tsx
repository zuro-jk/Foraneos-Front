import { useAuthSignup } from "@/hooks/auth/useAuth";
import {
  completeProfileSchema,
  type CompleteProfileValues,
} from "@/types/signupSchema";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userStore";
import type { SignupUserRequest } from "@/dto/request/authUserRequest";

const restrictionOptions = [
  "Sin gluten",
  "Vegetariano",
  "Vegano",
  "Sin lactosa",
  "Sin frutos secos",
  "Sin huevo",
];

const CompleteProfile = () => {
  const navigate = useNavigate();
  const signupData = useUserStore((state) => state.signupData);
  const resetUserStore = useUserStore((state) => state.reset);
  const signupMutation = useAuthSignup();

  const form = useForm<CompleteProfileValues>({
    resolver: zodResolver(completeProfileSchema),
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
    if (!signupData) {
      toast("No se encontraron datos de registro previos");
      return;
    }

    const registrationPayload: SignupUserRequest = {
      ...signupData,
      ...values,
    } as SignupUserRequest;

    signupMutation.mutate(registrationPayload, {
      onSuccess: () => {
        toast("Perfil completado exitosamente");
        useUserStore.getState().setProfileComplete(true);
        resetUserStore();
        navigate("/login");
      },
      onError: (error: Error) => {
        toast("Error al completar el perfil: " + error.message);
      },
    });
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
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
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
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
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
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
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
                      <option value="MALE">Masculino</option>
                      <option value="FEMALE">Femenino</option>
                      <option value="OTHER">Otro</option>
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
                      <option value="lose_weight">Bajar de peso</option>
                      <option value="maintain_weight">Mantener peso</option>
                      <option value="gain_weight">Ganar masa muscular</option>
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
