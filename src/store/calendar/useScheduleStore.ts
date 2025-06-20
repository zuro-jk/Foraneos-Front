import { create } from "zustand";

export type CalendarEvent = {
  id: number;
  title: string;
  description: string;
  category: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
};

type ScheduleState = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  items: CalendarEvent[];
  setItems: (items: CalendarEvent[]) => void;
  activeEvent: CalendarEvent | null;
  setActiveEvent: (event: CalendarEvent | null) => void;
  updateEvent: (id: number, data: Partial<CalendarEvent>) => void;
  removeEvent: (id: number) => void;
  addEvent: (event: CalendarEvent) => void;
};

export const useScheduleStore = create<ScheduleState>((set) => ({
  currentDate: new Date(),
  setCurrentDate: (date) => set({ currentDate: date }),
  items: [],
  setItems: (items) => set({ items }),
  addEvent: (event) => set((state) => ({ items: [...state.items, event] })),
  updateEvent: (id, data) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    })),
  removeEvent: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  activeEvent: null,
  setActiveEvent: (event) => set({ activeEvent: event }),
}));
