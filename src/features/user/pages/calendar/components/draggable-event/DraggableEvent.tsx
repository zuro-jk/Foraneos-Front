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
import type { JSX } from "react";

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
  estudio: "bg-blue-100 text-blue-700 border-blue-400",
  ejercicio: "bg-red-100 text-red-700 border-red-400",
  compras: "bg-yellow-100 text-yellow-700 border-yellow-400",
  social: "bg-purple-100 text-purple-700 border-purple-400",
  otro: "bg-gray-100 text-gray-700 border-gray-400",
};
type DraggableEventProps = {
  id: string;
  label: string;
  category?: string;
  description?: string;
  location?: string;
  duration?: number;
};

function DraggableEvent({
  id,
  label,
  category = "otro",
  description,
  location,
  duration = 1,
}: DraggableEventProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        minHeight: `${48 * duration}px`,
        marginTop: 2,
        marginBottom: 2,
      }}
      className={cn(
        `flex flex-col h-full items-start gap-2 px-3 py-2 rounded-lg shadow border font-medium text-sm transition hover:scale-105 hover:shadow-lg hover:bg-gray-100 ${CATEGORY_COLORS[category]}`,
        isDragging ? "cursor-grabbing opacity-70" : "cursor-grab"
      )}
    >
      <div className="flex items-center gap-2">
        {ICONS[category]}
        <span className="truncate font-semibold">{label}</span>
      </div>
      {description && (
        <span className="text-xs text-gray-600 truncate">{description}</span>
      )}
      {location && (
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {location}
        </span>
      )}
    </div>
  );
}

export default DraggableEvent;
