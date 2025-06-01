import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, loginApi } from "../api/authApi";

export interface UserProfileResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  weight: number;
  height: number;
  age: number;
  gender: string; // O puedes definir un enum Gender si lo necesitas
  activityLevel: string;
  goal: string;
  dietaryRestrictions: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => loginApi(username, password),
  });
}

export function useMe(token?: string) {
  return useQuery<UserProfileResponse>({
    queryKey: ["me"],
    queryFn: () => getMe().then((res) => res.data as UserProfileResponse),
    enabled: !!token,
  });
}
