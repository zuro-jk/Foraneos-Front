import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, loginApi, signupApi } from "../api/authApi";
import type {
  LoginUserRequest,
  SignupUserRequest,
} from "../dto/request/authUserRequest";
import type { UserProfileResponse } from "../dto/response/userProfileResponse";

export function useAuthLogin() {
  return useMutation({
    mutationFn: (loginUser: LoginUserRequest) => loginApi(loginUser),
  });
}

export function useAuthSignup() {
  return useMutation({
    mutationFn: (signupUser: SignupUserRequest) => signupApi(signupUser),
  });
}

export function useMe(token?: string) {
  return useQuery<UserProfileResponse>({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!token,
  });
}
