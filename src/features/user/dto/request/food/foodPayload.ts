

export interface FoodPayload {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  brand?: string;
  barcode?: string;
  categoryIds: number[];
  preparationSteps: {
    stepNumber: number;
    description: string;
  }[];
  ingredients: {
    name: string;
    amount: number;
    unitId: number | null;
  }[];
  userId: number;
  originalFoodId?: number | null;
}
