import { cn } from "@/lib/utils";

type Props = {
  value?: number; // porcentaje 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  text?: string;
  showPercentageText?: boolean;
  className?: string;
};

const ChartTotalCalories = ({
  value = 70,
  size = 300,
  strokeWidth,
  color = "#5dbe5a",
  bgColor = "#e5e7eb",
  text = "1800 cal",
  showPercentageText = true,
  className,
}: Props) => {
  const baseSize = size;
  // Si no se pasa strokeWidth, usa un valor proporcional al tamaño
  const computedStrokeWidth = strokeWidth ?? Math.max(baseSize * 0.07, 6); // 7% del tamaño, mínimo 6px
  const radius = (baseSize - computedStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const angle = (value / 100) * 360 - 90;

  // Coordenadas de la bolita
  const rad = (angle * Math.PI) / 180;
  const cx = baseSize / 2 + radius * Math.cos(rad);
  const cy = baseSize / 2 + radius * Math.sin(rad);

  return (
    <>
      <div
        className={cn(
          `w-full max-w-xs sm:max-w-sm md:max-w-md flex items-center justify-center`,
          className
        )}
      >
        <svg
          viewBox={`0 0 ${baseSize} ${baseSize}`}
          width={size}
          height={size}
          style={{ display: "block" }}
        >
          {/* Fondo */}
          <circle
            cx={baseSize / 2}
            cy={baseSize / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth={computedStrokeWidth}
            fill="none"
          />
          {/* Progreso */}
          <circle
            cx={baseSize / 2}
            cy={baseSize / 2}
            r={radius}
            stroke={color}
            strokeWidth={computedStrokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s" }}
          />
          {/* Bolita */}
          <circle
            cx={cx}
            cy={cy}
            r={computedStrokeWidth / 2}
            fill={color}
            stroke="#fff"
            strokeWidth={3}
          />
          {/* Texto central */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={`${showPercentageText ? baseSize / 7 : baseSize / 4}`}
            fontWeight="bold"
            fill="#222"
          >
            {text}
          </text>
        </svg>
      </div>
      {showPercentageText && (
        <div className="flex items-center justify-center w-full">
          <span
            className={cn(
              "mt-2 text-gray-500 text-sm",
              value > 50 ? "text-green-800/80" : "text-red-500",
              value > 50 ? "font-semibold" : "font-normal"
            )}
          >
            {value}% del objetivo
          </span>
        </div>
      )}
    </>
  );
};

export default ChartTotalCalories;
