import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import {
  BookOpen,
  Calendar,
  Dumbbell,
  MoreHorizontal,
  ShoppingCart,
  Users,
} from "lucide-react";
import { type JSX } from "react";
import type { CalendarEvent } from "../../../../store/calendar/useScheduleStore";

const ICONS: Record<string, JSX.Element> = {
  comida: <Calendar className="w-4 h-4" />,
  estudio: <BookOpen className="w-4 h-4" />,
  ejercicio: <Dumbbell className="w-4 h-4" />,
  compras: <ShoppingCart className="w-4 h-4" />,
  social: <Users className="w-4 h-4" />,
  otro: <MoreHorizontal className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  comida: "bg-green-100 text-green-700 border-green-400",
  estudio: "bg-blue-100 text-blue-800/80 border-blue-400",
  ejercicio: "bg-red-100 text-red-700 border-red-400",
  compras: "bg-yellow-100 text-yellow-700 border-yellow-400",
  social: "bg-purple-100 text-purple-700 border-purple-400",
  otro: "bg-gray-100 text-gray-700 border-gray-400",
};

const CATEGORY_LINE_COLORS: Record<string, string> = {
  comida: "bg-green-400",
  estudio: "bg-blue-400",
  ejercicio: "bg-red-400",
  compras: "bg-yellow-400",
  social: "bg-purple-400",
  otro: "bg-gray-400",
};

interface DraggableEventProps extends CalendarEvent {
  compact?: boolean;
  onClick?: () => void;
}

function DraggableEvent({
  id,
  title,
  category = "otro",
  description,
  startDate,
  endDate,
  startTime,
  endTime,
  compact = false,
  onClick,
}: DraggableEventProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  if (compact) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={onClick}
        className={cn(
          `flex items-center gap-2 shadow font-medium text-sm transition hover:scale-105 hover:shadow-lg hover:bg-gray-100 mt-0.5 mb-0.5 ${CATEGORY_COLORS[category]}`,
          isDragging ? "cursor-grabbing opacity-70" : "cursor-grab"
        )}
      >
        <div
          className={cn("h-6 w-1 rounded-full", CATEGORY_LINE_COLORS[category])}
        />
        <span className="font-semibold">
          {startTime
            ? startTime
            : startDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
        </span>
        {ICONS[category]}
        <span className="truncate">{title}</span>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        `w-full rounded-[5px] h-full overflow-hidden ${CATEGORY_COLORS[category]}`,
        isDragging ? "cursor-grabbing opacity-70" : "cursor-grab"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          {ICONS[category]}
          <span className="truncate font-semibold">{title}</span>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {startTime && endTime
            ? `${startTime} - ${endTime}`
            : `${startDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} - ${endDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
        </span>
      </div>
      {description && (
        <span
          className="text-xs text-gray-600 truncate block w-full max-w-full overflow-hidden text-ellipsis"
          style={{ maxHeight: "32px" }}
          title={description}
        >
          {description}
        </span>
      )}
    </div>
  );
}

export default DraggableEvent;
