import { ArrowUpRight, BarChart, ChevronDown, Clock, Heart, Siren } from "lucide-react";
import type { SummaryResponse } from "../dto/response/summary/SummaryResponse";

export function buildInformationActivity(data?: SummaryResponse) {
  if (!data) return [];

  return [
    {
      icon: Siren,
      iconColor: "transparent",
      backgroundColor: "transparent",
      title: "Calorías",
      value: `${data.consumedCalories} kcal`,
      percentage: `${data.consumedCalories}% más que ayer`,
      percentageIcon: ArrowUpRight,
      percentageColor: "text-green-600",
    },
    {
      icon: Heart,
      iconColor: "text-blue-600",
      backgroundColor: "bg-blue-200",
      title: "Ingesta de proteinas",
      value: `${data.consumedProteins}`,
      percentage: `${data.proteinPercentage}% sobre el objetivo`,
      percentageIcon: ArrowUpRight,
      percentageColor: "text-green-600",
    },
    {
      icon: Clock,
      iconColor: "text-pink-600",
      backgroundColor: "bg-pink-200",
      title: "Recuento de comidas",
      value: `${data.mealsCount}/5`,
      percentage: "En camino",
      percentageIcon: ArrowUpRight,
      percentageColor: "text-yellow-600",
    },
    {
      icon: BarChart,
      iconColor: "text-purple-600",
      backgroundColor: "bg-purple-200",
      title: "Ingesta de agua",
      value: "1.8L",
      percentage: "0.7L restantes",
      percentageIcon: ChevronDown,
      percentageColor: "text-red-600",
    },
  ];
}
