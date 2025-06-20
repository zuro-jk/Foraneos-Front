import useShoppingListStore from "@/store/useShoppingListStore";
import { Calendar, CheckSquare, Square } from "lucide-react";

function ShoppingListTable() {
  const items = useShoppingListStore((state) => state.items);
  const toggleItem = useShoppingListStore((state) => state.toggleItem);

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

  return (
    <div className="space-y-2">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            🧺 {category}
          </h3>
          <div className="space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl shadow group transition cursor-pointer ${
                  item.checked
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 line-through opacity-70"
                    : "bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-green-600 dark:text-green-400">
                    {item.checked ? (
                      <CheckSquare size={20} />
                    ) : (
                      <Square size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 text-left">
                      {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-sm">
                  S/ {item.price.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ShoppingListTable;
