export interface Ingredient {
  name: string;
  amount: number;
  unit: string | null;
}

export interface PreparationStep {
  id: number;
  stepNumber: number;
  description: string;
}

export interface FoodType {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  brand: string;
  barcode: string;
  categories: string[];
  ingredients: Ingredient[];
  preparationSteps: PreparationStep[];
  userId: number;
}

export interface FoodCategory {
  id: number;
  name: string;
}

export interface FoodUnit {
  id: number;
  name: string;
  abbrevation: string;
  type: string;
}
