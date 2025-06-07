import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SignupUserRequest } from "../dto/request/authUserRequest";

type SignupData = Omit<
  SignupUserRequest,
  "goal" | "gender" | "weight" | "height" | "age" | "activityLevel"
>;

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

interface UserState {
  token: string | null;
  isProfileComplete: boolean;
  signupData: SignupData | null;
  setSignupData: (data: SignupData) => void;
  user: User | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setProfileComplete: (complete: boolean) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      isProfileComplete: false,
      signupData: null,
      user: null,
      setToken: (token) => set({ token }),
      setProfileComplete: (complete) => set({ isProfileComplete: complete }),
      setSignupData: (data) => set({ signupData: data }),
      setUser: (user) => set({ user }),
      reset: () =>
        set({
          token: null,
          isProfileComplete: false,
          signupData: null,
          user: null,
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        token: state.token,
        isProfileComplete: state.isProfileComplete,
        user: state.user,
      }),
    }
  )
);
