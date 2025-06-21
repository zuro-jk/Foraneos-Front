import { useState } from "react";
import { CircleX } from "lucide-react";

interface ConfirmClearDialogProps {
  onConfirm: () => void;
}

function ConfirmClearDialog({ onConfirm }: ConfirmClearDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer shadow-lg transition-colors duration-200"
      >
        <CircleX size={22} />
        <span className="hidden md:inline">Vaciar Lista</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
            <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
              ¿Vaciar lista de compras?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Esta acción eliminará todos los productos actuales. ¿Estás seguro?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 rounded-md text-sm bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-1.5 rounded-md text-sm bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Sí, vaciar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmClearDialog;