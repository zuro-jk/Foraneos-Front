import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BudgetState {
  budget: number;
  setBudget: (amount: number) => void;
}

const useBudgetStore = create<BudgetState>()(
  persist(
    (set) => ({
      budget: 100.0,
      spent: 0,
      setBudget: (amount) => set({ budget: amount }),
    }),
    {
      name: "budget-storage",
    }
  )
);

export default useBudgetStore;
