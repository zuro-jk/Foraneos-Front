
export type Meal = {
  id: number;
  title: string;
  foods: Food[];
}

export interface Food {
  id: number;
  name: string;
  description: string;
}
