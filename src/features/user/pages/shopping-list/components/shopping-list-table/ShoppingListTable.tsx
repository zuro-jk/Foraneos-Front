import useShoppingListStore from "@/store/useShoppingListStore";
import type { IngredientCategory } from "@/types/shopping-item/ShoppingItem";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, CheckSquare, Pencil, Square } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

function ShoppingListTable() {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    amount: string;
    unit: string;
    price: string;
  }>({
    amount: "1",
    unit: "",
    price: "0",
  });

  const items = useShoppingListStore((state) => state.items);
  const toggleItem = useShoppingListStore((state) => state.toggleItem);
  const updateItem = useShoppingListStore((state) => state.updateItem);

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400 italic flex items-center justify-center gap-2">
        No hay productos aún. Genera tu lista desde el planificador
        <Calendar size={16} />
      </div>
    );
  }

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const cat = item.category ?? "Otros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categoryIcon: Record<IngredientCategory, string> = {
    Vegetales: "🥦",
    Lácteos: "🥛",
    Frutas: "🍎",
    Granos: "🌾",
    Proteínas: "🍗",
    Enlatados: "🥫",
    Condimentos: "🧂",
    Otros: "🛒",
  };

  const handleSaveEdit = (id: number) => {
    updateItem(id, {
      amount: parseFloat(editValues.amount || "0"),
      unit: editValues.unit,
      price: parseFloat(editValues.price || "0"),
    });
    setEditingItemId(null);
    toast.success("Producto actualizado correctamente");
  };

  return (
    <div className="space-y-2">
      {Object.entries(grouped).map(([category, items]) => (
        <motion.section
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {categoryIcon[category as IngredientCategory] ?? "🛒"} {category}
          </h3>
          <div className="space-y-2">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start sm:items-center justify-between p-4 rounded-2xl border shadow-sm group cursor-pointer transition-all ${
                    item.checked
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 opacity-70 line-through"
                      : "bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 hover:shadow-md hover:scale-[1.01] transition-transform duration-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-green-600 dark:text-green-400"
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.checked ? (
                        <CheckSquare size={20} />
                      ) : (
                        <Square size={20} />
                      )}
                    </motion.div>

                    <div className="flex flex-col">
                      <p className="font-semibold text-base sm:text-lg">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        <span className="font-medium">{item.amount}</span>{" "}
                        <span>{item.unit || "sin unidad"}</span>
                      </p>
                      <AnimatePresence mode="wait">
                        {editingItemId === item.id && (
                          <motion.div
                            key="edit-form"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-3"
                          >
                            <input
                              type="number"
                              value={editValues.amount}
                              disabled={item.checked}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  amount: e.target.value,
                                })
                              }
                              className="text-sm w-[70px] bg-white dark:bg-zinc-700 px-2 py-1 rounded border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-800/80 transition-all duration-200 disabled:opacity-50"
                            />
                            <input
                              type="text"
                              value={editValues.unit}
                              disabled={item.checked}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  unit: e.target.value,
                                })
                              }
                              className="text-sm w-[70px] bg-white dark:bg-zinc-700 px-2 py-1 rounded border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-800/80 transition-all duration-200 disabled:opacity-50"
                            />
                            <input
                              type="number"
                              step="0.01"
                              value={editValues.price}
                              disabled={item.checked}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  price: e.target.value,
                                })
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveEdit(item.id);
                              }}
                              className="text-sm w-[70px] bg-white dark:bg-zinc-700 px-2 py-1 rounded border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-800/80 transition-all duration-200 disabled:opacity-50"
                            />

                            <button
                              onClick={() => handleSaveEdit(item.id)}
                              disabled={item.checked}
                              className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 text-white px-3 py-1 rounded text-sm transition-all duration-200 disabled:opacity-50 cursor-pointer"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingItemId(null)}
                              className="text-red-500 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors duration-150 cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-bold text-sm sm:text-base whitespace-nowrap">
                      S/ {item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        setEditingItemId(item.id);
                        setEditValues({
                          amount: (item.amount ?? 1).toString(),
                          unit: item.unit ?? "",
                          price: (item.price ?? 1).toString(),
                        });
                      }}
                      className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-transform duration-150 hover:scale-110 cursor-pointer"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-end mt-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Subtotal:{" "}
                <span className="font-bold text-green-700 dark:text-green-400">
                  S/{" "}
                  {items.reduce((acc, i) => acc + (i.price || 0), 0).toFixed(2)}
                </span>
              </span>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}

export default ShoppingListTable;
