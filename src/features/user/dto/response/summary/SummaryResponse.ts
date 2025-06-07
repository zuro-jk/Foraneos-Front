export interface SummaryResponse {
  totalCalories: number;
  goalCalories: number;
  recommendedCalories: number;
  recommendedProteins: number;
  recommendedCarbs: number;
  recommendedFats: number;
  consumedProteins: number;
  consumedCarbs: number;
  consumedFats: number;
  mealsCount: number;
  activeGoals: string[];
}
