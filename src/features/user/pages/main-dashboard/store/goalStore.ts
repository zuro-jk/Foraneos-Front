import { create } from "zustand";


export type Goal = {
  id: number;
  name: string;
  image: string;
  type: string;
  time: string;
  calories: number;
};

interface GoalState {
  selectedGoals: Goal[];
  setSelectedGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  removeGoal: (goalId: number) => void;
}

export const useGoalStore = create<GoalState>((set) => ({
  selectedGoals: [],
  setSelectedGoals: (goals) => set({ selectedGoals: goals }),
  addGoal: (goal) =>
    set((state) => ({
      selectedGoals: [...state.selectedGoals, goal],
    })),
  removeGoal: (goalId) =>
    set((state) => ({
      selectedGoals: state.selectedGoals.filter((goal) => goal.id !== goalId),
    })),
}))
