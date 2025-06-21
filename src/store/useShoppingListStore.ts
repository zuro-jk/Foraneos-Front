import type { ShoppingItem } from "@/types/shopping-item/ShoppingItem";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShoppingListState {
  items: ShoppingItem[];
  addItem: (item: ShoppingItem) => void;
  toggleItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearList: () => void;
  updateItem: (id: number, changes: Partial<ShoppingItem>) => void;
}

const useShoppingListStore = create<ShoppingListState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.name.toLowerCase() === newItem.name.toLowerCase() &&
              item.unit.toLowerCase() === newItem.unit.toLowerCase()
          );

          if (existingIndex !== -1) {
            // Ya existe, fusionar
            const updated = [...state.items];

            updated[existingIndex] = {
              ...updated[existingIndex],
              amount: updated[existingIndex].amount + newItem.amount,
              price: updated[existingIndex].price + newItem.price,
            };

            toast.warning("Ya tenías este ingrediente, se sumaron cantidades.");
            return { items: updated };
          }

          return { items: [...state.items, newItem] };
        });
      },
      toggleItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearList: () => set({ items: [] }),
      updateItem: (id, changes) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...changes } : item
          ),
        })),
    }),
    {
      name: "shopping-list-storage",
    }
  )
);

export default useShoppingListStore;
