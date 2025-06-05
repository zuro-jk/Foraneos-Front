export interface FoodCategoryResponse {
  id: number;
  name: string;
}

export interface FoodUnitResponse {
  id: number;
  name: string;
  abbreviation: string;
  type: string;
}

export interface IngredientResponse {
  name: string;
  amount: number;
  unit: FoodUnitResponse;
}

export interface PreparationStepResponse {
  id: number;
  stepNumber: number;
  description: string;
}

export interface FoodResponse {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  brand: string;
  barcode: string;
  categories: FoodCategoryResponse[];
  ingredients: IngredientResponse[];
  preparationSteps: PreparationStepResponse[];
  userId: number;
}
