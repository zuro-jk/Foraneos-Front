import { Button } from "@/shared/ui/button";
import useShoppingListStore from "@/store/useShoppingListStore";
import { PlusCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmClearDialog from "./components/confirm-clear-dialog/ConfirmClearDialog";
import AddItemDialog from "./components/shopping-list-add/AddItemDialog";
import ShoppingListSummary from "./components/shopping-list-summary/ShoppingListSummary";
import ShoppingListTable from "./components/shopping-list-table/ShoppingListTable";

function ShoppingList() {
  const [open, setOpen] = useState(false);
  const items = useShoppingListStore((state) => state.items);
  const clearList = useShoppingListStore((state) => state.clearList);

  const handleClear = () => {
    clearList();
    toast.success("Lista de compras vaciada");
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-br from-white to-gray-100 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl shadow-xl p-8 space-y-8 transition-all duration-300">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
              <ShoppingCart
                size={20}
                className="text-green-700 dark:text-green-300"
              />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
                Lista de Compras
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Organiza tus compras con eficiencia y estilo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {items.length > 0 && <ConfirmClearDialog onConfirm={handleClear} />}
            <Button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <PlusCircle size={18} />
              Añadir producto
            </Button>
          </div>
          <AddItemDialog
            open={open}
            onOpenChange={setOpen}
          />
        </header>

        <ShoppingListSummary />
        <ShoppingListTable />
      </div>
    </div>
  );
}

export default ShoppingList;
