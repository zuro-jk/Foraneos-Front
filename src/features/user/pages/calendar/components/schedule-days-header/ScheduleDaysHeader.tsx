import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";

type ScheduleDaysHeaderProps = {
  weekDays: Date[];
}

const ScheduleDaysHeader = ({ weekDays }: ScheduleDaysHeaderProps) => (
  <div className="grid grid-cols-[70px_repeat(7,1fr)] border-b">
    <div className="border-r p-2 bg-gray-50"></div>
    {weekDays.map((day, index) => (
      <div
        key={index}
        className={cn(
          "p-2 text-center border-r",
          isSameDay(day, new Date()) && "bg-blue-50"
        )}
      >
        <div className="font-medium">{format(day, "EEE", { locale: es })}</div>
        <div
          className={cn(
            "text-2xl font-bold",
            isSameDay(day, new Date()) && "text-blue-600"
          )}
        >
          {format(day, "d")}
        </div>
      </div>
    ))}
  </div>
);

export default ScheduleDaysHeader;
