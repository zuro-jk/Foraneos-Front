import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Food } from "../../../../types/food";

interface PaginationFoodModalProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filteredFoods: Food[];
  pageSize: number;
}

const PaginationFoodModal = ({
  page,
  setPage,
  filteredFoods,
  pageSize,
}: PaginationFoodModalProps) => {
  return (
    <>
      {filteredFoods.length > pageSize && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="cursor-pointer px-3 py-1 rounded border disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="w-4 h-4 cursor-pointer" />
          </button>
          <span className="px-2 py-1">
            Página {page} de {Math.ceil(filteredFoods.length / pageSize)}
          </span>
          <button
            className="cursor-pointer px-3 py-1 rounded border disabled:opacity-50"
            onClick={() =>
              setPage((p) =>
                p < Math.ceil(filteredFoods.length / pageSize) ? p + 1 : p
              )
            }
            disabled={page >= Math.ceil(filteredFoods.length / pageSize)}
          >
            <ChevronRight className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
      )}
    </>
  );
};

export default PaginationFoodModal;
