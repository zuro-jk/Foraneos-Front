import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
    }
  )
);

export default useFavoritesStore;