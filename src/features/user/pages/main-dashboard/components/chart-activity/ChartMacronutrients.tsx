import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";
import { Pie, PieChart } from "recharts";


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

interface ChartMacronutrientsProps {
  proteinPercentage: number;
  carbsPercentage: number;
  fatsPercentage: number;
}

const ChartMacronutrients = ({
  proteinPercentage,
  carbsPercentage,
  fatsPercentage,
}: ChartMacronutrientsProps) => {

  const chartData = [
    {
      name: "Proteínas",
      calories: proteinPercentage,
      fill: chartConfig.proteinas.color,
    },
    {
      name: "Carbohidratos",
      calories: carbsPercentage,
      fill: chartConfig.carbohidratos.color,
    },
    {
      name: "Grasas",
      calories: fatsPercentage,
      fill: chartConfig.grasas.color,
    },
  ];

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart
          width={250}
          height={250}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="calories"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            strokeWidth={5}
            isAnimationActive={false}
          />
        </PieChart>
      </ChartContainer>
      <div className="flex items-center justify-center gap-6 mt-4">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2"
          >
            <div
              className={cn(
                "w-3 h-3 rounded-full",
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
