import { useTheme } from "@/shared/theme-provider/useTheme";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";
import { Calendar } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { day: "Monday", calories: 2100 },
  { day: "Tuesday", calories: 1950 },
  { day: "Wednesday", calories: 2300 },
  { day: "Thursday", calories: 2000 },
  { day: "Friday", calories: 2200 },
  { day: "Saturday", calories: 1800 },
  { day: "Sunday", calories: 2400 },
];

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

const ChartCalories = () => {
  const { theme } = useTheme();

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
