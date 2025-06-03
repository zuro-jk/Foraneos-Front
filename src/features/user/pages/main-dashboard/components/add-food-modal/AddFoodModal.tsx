import { Badge } from "@/shared/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { Grid2x2, List, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { FoodResponse } from "../../../foods/dto/response/foodResponse";
import { useGetFoodsFromUser } from "../../../foods/hooks/useFoods";
import { useFoodStore } from "../../store/foodStore";
import type { Food } from "../../types/food";
import CardFoodModalGrid from "./components/card-food-modal-grid/CardFoodModalGrid";
import CardFoodModalList from "./components/card-food-modal-list/CardFoodModalList";
import PaginationFoodModal from "./components/pagination-food-modal/PaginationFoodModal";

interface AddFoodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  removeFoodEverywhere: (food: Food) => void;
}

const AddFoodModal = ({
  open,
  onOpenChange,
  removeFoodEverywhere,
}: AddFoodModalProps) => {
  const { data: userFoods } = useGetFoodsFromUser();

  const { selectedFoods, addFood } = useFoodStore();
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    setPage(1);
  }, [search, viewMode]);

  const filteredFoods = userFoods?.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFood = (food: FoodResponse) => {
    if (selectedFoods.find((item) => item.id === food.id)) {
      removeFoodEverywhere(food);
    } else {
      addFood(food);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir comida</DialogTitle>
          <DialogDescription>
            Selecciona una comida o búscala. Puedes cambiar la vista.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(val) => val && setViewMode(val as "grid" | "list")}
            size="lg"
            defaultValue="grid"
          >
            <ToggleGroupItem
              value="grid"
              aria-label="Vista de grilla"
              className="cursor-pointer data-[state=on]:bg-zinc-900/20 data-[state=on]:border-gray-700 bg-zinc-200 border"
            >
              <Grid2x2 />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="list"
              aria-label="Vista de lista"
              className="cursor-pointer data-[state=on]:bg-zinc-900/20 data-[state=on]:border-gray-700 bg-zinc-200 border"
            >
              <List />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Buscar comida..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {viewMode === "grid" ? (
          <>
            <div className="grid grid-cols-2 gap-4 max-h-[35rem] overflow-y-auto">
              {filteredFoods?.length === 0 && search ? (
                <span className="col-span-3 p-2 text-gray-500">
                  No se encontraron resultados
                </span>
              ) : (
                filteredFoods
                  ?.slice((page - 1) * pageSize, page * pageSize)
                  .map((food) => (
                    <CardFoodModalGrid
                      key={food.id}
                      food={food}
                      selectedFoods={selectedFoods}
                      toggleFood={toggleFood}
                    />
                  ))
              )}
            </div>
            <PaginationFoodModal
              page={page}
              setPage={setPage}
              filteredFoods={filteredFoods!}
              pageSize={pageSize}
            />
          </>
        ) : (
          viewMode === "list" && (
            <>
              <ul className="p-2 mb-2 overflow-y-auto max-h-96">
                {filteredFoods?.length === 0 && search ? (
                  <li className="p-2 text-gray-500">
                    No se encontraron resultados
                  </li>
                ) : (
                  filteredFoods
                    ?.slice((page - 1) * pageSize, page * pageSize)
                    .map((food) => (
                      <CardFoodModalList
                        key={food.id}
                        food={food}
                        selectedFoods={selectedFoods}
                        toggleFood={toggleFood}
                      />
                    ))
                )}
              </ul>
              <PaginationFoodModal
                page={page}
                setPage={setPage}
                filteredFoods={filteredFoods!}
                pageSize={pageSize}
              />
            </>
          )
        )}
        <div className="mt-4">
          <strong>Seleccionadas:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFoods.length > 0 ? (
              <>
                {selectedFoods.slice(0, 5).map((food) => (
                  <Badge
                    key={food.id}
                    variant="outline"
                    className="px-3 py-1 text-xs font-medium rounded-full cursor-pointer hover:bg-zinc-900/20"
                    onClick={() => toggleFood(food)}
                  >
                    {food.name} <X />
                  </Badge>
                ))}
                {selectedFoods.length > 5 && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-200 text-zinc-700">
                    +{selectedFoods.length - 5} más
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-500">Ninguna</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFoodModal;
