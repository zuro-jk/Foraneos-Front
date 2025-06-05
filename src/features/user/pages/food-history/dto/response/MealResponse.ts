export interface FoodInMealResponse {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealResponse {
  id: number;
  name: string;
  dateTime: string;
  userId: number;
  foods: FoodInMealResponse[];
  createdAt: string;
  updatedAt: string;
}
