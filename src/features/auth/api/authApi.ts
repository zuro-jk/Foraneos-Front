import api from "@/lib/api";
import type {
  LoginUserRequest,
  SignupUserRequest,
} from "../dto/request/authUserRequest";
import type {
  LoginUserResponse,
  SignupUserResponse,
} from "../dto/response/authUserResponse";

export const loginApi = async (
  loginUser: LoginUserRequest
): Promise<LoginUserResponse> =>
  (await api.post("auth/log-in", loginUser)).data;

export const signupApi = async (
  signupUser: SignupUserRequest
): Promise<SignupUserResponse> =>
  (await api.post("auth/sign-up", signupUser)).data;

export const getMe = async () => (await api.get("/users/me")).data;
