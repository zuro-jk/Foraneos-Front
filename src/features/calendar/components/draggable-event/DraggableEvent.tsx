import { useDraggable } from "@dnd-kit/core";

function DraggableEvent({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute left-1 top-1 right-1 bg-blue-200 rounded p-1 text-xs cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {label}
    </div>
  );
}

export default DraggableEvent;
