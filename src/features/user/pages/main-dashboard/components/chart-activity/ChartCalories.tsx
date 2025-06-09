import type { DailyCaloriesResponse } from "@/features/user/dto/response/meal/MealResponse";
import { useTheme } from "@/shared/theme-provider/useTheme";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";
import { format, parseISO } from "date-fns";
import { Calendar } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";


const chartConfig = {
  day: {
    label: "Día",
    icon: Calendar,
    color: "#5dbe5a",
  },
  calories: {
    label: "Calorías",
    theme: {
      light: "#5dbe5a",
      dark: "#1c521a",
    },
  },
} satisfies ChartConfig;

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface ChartCaloriesProps {
  calories: DailyCaloriesResponse[];
}

const ChartCalories = ({ calories }: ChartCaloriesProps) => {
  const { theme } = useTheme();

  const chartData = daysOfWeek.map((day) => {
    const entry = calories?.find(
      (calorieEntry) => format(parseISO(calorieEntry.date), "EEEE") === day
    );
    return {
      day,
      calories: entry ? entry.totalCalories : 0,
    };
  });


  const barColor =
    chartConfig.calories.theme[
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme
    ];

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full"
    >
      <BarChart
        width={400}
        height={400}
        accessibilityLayer
        data={chartData}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickMargin={10}
          width={40}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Bar
          dataKey="calories"
          fill={barColor}
          radius={4}
          isAnimationActive={false}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default ChartCalories;
