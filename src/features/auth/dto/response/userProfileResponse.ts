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
