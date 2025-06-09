export interface SummaryResponse {
  goalCalories: number;
  recommendedCalories: number;
  recommendedProteins: number;
  recommendedCarbs: number;
  recommendedFats: number;
  consumedCalories: number;
  consumedProteins: number;
  consumedCarbs: number;
  consumedFats: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatsPercentage: number;
  mealsCount: number;
  activeGoals: string[];
}
