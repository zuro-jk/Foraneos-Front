import api from "@/lib/api";

export const loginApi = (username: string, password: string) =>
  api.post("auth/log-in", { username, password });

export const signupApi = (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
) =>
  api.post("auth/sign-up", { firstName, lastName, email, username, password });
