export interface SignupUserRequest {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
  termsAccepted: boolean;
  goal: "lose_weight" | "maintain_weight" | "gain_weight";
  gender: "MALE" | "FEMALE" | "OTHER";
  weight: number;
  height: number;
  age: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
}

export interface LoginUserRequest {
  username: string;
  password: string;
}
