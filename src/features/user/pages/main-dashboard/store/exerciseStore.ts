import { create } from "zustand";

export interface Exercise {
  id: number;
  imagen: string;
  name: string;
  description: string;
}

interface ExerciseState {
  selectedExercises: Exercise[];
  setSelectedExercises: (exercises: Exercise[]) => void;
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exercise: Exercise) => void;
  clearSelectedExercises: () => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  selectedExercises: [],
  setSelectedExercises: (exercises) => set({ selectedExercises: exercises }),
  addExercise: (exercise) =>
    set((state) => ({
      selectedExercises: [...state.selectedExercises, exercise],
    })),
  removeExercise: (exercise) =>
    set((state) => ({
      selectedExercises: state.selectedExercises.filter(
        (item) => item.id !== exercise.id
      ),
    })),
  clearSelectedExercises: () => set({ selectedExercises: [] }),
}));
