// components/monthly-calendar/DroppableMonthCell.tsx
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  year: number;
  month: number;
  day: number;
  isCurrentMonth: boolean;
  children: ReactNode;
};

export default function DroppableMonthCell({
  year,
  month,
  day,
  isCurrentMonth,
  children,
}: Props) {
  const cellId = `cell-${year}-${month}-${day}`;
  const { setNodeRef } = useDroppable({ id: cellId });

  return (
    <div
      ref={setNodeRef}
      id={cellId}
      className={cn(
        "border-r border-b align-top h-[160px] overflow-hidden", // altura fija aquí
        !isCurrentMonth && "bg-gray-100 text-gray-400"
      )}
    >
      {children}
    </div>
  );
}
