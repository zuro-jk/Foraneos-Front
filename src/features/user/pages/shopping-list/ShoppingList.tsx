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
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex gap-2 items-center">
              <ShoppingCart size={24} /> Lista de Compras
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Visualiza, organiza y optimiza tus compras semanales de forma
              eficiente.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {items.length > 0 && <ConfirmClearDialog onConfirm={handleClear} />}
            <Button
              onClick={() => setOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer shadow-lg transition-colors duration-200"
            >
              <PlusCircle size={20} />
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
