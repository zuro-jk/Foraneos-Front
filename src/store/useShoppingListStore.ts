import type { ShoppingItem } from "@/types/shopping-item/ShoppingItem";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShoppingListState {
  items: ShoppingItem[];
  addItem: (item: ShoppingItem) => void;
  toggleItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearList: () => void;
}

const useShoppingListStore = create<ShoppingListState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
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
    }),
    {
      name: "shopping-list-storage",
    }
  )
);

export default useShoppingListStore;
