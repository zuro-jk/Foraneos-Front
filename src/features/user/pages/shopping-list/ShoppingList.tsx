import useShoppingListStore from "@/store/useShoppingListStore";
import { CircleX, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import ShoppingListSummary from "./components/shopping-list-summary/ShoppingListSummary";
import ShoppingListTable from "./components/shopping-list-table/ShoppingListTable";

function ShoppingList() {
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
        </header>

        <ShoppingListSummary />
        <ShoppingListTable />
      </div>

      {items.length > 0 && (
        <button
          onClick={handleClear}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full flex items-center gap-2 shadow-lg z-50 cursor-pointer"
        >
          <CircleX size={22} />
          <span className="hidden md:inline">Vaciar Lista</span>
        </button>
      )}
    </div>
  );
}

export default ShoppingList;
