import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";
import { Pie, PieChart } from "recharts";

const chartData = [
  { name: "Proteínas", calories: 30, fill: "#5941F6" },
  { name: "Carbohidratos", calories: 45, fill: "#45C95E" },
  { name: "Grasas", calories: 25, fill: "#DD44BC" },
];

const chartConfig = {
  proteinas: {
    label: "Proteínas",
    color: "#5941F6",
  },
  carbohidratos: {
    label: "Carbohidratos",
    color: "#45C95E",
  },
  grasas: {
    label: "Grasas",
    color: "#DD44BC",
  },
} satisfies ChartConfig;

const ChartMacronutrients = () => {
  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="w-full max-h-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="calories"
            nameKey="name"
            innerRadius={100}
          />
        </PieChart>
      </ChartContainer>
      <div className="flex items-center justify-center gap-6 mt-4">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-center gap-2"
          >
            <div
              className={cn(
                `w-2.5 h-2.5 rounded-full`,
                item.fill === "#5941F6" && "bg-[#5941F6]",
                item.fill === "#45C95E" && "bg-[#45C95E]",
                item.fill === "#DD44BC" && "bg-[#DD44BC]"
              )}
            />
            <span className="text-sm">
              {item.name}: {item.calories}%
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChartMacronutrients;
